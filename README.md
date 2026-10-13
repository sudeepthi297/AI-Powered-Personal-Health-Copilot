# VitalPulse AI — Personal Health Copilot

**Transforming fragmented medical records into meaningful, patient-friendly health insights.**

## Overview

VitalPulse AI is an AI-powered Personal Health Copilot designed to help individuals understand and organize their healthcare information. It brings together medical reports, laboratory results, prescriptions, diagnostic records, and health trends in a unified interface.

The application analyzes medical text, identifies important biomarkers, highlights potential medication interactions, detects emergency warning signs, and generates summaries to help patients prepare for doctor consultations.

Built as a healthcare hackathon project, VitalPulse AI combines a React-based frontend with a Python FastAPI backend and supports multilingual health information in English, Hindi, Telugu, Spanish, French, and German.

## Problem Statement

Medical information is often scattered across laboratory reports, prescriptions, discharge summaries, and diagnostic records. Patients may struggle to understand medical terminology, track changes in their health, and identify important questions to discuss with their doctors.

VitalPulse AI aims to make healthcare information easier to understand, better organized, and more accessible.

## Key Features

- **Health Dashboard:** View important health metrics, biomarker statuses, and potential warning signs.
- **Medical Record Analysis:** Process medical text and extract supported clinical observations.
- **Biomarker Analysis:** Identify and classify values such as fasting blood glucose, HbA1c, heart rate, eGFR, and LDL cholesterol.
- **Medication Safety Alerts:** Flag potential drug–drug and drug–food interactions using predefined clinical rules.
- **Emergency Red-Flag Detection:** Identify selected warning symptoms, including chest pain, breathing difficulties, and possible stroke symptoms.
- **Unified Health Timeline:** Organize sample laboratory reports, prescriptions, diagnostic records, and discharge summaries chronologically.
- **AI Health Copilot:** Ask questions about health information through a conversational interface.
- **Multilingual Support:** Switch between English, Hindi, Telugu, Spanish, French, and German.
- **Patient and Clinical Views:** Present information in patient-friendly language or a more technical clinical summary.
- **Doctor Preparation Sheet:** Help patients prepare relevant questions for medical consultations.
- **ABHA and FHIR Demonstration:** Provide prototype ABHA profile linking and HL7 FHIR R4 document bundle export functionality.
- **Privacy-Oriented Processing:** Apply predefined patterns to redact selected personal identifiers before analysis.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React 18 |
| Build tool | Vite |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Backend | Python, FastAPI |
| Data validation | Pydantic v2 |
| AI integration | OpenAI API, Instructor |
| Health data format | HL7 FHIR R4 |
| Configuration | Python dotenv |

## Project Architecture

The application follows a frontend-backend architecture.

1. **Frontend:** React provides the dashboard, health timeline, medical record interface, multilingual controls, and copilot experience.
2. **Backend API:** FastAPI exposes endpoints for health analysis, conversational assistance, biomarker trends, ABHA profile information, and FHIR export.
3. **Privacy layer:** The PHI scrubber uses predefined patterns to redact selected identifiers from medical text.
4. **Clinical rules engine:** Python rules identify supported biomarkers, potential medication interactions, and selected emergency warning signs.
5. **AI and fallback processing:** When configured, the backend uses OpenAI for structured health summaries and conversational responses. A deterministic fallback is available when the API key is not configured or AI processing fails.
6. **Health data representation:** Pydantic models structure clinical observations, medication information, health timeline entries, and FHIR-related responses.

## Project Structure

```text
VitalPulse-AI/
├── App.jsx
├── main.jsx
├── index.html
├── index.css
├── main.py
├── package.json
├── package-lock.json
├── vite.config.js
├── requirements.txt
├── .env.example
├── ARCHITECTURE_AND_SLIDES.md
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Python 3.10 or a compatible version
- Node.js and npm
- A code editor such as Visual Studio Code

An OpenAI API key is optional because the backend includes deterministic fallback processing.

### Step 1: Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/VitalPulse-AI.git
cd VitalPulse-AI
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 2: Set up the Python backend

Create and activate a virtual environment.

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### Step 3: Configure environment variables

Copy `.env.example` to `.env` and configure the variables provided in the example file.

If you want to enable OpenAI integration, add your API key using the variable name `OPENAI_API_KEY`.

Keep your `.env` file private. Never upload API keys or other secrets to GitHub.

### Step 4: Start the backend

```bash
python main.py
```

The FastAPI backend should start at:

`http://127.0.0.1:8000`

Open the interactive API documentation at:

`http://127.0.0.1:8000/docs`

### Step 5: Set up the frontend

Open a second terminal in the project directory and install the JavaScript dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, normally:

`http://localhost:5173`

Keep both the backend and frontend terminals running while testing the application.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/analyze` | Analyze medical text and return a structured health summary |
| POST | `/api/chat` | Submit messages to the health copilot |
| GET | `/api/timeline` | Retrieve sample health timeline records |
| GET | `/api/biomarkers/trends` | Retrieve biomarker trend data |
| GET | `/api/abha/profile` | Retrieve the prototype ABHA profile |
| POST | `/api/abha/link` | Demonstrate mock ABHA profile linking |
| GET | `/api/export/fhir` | Export a sample HL7 FHIR R4 bundle |

## Privacy and Security

VitalPulse AI incorporates a privacy-oriented processing layer that attempts to redact selected personal identifiers, including names in specified formats, phone numbers, email addresses, dates of birth, Social Security numbers, and medical record numbers.

**Important:** Pattern-based redaction is not guaranteed to remove every identifier. This prototype must not be considered certified HIPAA-compliant or production-ready for real patient data.

The current implementation also contains mock patient profiles, sample clinical records, and simulated ABHA linking. Do not use real patient information for public demonstrations or upload sensitive medical records without appropriate privacy and security safeguards.

## Medical Disclaimer

VitalPulse AI is an educational and assistive software prototype. It does not replace professional medical advice, diagnosis, or treatment. Its automated results and medication alerts may be incomplete or incorrect.

Always consult a qualified healthcare professional before making medical decisions. If emergency symptoms occur, seek immediate medical attention.

## Future Enhancements

- Integrate secure medical document uploads and production-grade OCR.
- Connect to authorized ABDM services and real consent-based health record exchange.
- Improve medical terminology extraction and clinical source citations.
- Add secure persistent storage and user authentication.
- Implement comprehensive privacy controls, audit logging, and security testing.
- Validate medication alerts and clinical rules with qualified healthcare professionals.
- Add wearable-device integrations and more advanced longitudinal health visualizations.

## Project Purpose

VitalPulse AI demonstrates how AI, web development, structured clinical data, and rule-based processing can be combined to make healthcare information easier to understand.

Developed as a hackathon prototype to explore accessible, privacy-conscious, and patient-centered digital healthcare.

---

**Disclaimer:** This project is for educational and demonstration purposes only and is not intended for clinical use.
