# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow frontend to connect locally
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample models
class ParsedEmail(BaseModel):
    subject: str
    content: str
    extracted: str

class Insight(BaseModel):
    summary: str
    riskLevel: str
    suggestions: List[str]

# Sample data
parsed_emails = [
    ParsedEmail(
        subject="Request for Quotation - Valve #4832",
        content="Dear supplier, please provide a quote for the attached valve specs.",
        extracted="Quote request for valve #4832"
    ),
    ParsedEmail(
        subject="Purchase Order Confirmation",
        content="Your PO for steel coils has been confirmed.",
        extracted="PO confirmation for steel coils"
    )
]

insights = [
    Insight(
        summary="Potential price surge detected in copper suppliers.",
        riskLevel="High",
        suggestions=[
            "Lock current prices with key vendors.",
            "Explore alternative suppliers in Asia.",
            "Schedule internal budget review."
        ]
    ),
    Insight(
        summary="No delays expected from current suppliers this week.",
        riskLevel="Low",
        suggestions=["Proceed with planned purchases."]
    )
]

@app.get("/api/emails", response_model=List[ParsedEmail])
def get_emails():
    return parsed_emails

@app.get("/api/insights", response_model=List[Insight])
def get_insights():
    return insights
