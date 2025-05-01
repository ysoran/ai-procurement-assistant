
# AI Procurement Assistant

AI Procurement Assistant is a comprehensive solution for procurement management. It leverages machine learning and natural language processing (NLP) to parse emails, provide insights, and optimize procurement strategies. This project is built with a FastAPI backend and a React + TypeScript frontend, integrated with Tailwind CSS for styling.

## Features
- **Email Parsing**: Extract key information from procurement-related emails.
- **AI Insights**: Get automated insights like risk levels, recommendations, and alerts based on email content.
- **Dashboard**: Visual representation of procurement data, supplier counts, and processing times.
- **Settings**: Configure AI models and email parsing rules.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Spacy (for NLP)
- **Database**: (Optional - not yet included, depending on future development)
- **Additional Tools**: Axios for API calls

---

## Project Structure

```
/ai-procurement-assistant
│
├── /frontend               # React + TypeScript + Tailwind UI for the frontend
├── /backend                # FastAPI app for backend functionality
│
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
└── package.json            # Frontend dependencies
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (Frontend)
- **Python 3.7+** (Backend)
- **pip** (Python package manager)
- **Git** (Version control)

### 1. Backend Setup (FastAPI)

#### Step 1: Clone the repository

Clone the project to your local machine:

```bash
git clone https://github.com/ysoran/ai-procurement-assistant.git
cd ai-procurement-assistant
```

#### Step 2: Set up a virtual environment (optional but recommended)

Create and activate a virtual environment for the Python backend:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

#### Step 3: Install required Python packages

Install the necessary dependencies from `requirements.txt`:

```bash
pip install -r backend/requirements.txt
```

If you haven’t already, install Spacy and the English model:

```bash
pip install spacy
python -m spacy download en_core_web_sm
```

#### Step 4: Run the backend

Navigate to the backend folder and start the FastAPI server:

```bash
cd backend
uvicorn main:app --reload
```

This will start the backend server at `http://localhost:8000`.

---

### 2. Frontend Setup (React + TypeScript)

#### Step 1: Navigate to the frontend directory

From the root of the project:

```bash
cd frontend
```

#### Step 2: Install frontend dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

#### Step 3: Run the frontend

Start the development server:

```bash
npm start
```

or

```bash
yarn start
```

This will run the frontend at `http://localhost:3000`.

---

### 3. Configuration

#### Backend Configuration

1. **Email Parsing**: The backend uses Spacy to parse emails. You can modify the email parsing logic and entity extraction rules within the FastAPI app (`backend/main.py`).
2. **AI Insights**: The backend uses predefined rules to generate insights based on parsed emails. You can extend this by integrating machine learning models or custom heuristics to derive better insights.
3. **Endpoints**:
   - `GET /api/emails`: Fetches a list of parsed emails.
   - `GET /api/insights`: Fetches AI-powered insights from parsed emails.

#### Frontend Configuration

1. **API URL**: The frontend communicates with the FastAPI backend using Axios. The API URL is set to `http://localhost:8000` by default in `frontend/src/App.tsx`. You can change it if your backend runs on a different URL or port.
2. **UI Customization**: The frontend uses Tailwind CSS. You can customize the layout, colors, and styles to match your branding or specific use case.

---

## Directory Overview

### Backend (`/backend`)

- **`main.py`**: FastAPI app that exposes API endpoints for email parsing and AI insights.
- **`requirements.txt`**: Python dependencies required for the backend.
- **`models`** (optional): This folder can be used for any machine learning models you create for NLP, insights generation, etc.

### Frontend (`/frontend`)

- **`src/App.tsx`**: Main React component where the dashboard, email list, and insights are rendered.
- **`src/components/`**: Reusable UI components like buttons, cards, and tabs.
- **`tailwind.config.js`**: Tailwind CSS configuration file for customizing the UI.
- **`package.json`**: List of frontend dependencies and scripts.

---

## Example API Requests

### Fetch Parsed Emails

- **Endpoint**: `GET /api/emails`
- **Response**: List of parsed emails.

```json
[
  {
    "subject": "Request for Quotation - Valve #4832",
    "content": "Dear supplier, please provide a quote for the attached valve specs.",
    "extracted": "Quote request for valve #4832"
  },
  {
    "subject": "Purchase Order Confirmation",
    "content": "Your PO for steel coils has been confirmed.",
    "extracted": "PO confirmation for steel coils"
  }
]
```

### Fetch AI Insights

- **Endpoint**: `GET /api/insights`
- **Response**: List of AI-generated insights.

```json
[
  {
    "summary": "Potential price surge detected in copper suppliers.",
    "riskLevel": "High",
    "suggestions": [
      "Lock current prices with key vendors.",
      "Explore alternative suppliers in Asia.",
      "Schedule internal budget review."
    ]
  },
  {
    "summary": "No delays expected from current suppliers this week.",
    "riskLevel": "Low",
    "suggestions": [
      "Proceed with planned purchases."
    ]
  }
]
```

---

## Troubleshooting

- **CORS issues**: If you encounter CORS (Cross-Origin Resource Sharing) issues while connecting the frontend to the backend, ensure that your FastAPI app has the correct CORS configuration in `main.py`.
- **Backend not starting**: If you run into issues with starting the FastAPI backend, check if all dependencies are correctly installed by running `pip install -r backend/requirements.txt`.

---

## Contributing

Feel free to fork this repository and submit pull requests. Whether you're fixing bugs, adding features, or improving documentation, contributions are always welcome!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
