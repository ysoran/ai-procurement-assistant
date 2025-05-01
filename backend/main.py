from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy
import imaplib
import email
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Allow frontend to access backend (CORS settings)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load spaCy model for NLP analysis
nlp = spacy.load("en_core_web_sm")

# Sample in-memory email database
parsed_emails = [
    {
        "subject": "Request for Quote - Steel Bolts",
        "content": "Hi, please send us your best price for 1000 steel bolts. Needed urgently.",
        "extracted": "Request for 1000 steel bolts"
    },
    {
        "subject": "Monthly Report",
        "content": "Attached is the procurement summary report for April.",
        "extracted": "Procurement summary report for April"
    }
]

# Response schemas
class ParsedEmail(BaseModel):
    subject: str
    content: str
    extracted: str

class Insight(BaseModel):
    summary: str
    riskLevel: str
    suggestions: list[str]

@app.get("/api/emails", response_model=list[ParsedEmail])
def get_emails():
    return parsed_emails

@app.get("/api/insights", response_model=list[Insight])
def get_insights():
    insights = []
    for email in parsed_emails:
        doc = nlp(email["content"])
        named_entities = len(doc.ents)
        word_count = len(doc)
        suspicious_keywords = [kw for kw in ["urgent", "immediately", "asap"] if kw in email["content"].lower()]

        # Simple ML-like logic for risk scoring
        risk_score = 0
        if named_entities > 3:
            risk_score += 1
        if len(suspicious_keywords) > 0:
            risk_score += 1
        if word_count < 10:
            risk_score += 1

        if risk_score >= 2:
            risk = "High"
        elif risk_score == 1:
            risk = "Medium"
        else:
            risk = "Low"

        suggestions = []
        if risk == "High":
            suggestions.append("Verify sender identity")
            suggestions.append("Double-check contract terms")
        elif risk == "Medium":
            suggestions.append("Review request with manager")

        insights.append(Insight(
            summary=f"Email about '{email['subject']}' has {named_entities} named entities and {len(suspicious_keywords)} suspicious keywords.",
            riskLevel=risk,
            suggestions=suggestions
        ))

    return insights

@app.get("/api/fetch-emails", response_model=list[ParsedEmail])
def fetch_emails():
    EMAIL = os.getenv("EMAIL_ADDRESS")
    PASSWORD = os.getenv("EMAIL_PASSWORD")

    try:
        mail = imaplib.IMAP4_SSL("imap.gmail.com")
        mail.login(EMAIL, PASSWORD)
        mail.select("inbox")

        # Search for all emails
        status, messages = mail.search(None, "ALL")
        email_ids = messages[0].split()[-5:]  # Last 5 emails

        fetched = []
        for e_id in email_ids:
            status, msg_data = mail.fetch(e_id, "(RFC822)")
            raw_email = msg_data[0][1]
            msg = email.message_from_bytes(raw_email)

            subject = msg["subject"]
            content = ""
            if msg.is_multipart():
                for part in msg.walk():
                    if part.get_content_type() == "text/plain":
                        content = part.get_payload(decode=True).decode(errors="ignore")
                        break
            else:
                content = msg.get_payload(decode=True).decode(errors="ignore")

            doc = nlp(content)
            summary = doc[:20].text

            # Update parsed_emails list
            parsed_emails.append({
                "subject": subject or "(No Subject)",
                "content": content,
                "extracted": summary.strip()
            })

            fetched.append({
                "subject": subject or "(No Subject)",
                "content": content,
                "extracted": summary.strip()
            })

        return fetched

    except Exception as e:
        return [{"subject": "Error", "content": str(e), "extracted": ""}]
