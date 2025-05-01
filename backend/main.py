from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import spacy
from spacy import displacy
from spacy.matcher import Matcher

# Load spaCy's English model
nlp = spacy.load("en_core_web_sm")

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

# AI-powered email parsing function
def parse_email(content: str) -> str:
    # Process the email content with spaCy NLP model
    doc = nlp(content)
    
    # Initialize the matcher
    matcher = Matcher(nlp.vocab)
    
    # Define pattern to extract product or service names (e.g., capitalized words)
    pattern = [{"is_upper": True}]
    matcher.add("PRODUCT_PATTERN", [pattern])
    
    # Find matches in the email content
    matches = matcher(doc)
    
    extracted_info = []
    for match_id, start, end in matches:
        span = doc[start:end]
        extracted_info.append(span.text)
    
    # You can also add more logic here to extract dates, quantities, etc.
    return ", ".join(extracted_info) if extracted_info else "No relevant information found"

# Sample data
parsed_emails = [
    ParsedEmail(
        subject="Request for Quotation - Valve #4832",
        content="Dear supplier, please provide a quote for the attached valve specs.",
        extracted=parse_email("Dear supplier, please provide a quote for the attached valve specs.")
    ),
    ParsedEmail(
        subject="Purchase Order Confirmation",
        content="Your PO for steel coils has been confirmed. The delivery is scheduled for next week.",
        extracted=parse_email("Your PO for steel coils has been confirmed. The delivery is scheduled for next week.")
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
