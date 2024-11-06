from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId

app = FastAPI()

# MongoDB Atlas connection
MONGO_URL = "mongodb+srv://Expense_user:Expenseuser24@expensecluster.l3gzb.mongodb.net/"
client = MongoClient(MONGO_URL)
db = client.ExpenseTracker
expenses_collection = db.expenses

# Models
class Expense(BaseModel):
    date: datetime
    amount: float
    category: str
    description: Optional[str] = None

class ExpenseResponse(Expense):
    id: str

@app.post("/expenses/", response_model=ExpenseResponse)
async def add_expense(expense: Expense):
    expense_data = expense.dict()
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
