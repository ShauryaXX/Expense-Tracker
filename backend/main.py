from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from pymongo import MongoClient, ReturnDocument
from bson.objectid import ObjectId

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas connection
MONGO_URL = "mongodb+srv://Expense_user:Expenseuser24@expensecluster.l3gzb.mongodb.net/"
client = MongoClient(MONGO_URL)
db = client.ExpenseTracker
expenses_collection = db.expenses

# Initialize the counter if it doesn't exist
if db.counters.count_documents({"_id": "expense_id"}, limit=1) == 0:
    db.counters.insert_one({"_id": "expense_id", "sequence_value": 0})

# Models
class Expense(BaseModel):
    date: datetime
    amount: float
    category: str
    description: Optional[str] = None

class ExpenseResponse(Expense):
    id: str
    record_id: int

def get_next_sequence_value(sequence_name: str) -> int:
    counter = db.counters.find_one_and_update(
        {"_id": sequence_name},
        {"$inc": {"sequence_value": 1}},
        return_document=ReturnDocument.AFTER
    )
    return counter["sequence_value"]

@app.post("/expenses/", response_model=ExpenseResponse)
async def add_expense(expense: Expense):
    expense_data = expense.dict()
    expense_data["record_id"] = get_next_sequence_value("expense_id")
    result = expenses_collection.insert_one(expense_data)
    expense_data["id"] = str(result.inserted_id)
    return expense_data

@app.get("/expenses/", response_model=List[ExpenseResponse])
async def get_expenses(start_date: Optional[str] = None, end_date: Optional[str] = None):
    query = {}
    if start_date and end_date:
        query["date"] = {
            "$gte": datetime.strptime(start_date, "%Y-%m-%d"),
            "$lte": datetime.strptime(end_date, "%Y-%m-%d")
        }
    expenses = list(expenses_collection.find(query))
    for expense in expenses:
        expense["id"] = str(expense["_id"])
    return expenses

@app.delete("/expenses/")
async def delete_expense(request: Request):
    data = await request.json()
    record_id = data.get("record_id")
    category = data.get("category")
    amount = data.get("amount")

    if not category or not record_id or not amount:
        raise HTTPException(status_code=400, detail="record_id, category, and amount are required")

    result = expenses_collection.delete_one({
        "record_id": record_id,
        "category": category,
        "amount": amount
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Expense not found")

    return {"success": True, "message": "Expense deleted successfully"}
