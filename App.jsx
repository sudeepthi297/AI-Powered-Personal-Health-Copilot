import React, { useState, useEffect } from 'react';
import { 
  Heart, Activity, FileText, Pill, ShieldCheck, AlertCircle, 
  Send, Languages, Upload, RefreshCw, CheckCircle, Info, Stethoscope,
  Printer, TrendingUp, AlertTriangle, ChevronRight, X, Sparkles,
  Calendar, Building2, Download, Copy, Check, Link2, ExternalLink
} from 'lucide-react';

// Multilingual i18n Dictionary
const TRANSLATIONS = {
  en: {
    appTitle: "VitalPulse AI",
    badge: "Personal Health Copilot",
    statusSafe: "HIPAA De-Identified Pipeline",
    abhaStatus: "ABHA Linked",
    tabDashboard: "Executive Dashboard",
    tabTimeline: "Unified Health Timeline",
    tabRecords: "Medical Records & OCR",
    tabMeds: "Pharmacovigilance",
    tabTrends: "Longitudinal Trends",
    tabAssistant: "AI Copilot Dialogue",
    viewMode: "Perspective Mode",
    layMode: "Patient Lay View",
    clinicalMode: "Clinical Reference View",
    biomarkersTitle: "Longitudinal Glycemic & Vital Metrics",
    glucose: "Fasting Glucose",
    hba1c: "HbA1c",
    restingHr: "Resting Heart Rate",
    sleepScore: "Sleep Architecture",
    highAlert: "Elevated",
    optimalAlert: "Optimal",
    borderlineAlert: "Borderline",
    criticalAlert: "Critical Alert",
    questionsTitle: "Smart Questions for Your Doctor",
    interactionsTitle: "Drug-Drug & Nutrition Warnings",
    uploadBtn: "Process Document",
    sampleDocTitle: "Unstructured Lab / Diagnostic Text",
    scrubbedTitle: "Safe Harbor PHI Redaction Preview",
    chatPlaceholder: "Ask anything about your health, lab reports, or medications...",
    disclaimer: "VitalPulse AI is an assistive copilot and does not replace professional medical diagnosis.",
    prepSheetBtn: "Doctor Prep Sheet",
    presetLabel: "Quick Load Preset Scenarios:",
    timelineSubtitle: "Chronological medical journey organized across all clinical providers",
    filterAll: "All Records",
    filterLabs: "Lab Reports",
    filterRx: "Prescriptions",
    filterDiag: "Diagnostics",
    filterDischarge: "Discharge Summaries"
  },
  es: {
    appTitle: "VitalPulse AI",
    badge: "Copiloto de Salud Personal",
    statusSafe: "Tubería Desidentificada HIPAA",
    abhaStatus: "ABHA Vinculado",
    tabDashboard: "Panel Ejecutivo",
    tabTimeline: "Línea de Tiempo Unificada",
    tabRecords: "Historial y OCR",
    tabMeds: "Farmacovigilancia",
    tabTrends: "Tendencias Históricas",
    tabAssistant: "Diálogo Copiloto IA",
    viewMode: "Modo de Vista",
    layMode: "Vista Paciente",
    clinicalMode: "Vista Clínica",
    biomarkersTitle: "Métricas Glucémicas y Vitales",
    glucose: "Glucosa en Ayunas",
    hba1c: "HbA1c",
    restingHr: "Frecuencia Cardíaca en Reposo",
    sleepScore: "Calidad del Sueño",
    highAlert: "Elevado",
    optimalAlert: "Óptimo",
    borderlineAlert: "Límite",
    criticalAlert: "Alerta Crítica",
    questionsTitle: "Preguntas Sugeridas para su Médico",
    interactionsTitle: "Advertencias sobre Medicamentos y Nutrición",
    uploadBtn: "Procesar Documento",
    sampleDocTitle: "Texto de Diagnóstico / Laboratorio",
    scrubbedTitle: "Vista Previa de Redacción PHI HIPAA",
    chatPlaceholder: "Consulte sobre su salud, informes o recetas...",
    disclaimer: "VitalPulse AI es una herramienta de apoyo y no sustituye un diagnóstico médico profesional.",
    prepSheetBtn: "Hoja de Consulta Médica",
    presetLabel: "Escenarios Rápidos de Prueba:",
    timelineSubtitle: "Historial médico cronológico unificado entre centros de salud",
    filterAll: "Todos",
    filterLabs: "Laboratorios",
    filterRx: "Recetas",
    filterDiag: "Diagnósticos",
    filterDischarge: "Altas Médicas"
  },
  fr: {
    appTitle: "VitalPulse AI",
    badge: "Copilote de Santé Personnel",
    statusSafe: "Pipeline Anonymisé HIPAA",
    abhaStatus: "ABHA Connecté",
    tabDashboard: "Tableau de Bord",
    tabTimeline: "Parcours Chronologique",
    tabRecords: "Dossiers et OCR",
    tabMeds: "Pharmacovigilance",
    tabTrends: "Tendances Évolutives",
    tabAssistant: "Dialogue IA Copilote",
    viewMode: "Mode d'Affichage",
    layMode: "Vue Patient",
    clinicalMode: "Vue Clinique",
    biomarkersTitle: "Mesures Glycémiques et Vitales",
    glucose: "Glycémie à Jeun",
    hba1c: "HbA1c",
    restingHr: "Fréquence Cardiaque au Repos",
    sleepScore: "Score de Sommeil",
    highAlert: "Élevé",
    optimalAlert: "Optimal",
    borderlineAlert: "Limite",
    criticalAlert: "Alerte Critique",
    questionsTitle: "Questions Suggérées pour Votre Médecin",
    interactionsTitle: "Avertissements Médicamenteux et Nutritionnels",
    uploadBtn: "Traiter le Document",
    sampleDocTitle: "Rapport Médical Brut",
    scrubbedTitle: "Aperçu de la Désidentification HIPAA",
    chatPlaceholder: "Posez une question sur votre santé ou vos ordonnances...",
    disclaimer: "VitalPulse AI est une aide décisionnelle et ne remplace pas un diagnostic médical agréé.",
    prepSheetBtn: "Fiche Préparatoire Médecin",
    presetLabel: "Charger un Scénario Prédéfini :",
    timelineSubtitle: "Historique de santé chronologique de tous vos établissements de soins",
    filterAll: "Tous",
    filterLabs: "Analyses",
    filterRx: "Ordonnances",
    filterDiag: "Diagnostics",
    filterDischarge: "Comptes Rendus d'Hospitalisation"
  },
  de: {
    appTitle: "VitalPulse AI",
    badge: "Persönlicher Gesundheits-Copilot",
    statusSafe: "HIPAA-Anonymisierte Pipeline",
    abhaStatus: "ABHA Verknüpft",
    tabDashboard: "Übersicht",
    tabTimeline: "Gesundheits-Chronik",
    tabRecords: "Befunde & OCR",
    tabMeds: "Arzneimittelsicherheit",
    tabTrends: "Verlaufskurven",
    tabAssistant: "KI-Copilot Dialog",
    viewMode: "Ansichtsmodus",
    layMode: "Patientenansicht",
    clinicalMode: "Klinische Ansicht",
    biomarkersTitle: "Blutzucker- und Vitalwertanalyse",
    glucose: "Nüchternglukose",
    hba1c: "HbA1c-Wert",
    restingHr: "Ruhepuls",
    sleepScore: "Schlafarchitektur",
    highAlert: "Erhöht",
    optimalAlert: "Optimal",
    borderlineAlert: "Grenzwertig",
    criticalAlert: "Kritischer Wert",
    questionsTitle: "Wichtige Fragen für Ihren Arzt",
    interactionsTitle: "Wechselwirkungen & Warnhinweise",
    uploadBtn: "Dokument Analysieren",
    sampleDocTitle: "Unstrukturierter Befundtext",
    scrubbedTitle: "HIPAA-Datenschutz Vorschau",
    chatPlaceholder: "Fragen zu Laborwerten, Medikamenten oder Befunden...",
    disclaimer: "VitalPulse AI ersetzt keine ärztliche Untersuchung oder Diagnose.",
    prepSheetBtn: "Arztbesuch-Vorbereitung",
    presetLabel: "Schnelltests & Fallbeispiele:",
    timelineSubtitle: "Chronologische Patientenakte über alle Versorgungseinrichtungen hinweg",
    filterAll: "Alle",
    filterLabs: "Laborbefunde",
    filterRx: "Rezepte",
    filterDiag: "Diagnostik",
    filterDischarge: "Entlassbriefe"
  },
  hi: {
    appTitle: "वाइटलपल्स AI",
    badge: "पर्सनल हेल्थ कोपायलट",
    statusSafe: "HIPAA सुरक्षित डेटा पाइपलाइन",
    abhaStatus: "ABHA लिंक्ड",
    tabDashboard: "हेल्थ डैशबोर्ड",
    tabTimeline: "स्वास्थ्य टाइमलाइन",
    tabRecords: "मेडिकल रिकॉर्ड्स",
    tabMeds: "दवा सुरक्षा (फार्मा)",
    tabTrends: "स्वास्थ्य रुझान",
    tabAssistant: "AI हेल्थ असिस्टेंट",
    viewMode: "मोड चुनें",
    layMode: "मरीज़ सरल विवरण",
    clinicalMode: "क्लिनिकल डॉक्टर विवरण",
    biomarkersTitle: "रक्त शर्करा और स्वास्थ्य मेट्रिक्स",
    glucose: "फास्टिंग ग्लूकोज",
    hba1c: "एचबीए1सी (HbA1c)",
    restingHr: "विश्राम हृदय गति",
    sleepScore: "नींद की गुणवत्ता",
    highAlert: "उच्च",
    optimalAlert: "सामान्य",
    borderlineAlert: "मध्यम",
    criticalAlert: "गंभीर चेतावनी",
    questionsTitle: "डॉक्टर से पूछने योग्य सवाल",
    interactionsTitle: "दवा और भोजन के परस्पर प्रभाव की चेतावनी",
    uploadBtn: "डॉक्यूमेंट प्रोसेस करें",
    sampleDocTitle: "लैब रिपोर्ट या पर्चा",
    scrubbedTitle: "सुरक्षित प्राइवेसी डेटा प्रीव्यू",
    chatPlaceholder: "अपनी सेहत, रिपोर्ट या दवाओं के बारे में पूछें...",
    disclaimer: "वाइटलपल्स AI एक सहायक प्रणाली है और यह डॉक्टर की सलाह का विकल्प नहीं है।",
    prepSheetBtn: "डॉक्टर परामर्श शीट",
    presetLabel: "नमूना क्लिनिकल केस:",
    timelineSubtitle: "अस्पतालों और लैब के सभी मेडिकल रिकॉर्ड्स का एक समयबद्ध विवरण",
    filterAll: "सभी रिकॉर्ड",
    filterLabs: "लैब रिपोर्ट",
    filterRx: "दवा के पर्चे",
    filterDiag: "जाँच रिपोर्ट",
    filterDischarge: "डिस्चार्ज समरी"
  },
  te: {
    appTitle: "వైటల్‌పల్స్ AI",
    badge: "వ్యక్తిగత ఆరోగ్య సహచరుడు",
    statusSafe: "HIPAA గోప్యతా రక్షణ వ్యవస్థ",
    abhaStatus: "ABHA అనుసంధానం",
    tabDashboard: "ఆరోగ్య డాష్‌బోర్డ్",
    tabTimeline: "ఆరోగ్య ప్రయాణ టైమ్‌లైన్",
    tabRecords: "వైద్య పత్రాలు",
    tabMeds: "మందుల భద్రత",
    tabTrends: "ఆరోగ్య పోకడలు",
    tabAssistant: "AI సంభాషణ",
    viewMode: "వీక్షణ విధానం",
    layMode: "సులభ శైలి వీక్షణ",
    clinicalMode: "క్లినికల్ డాక్టర్ వీక్షణ",
    biomarkersTitle: "బ్లడ్ షుగర్ మరియు ఆరోగ్య సూచికలు",
    glucose: "ఉపవాస గ్లూకోజ్",
    hba1c: "హెచ్‌బిఎ1సి (HbA1c)",
    restingHr: "హృదయ స్పందన రేటు",
    sleepScore: "నిద్ర స్కోర్",
    highAlert: "ఎక్కువ",
    optimalAlert: "సాధారణం",
    borderlineAlert: "మధ్యస్థం",
    criticalAlert: "తీవ్ర హెచ్చరిక",
    questionsTitle: "వైద్యుడిని అడగవలసిన ప్రశ్నలు",
    interactionsTitle: "మందుల ప్రతిచర్యల హెచ్చరికలు",
    uploadBtn: "విశ్లేషించండి",
    sampleDocTitle: "ల్యాబ్ రిపోర్ట్ వివరాలు",
    scrubbedTitle: "సురక్షిత గోప్యతా ప్రివ్యూ",
    chatPlaceholder: "మీ ఆరోగ్యం, నివేదికలు లేదా మందుల గురించి అడగండి...",
    disclaimer: "వైటల్‌పల్స్ AI ఒక సాంకేతిక సహకారి మాత్రమే మరియు ఇది వైద్యుడి చికిత్సకు ప్రత్యామ్నాయం కాదు.",
    prepSheetBtn: "డాక్టర్ సలహా పత్రం",
    presetLabel: "మాదిరి కేసులు:",
    timelineSubtitle: "అన్ని ఆసుపత్రులు మరియు ల్యాబ్‌ల నుండి సమగ్ర ఆరోగ్య ప్రయాణం",
    filterAll: "అన్ని రికార్డులు",
    filterLabs: "ల్యాబ్ నివేదికలు",
    filterRx: "ప్రిస్క్రిప్షన్లు",
    filterDiag: "డయాగ్నస్టిక్స్",
    filterDischarge: "డిశ్చార్జ్ సారాంశాలు"
  }
};

const PRESET_SCENARIOS = [
  {
    title: "Type 2 Diabetes & Statins",
    badge: "Glycemic Dysregulation",
    text: `Patient: Sarah Connor, DOB: 05/14/1984, SSN: 123-45-6789, Phone: (555) 234-5678.\nFasting Blood Glucose: 138 mg/dL (Ref: 70-99 mg/dL)\nHbA1c: 7.2% (Ref: 4.0-5.6%)\nResting HR: 64 bpm\neGFR: 88 mL/min/1.73m2\nMedications: Metformin 500mg BID, Atorvastatin 20mg QHS, Lisinopril 10mg daily.`
  },
  {
    title: "Hypertension & Renal Panel",
    badge: "Renal Function",
    text: `Patient: Robert Miller, DOB: 09/22/1971, SSN: 456-78-1234, Phone: (555) 987-6543.\nBlood Pressure: 142/90 mmHg\neGFR: 54 mL/min/1.73m2 (Ref: >60 mL/min)\nFasting Blood Glucose: 95 mg/dL\nResting HR: 72 bpm\nMedications: Lisinopril 20mg daily, Hydrochlorothiazide 12.5mg daily.`
  },
  {
    title: "🚨 Emergency Triage Demo",
    badge: "Acute Red Flag",
    text: `Patient: James Wilson, DOB: 03/10/1965, SSN: 987-65-4321, Phone: (555) 432-1098.\nSymptoms: Sudden crushing chest pain radiating to left arm and shortness of breath for 45 minutes.\nResting HR: 110 bpm\nFasting Blood Glucose: 115 mg/dL\nMedications: Aspirin 81mg, Nitroglycerin PRN.`
  },
  {
    title: "Anticoagulation & Drug Interaction",
    badge: "Pharmacovigilance",
    text: `Patient: Elena Rostova, DOB: 11/04/1980, MRN: MRN-882194, Phone: (555) 876-5432.\nFasting Blood Glucose: 88 mg/dL\nResting HR: 70 bpm\nMedications: Warfarin 5mg daily, Ibuprofen 400mg TID as needed for joint pain.`
  }
];

export default function App() {
  const [lang, setLang] = useState('en');
  const [viewMode, setViewMode] = useState('lay'); // 'lay' or 'clinical'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isChatWaiting, setIsChatWaiting] = useState(false);
  
  // Modals
  const [showPrepModal, setShowPrepModal] = useState(false);
  const [showAbhaModal, setShowAbhaModal] = useState(false);
  const [fhirData, setFhirData] = useState(null);
  const [copiedFhir, setCopiedFhir] = useState(false);

  // ABHA Profile State
  const [abhaProfile, setAbhaProfile] = useState({
    abha_id: "91-8472-1928-3482",
    abha_address: "sarah.connor@abdm",
    name: "Sarah Connor",
    gender: "Female",
    dob: "1984-05-14",
    mobile: "+91-9876543210",
    status: "ACTIVE_VERIFIED",
    linked_hip_facilities: [
      "AIIMS New Delhi (HIP-00129)",
      "Apollo Health City, Hyderabad (HIP-00452)",
      "Dr. Lal PathLabs Central (HIP-00891)"
    ],
    is_linked: true
  });

  // Timeline State
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [timelineFilter, setTimelineFilter] = useState('all');

  // Raw Medical Input
  const [rawText, setRawText] = useState(PRESET_SCENARIOS[0].text);

  // Analysis result schema
  const [analysisResult, setAnalysisResult] = useState({
    patient_summary: "Your recent tests indicate elevated blood sugar levels. Your heart rate and kidney markers are in an optimal range.",
    clinical_synthesis: "Elevated Fasting Glucose (138 mg/dL) and HbA1c (7.2%) denote suboptimal glycemic control. Preserved renal status (eGFR > 88).",
    biomarkers: [
      { test_name: "Fasting Blood Glucose", loinc_code: "1558-6", value: 138, unit: "mg/dL", reference_range: "70-99 mg/dL", status: "critical_high" },
      { test_name: "HbA1c", loinc_code: "4548-4", value: 7.2, unit: "%", reference_range: "4.0-5.6 %", status: "critical_high" },
      { test_name: "Resting Heart Rate", loinc_code: "8867-4", value: 64, unit: "bpm", reference_range: "60-100 bpm", status: "normal" },
      { test_name: "eGFR (Kidney Function)", loinc_code: "33914-3", value: 88, unit: "mL/min", reference_range: "> 60 mL/min", status: "normal" }
    ],
    anomalies: [
      "Fasting Glucose: 138 mg/dL (Elevated)",
      "HbA1c: 7.2% (Pre-diabetic / Diabetic baseline)"
    ],
    interaction_warnings: [
      "Grapefruit Interaction: Avoid significant grapefruit consumption with Atorvastatin (CYP3A4 inhibition increases statin toxicity risk).",
      "Potassium / Hydration Caution: ACE inhibitors like Lisinopril conserve potassium. Limit potassium-based salt substitutes."
    ],
    physician_questions: [
      "Should we consider adjusting my Metformin dosage?",
      "Would you recommend wearing a continuous glucose monitor (CGM)?",
      "What specific dietary modifications can assist in bringing my HbA1c under 6.5%?"
    ],
    emergency_triage: null,
    scrubbed_input_preview: "Patient: [REDACTED_NAME], DOB: [REDACTED_DOB], SSN: [REDACTED_SSN]..."
  });

  // Longitudinal Trend series state
  const [trendSeries, setTrendSeries] = useState([]);

  // Chat message thread
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your VitalPulse Copilot. I've analyzed your recent lab results, vital metrics, and prescriptions. How can I help you understand them today?",
      citations: ["HIPAA-Sanitized Context", "ABDM Linked Record: 91-8472-1928-3482"]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Load backend initial state on mount
  useEffect(() => {
    // 1. Fetch ABHA Profile
    fetch("http://127.0.0.1:8000/api/abha/profile")
      .then(res => res.json())
      .then(data => setAbhaProfile(data))
      .catch(err => console.log("Using local ABHA profile:", err));

    // 2. Fetch Health Timeline
    fetch("http://127.0.0.1:8000/api/timeline")
      .then(res => res.json())
      .then(data => setTimelineEvents(data))
      .catch(() => {
        setTimelineEvents([
          {
            id: "TLE-104",
            date: "12 Oct 2026",
            record_type: "lab_report",
            title: "Comprehensive Metabolic Panel & Glycemic Evaluation",
            facility: "Dr. Lal PathLabs Central",
            summary: "Elevated fasting blood glucose (138 mg/dL) and HbA1c (7.2%). Preserved renal baseline.",
            diagnoses: ["Type 2 Diabetes Mellitus (ICD: E11.9)"],
            medications: ["Metformin 500mg BID", "Atorvastatin 20mg QHS"],
            key_metrics: ["Glucose: 138 mg/dL", "HbA1c: 7.2%", "eGFR: 88 mL/min"],
            abha_hip_ref: "HIP-00891/LAB/2026/9921"
          },
          {
            id: "TLE-103",
            date: "15 Aug 2026",
            record_type: "prescription",
            title: "Outpatient Cardiology Follow-Up & Statin Refill",
            facility: "Apollo Health City, Hyderabad",
            summary: "Cardiovascular risk consultation. Refilled lipid-lowering and antihypertensive therapy.",
            diagnoses: ["Essential Hypertension (ICD: I10)", "Hyperlipidemia (ICD: E78.5)"],
            medications: ["Atorvastatin 20mg QHS", "Lisinopril 10mg Once Daily", "Metformin 500mg BID"],
            key_metrics: ["BP: 134/86 mmHg", "Resting HR: 68 bpm"],
            abha_hip_ref: "HIP-00452/RX/2026/4102"
          },
          {
            id: "TLE-102",
            date: "10 Jun 2026",
            record_type: "diagnostic",
            title: "Coronary Artery Calcium (CAC) CT Scan",
            facility: "AIIMS New Delhi",
            summary: "Non-contrast cardiac CT. Agatston calcium score calculated at 42 (Mild plaque burden).",
            diagnoses: ["Mild Coronary Atherosclerosis (ICD: I25.10)"],
            medications: [],
            key_metrics: ["Agatston CAC Score: 42", "Vessel: LAD (Mild)"],
            abha_hip_ref: "HIP-00129/IMG/2026/0831"
          },
          {
            id: "TLE-101",
            date: "14 Jan 2026",
            record_type: "discharge_summary",
            title: "Inpatient Discharge Summary - Elective Laparoscopic Procedure",
            facility: "AIIMS New Delhi",
            summary: "Uncomplicated laparoscopic cholecystectomy. Uneventful recovery. Discharged stable.",
            diagnoses: ["Symptomatic Cholelithiasis (ICD: K80.20)"],
            medications: ["Paracetamol 650mg SOS", "Pantoprazole 40mg Once Daily x 7 days"],
            key_metrics: ["Afebrile", "Hemoglobin: 13.4 g/dL"],
            abha_hip_ref: "HIP-00129/DIS/2026/0014"
          }
        ]);
      });

    // 3. Fetch Biomarker Trends
    fetch("http://127.0.0.1:8000/api/biomarkers/trends")
      .then(res => res.json())
      .then(data => setTrendSeries(data))
      .catch(() => {
        setTrendSeries([
          {
            test_name: "Fasting Blood Glucose",
            unit: "mg/dL",
            reference_range: "70-99 mg/dL",
            points: [
              { date: "6 Mo Ago", value: 112, status: "borderline" },
              { date: "3 Mo Ago", value: 124, status: "borderline" },
              { date: "Current", value: 138, status: "critical_high" }
            ]
          },
          {
            test_name: "HbA1c",
            unit: "%",
            reference_range: "4.0-5.6 %",
            points: [
              { date: "6 Mo Ago", value: 6.4, status: "borderline" },
              { date: "3 Mo Ago", value: 6.8, status: "borderline" },
              { date: "Current", value: 7.2, status: "critical_high" }
            ]
          }
        ]);
      });
  }, []);

  // Fetch FHIR Bundle
  const handleOpenFhirModal = async () => {
    setShowAbhaModal(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/export/fhir");
      if (res.ok) {
        const data = await res.json();
        setFhirData(data);
      }
    } catch {
      // Offline fallback FHIR bundle
      setFhirData({
        resourceType: "Bundle",
        id: "Bundle-ABDM-91847219283482",
        type: "document",
        profile: ["https://nrces.in/ndhm/fhir/r4/StructureDefinition/DocumentBundle"],
        identifier: { system: "https://abdm.gov.in/bundle", value: "ABDM-VITALPULSE-91-8472-1928-3482" },
        entry: [
          { resource: { resourceType: "Patient", id: "pat-sarah", identifier: [{ value: "91-8472-1928-3482" }], name: [{ text: "Sarah Connor" }] } },
          { resource: { resourceType: "Observation", id: "obs-glucose", code: { text: "Fasting Blood Glucose", coding: [{ code: "1558-6" }] }, valueQuantity: { value: 138, unit: "mg/dL" } } },
          { resource: { resourceType: "Observation", id: "obs-hba1c", code: { text: "HbA1c", coding: [{ code: "4548-4" }] }, valueQuantity: { value: 7.2, unit: "%" } } }
        ]
      });
    }
  };

  // Process Document through the FastAPI Backend
  const handleProcessDocument = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raw_document: rawText,
          active_medications: [
            { name: "Metformin", dosage: "500mg", frequency: "twice daily" },
            { name: "Atorvastatin", dosage: "20mg", frequency: "once nightly" },
            { name: "Lisinopril", dosage: "10mg", frequency: "once daily" }
          ],
          language: lang
        })
      });

      if (!response.ok) throw new Error("Backend request failed");
      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.warn("Using local fallback due to network/backend:", err);
      const scrubbed = rawText
        .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED_SSN]")
        .replace(/\b(?:\+?1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/g, "[REDACTED_PHONE]")
        .replace(/\b(?:DOB|Birthdate):\s*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/gi, "DOB: [REDACTED_DOB]");

      const isEmergency = /chest pain|shortness of breath|facial droop/i.test(rawText);

      setAnalysisResult(prev => ({
        ...prev,
        scrubbed_input_preview: scrubbed,
        emergency_triage: isEmergency ? "🚨 CRITICAL TRIAGE ALERT: Acute symptoms detected. Seek emergency care immediately." : null
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  // Connected conversational copilot with backend endpoint
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isChatWaiting) return;

    const userText = inputMessage;
    const newChatList = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(newChatList);
    setInputMessage("");
    setIsChatWaiting(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newChatList.map(m => ({
            role: m.sender === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          context_plan: analysisResult,
          language: lang
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatMessages(prev => [
          ...prev,
          { sender: 'ai', text: data.reply, citations: data.citations || [] }
        ]);
        return;
      }
    } catch (err) {
      console.warn("Using client-side copilot dialogue engine:", err);
    } finally {
      setIsChatWaiting(false);
    }

    setTimeout(() => {
      let replyText = `Regarding "${userText}": Based on your parsed clinical records, your fasting glucose was 138 mg/dL and HbA1c is 7.2%. You should discuss this trend with your physician, but ensuring a consistent low-glycemic diet and staying active will assist your insulin sensitivity.`;
      if (/grapefruit|food|diet/i.test(userText)) {
        replyText = "Avoid excessive grapefruit intake while taking Atorvastatin, as it inhibits the CYP3A4 enzyme responsible for metabolizing the medication.";
      } else if (/abha|abdm|fhir/i.test(userText)) {
        replyText = `Your records are linked to ABHA ID ${abhaProfile.abha_id}. All diagnostic reports and prescriptions are standardized to HL7 FHIR R4 document bundles for consent-driven sharing across Indian healthcare providers.`;
      }
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: replyText,
          citations: ["VitalPulse Clinical Knowledge Base", "ABDM NRCES Standard"]
        }
      ]);
    }, 400);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'critical_high':
        return <span className="text-[10px] font-semibold bg-red-950/80 border border-red-800 text-red-300 px-2 py-0.5 rounded-full">{t.criticalAlert}</span>;
      case 'borderline':
        return <span className="text-[10px] font-semibold bg-amber-950/80 border border-amber-800 text-amber-300 px-2 py-0.5 rounded-full">{t.borderlineAlert}</span>;
      case 'critical_low':
        return <span className="text-[10px] font-semibold bg-blue-950/80 border border-blue-800 text-blue-300 px-2 py-0.5 rounded-full">Low</span>;
      case 'normal':
      default:
        return <span className="text-[10px] font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded-full">{t.optimalAlert}</span>;
    }
  };

  const getValueColor = (status) => {
    switch (status) {
      case 'critical_high': return 'text-red-400';
      case 'borderline': return 'text-amber-400';
      case 'critical_low': return 'text-blue-400';
      default: return 'text-emerald-400';
    }
  };

  const getRecordTypeBadge = (type) => {
    switch (type) {
      case 'lab_report':
        return <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800 px-2 py-0.5 rounded-md font-semibold">Lab Panel</span>;
      case 'prescription':
        return <span className="text-[10px] bg-purple-950 text-purple-400 border border-purple-800 px-2 py-0.5 rounded-md font-semibold">Prescription</span>;
      case 'diagnostic':
        return <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-800 px-2 py-0.5 rounded-md font-semibold">Diagnostic Imaging</span>;
      case 'discharge_summary':
        return <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-md font-semibold">Discharge Summary</span>;
      default:
        return null;
    }
  };

  const filteredTimeline = timelineEvents.filter(ev => {
    if (timelineFilter === 'all') return true;
    return ev.record_type === timelineFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <Heart className="w-6 h-6 fill-current text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">{t.appTitle}</span>
              <span className="text-[11px] font-semibold bg-cyan-950 border border-cyan-800 text-cyan-400 px-2 py-0.5 rounded-full">
                {t.badge}
              </span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.statusSafe}</span>
              </span>
              <span className="text-slate-600">•</span>
              <button 
                onClick={handleOpenFhirModal}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
              >
                <Link2 className="w-3 h-3" />
                <span>ABHA: {abhaProfile.abha_id}</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Toggle, Prep Sheet Modal Trigger, and Language Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenFhirModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800 transition"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>ABDM Locker & FHIR</span>
          </button>

          <button
            onClick={() => setShowPrepModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{t.prepSheetBtn}</span>
          </button>

          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('lay')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${
                viewMode === 'lay' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.layMode}
            </button>
            <button
              onClick={() => setViewMode('clinical')}
              className={`px-3 py-1 text-xs rounded-md font-medium flex items-center gap-1 transition ${
                viewMode === 'clinical' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3 h-3" />
              {t.clinicalMode}
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <Languages className="w-4 h-4 text-cyan-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent border-none text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900">English (EN)</option>
              <option value="hi" className="bg-slate-900">हिन्दी (HI)</option>
              <option value="te" className="bg-slate-900">తెలుగు (TE)</option>
              <option value="es" className="bg-slate-900">Español (ES)</option>
              <option value="fr" className="bg-slate-900">Français (FR)</option>
              <option value="de" className="bg-slate-900">Deutsch (DE)</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Tab Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/40 px-6 flex gap-6 overflow-x-auto">
        {[
          { id: 'dashboard', label: t.tabDashboard, icon: Activity },
          { id: 'timeline', label: t.tabTimeline, icon: Calendar },
          { id: 'records', label: t.tabRecords, icon: FileText },
          { id: 'meds', label: t.tabMeds, icon: Pill },
          { id: 'trends', label: t.tabTrends, icon: TrendingUp },
          { id: 'assistant', label: t.tabAssistant, icon: Heart }
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
                isActive ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Main View Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Emergency Triage Alert Banner */}
        {analysisResult.emergency_triage && (
          <div className="bg-red-950/70 border border-red-600/80 rounded-xl p-4 flex items-start gap-3 shadow-lg shadow-red-950/40 animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-red-200">EMERGENCY CLINICAL TRIAGE DETECTED</div>
              <p className="text-xs text-red-300 mt-1 leading-relaxed">
                {analysisResult.emergency_triage}
              </p>
            </div>
          </div>
        )}

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Perspective View Banner */}
            <div className={`p-4 rounded-xl border transition-colors ${
              viewMode === 'lay' ? 'bg-cyan-950/30 border-cyan-800/50' : 'bg-indigo-950/30 border-indigo-800/50'
            }`}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Info className="w-4 h-4 text-cyan-400" />
                <span className={viewMode === 'lay' ? 'text-cyan-300' : 'text-indigo-300'}>
                  {viewMode === 'lay' ? t.layMode : t.clinicalMode}
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {viewMode === 'lay' ? analysisResult.patient_summary : analysisResult.clinical_synthesis}
              </p>
            </div>

            {/* Dynamic Biomarker KPI Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  {t.biomarkersTitle}
                </h3>
                <span className="text-[11px] text-slate-500">Auto-extracted via Clinical Ontologies</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {analysisResult.biomarkers && analysisResult.biomarkers.length > 0 ? (
                  analysisResult.biomarkers.map((b, idx) => (
                    <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 font-medium truncate">{b.test_name}</span>
                          {b.loinc_code && (
                            <span className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1 rounded">
                              LOINC {b.loinc_code}
                            </span>
                          )}
                        </div>
                        <div className={`text-2xl font-bold mt-2 ${getValueColor(b.status)}`}>
                          {b.value} <span className="text-xs font-normal text-slate-400">{b.unit}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Ref: {b.reference_range}</span>
                        {getStatusBadge(b.status)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-6 text-xs text-slate-500">
                    No biomarkers currently extracted. Process a document to view observations.
                  </div>
                )}
              </div>
            </div>

            {/* Smart Doctor Questions & Interactions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    {t.questionsTitle}
                  </h3>
                  <button
                    onClick={() => setShowPrepModal(true)}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5"
                  >
                    Export Prep Sheet <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-2.5">
                  {analysisResult.physician_questions.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 leading-relaxed flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    {t.interactionsTitle}
                  </h3>
                  <span className="text-[10px] bg-amber-950/60 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded">
                    Pharmacovigilance Active
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {analysisResult.interaction_warnings.map((warn, idx) => (
                    <li key={idx} className="text-xs text-amber-200 bg-amber-950/20 border border-amber-900/40 p-3 rounded-lg leading-relaxed flex items-start gap-2">
                      <span className="text-amber-400 shrink-0 font-bold">⚠</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: UNIFIED HEALTH TIMELINE (ABDM/FHIR READY) */}
        {activeTab === 'timeline' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Unified Longitudinal Health Profile
                </h3>
                <p className="text-xs text-slate-400 mt-1">{t.timelineSubtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenFhirModal}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export FHIR Bundle
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: t.filterAll },
                { id: 'lab_report', label: t.filterLabs },
                { id: 'prescription', label: t.filterRx },
                { id: 'diagnostic', label: t.filterDiag },
                { id: 'discharge_summary', label: t.filterDischarge }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTimelineFilter(f.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    timelineFilter === f.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Timeline Stream */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
              {filteredTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-500 ring-4 ring-slate-950 shadow-sm" />

                  <div className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-5 space-y-3 transition">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getRecordTypeBadge(item.record_type)}
                        <span className="text-xs font-mono text-cyan-400 font-semibold">{item.date}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.abha_hip_ref}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.facility}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      {item.summary}
                    </p>

                    {/* Metadata tags */}
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                      {item.diagnoses && item.diagnoses.map((d, dIdx) => (
                        <span key={dIdx} className="bg-indigo-950/60 border border-indigo-900/60 text-indigo-300 px-2 py-0.5 rounded">
                          📋 {d}
                        </span>
                      ))}
                      {item.key_metrics && item.key_metrics.map((km, kmIdx) => (
                        <span key={kmIdx} className="bg-amber-950/40 border border-amber-900/40 text-amber-300 px-2 py-0.5 rounded font-mono">
                          📊 {km}
                        </span>
                      ))}
                      {item.medications && item.medications.map((m, mIdx) => (
                        <span key={mIdx} className="bg-purple-950/40 border border-purple-900/40 text-purple-300 px-2 py-0.5 rounded">
                          💊 {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: MEDICAL RECORDS & OCR */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            {/* Quick Load Preset Scenarios */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                {t.presetLabel}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {PRESET_SCENARIOS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRawText(preset.text);
                    }}
                    className="p-2.5 text-left bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-800 rounded-lg transition group"
                  >
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">{preset.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1">{preset.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-200">{t.sampleDocTitle}</h3>
                  <button
                    onClick={handleProcessDocument}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-md shadow-cyan-900/20"
                  >
                    {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    {t.uploadBtn}
                  </button>
                </div>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  rows={9}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-semibold text-slate-200">{t.scrubbedTitle}</h3>
                  </div>
                  <span className="text-[10px] bg-emerald-950 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded-full">
                    Safe Harbor Compliant
                  </span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-400 h-52 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {analysisResult.scrubbed_input_preview}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PHARMACOVIGILANCE */}
        {activeTab === 'meds' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-cyan-400" />
                  Active Prescriptions & Pharmacovigilance Surveillance
                </h3>
                <p className="text-xs text-slate-400 mt-1">Cross-referencing RxNorm, CYP450 pathways, and contraindications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Metformin", dose: "500 mg", frequency: "Twice daily", route: "Oral", indication: "Type 2 Diabetes" },
                { name: "Atorvastatin", dose: "20 mg", frequency: "Once nightly", route: "Oral", indication: "Lipid Management" },
                { name: "Lisinopril", dose: "10 mg", frequency: "Once daily", route: "Oral", indication: "Hypertension / Renal Protection" }
              ].map((med, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-cyan-400">{med.name}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">{med.dose} • {med.frequency}</div>
                    <div className="text-[11px] text-slate-500 mt-1">Indication: {med.indication}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] text-slate-400 font-mono">
                    Route: {med.route}
                  </div>
                </div>
              ))}
            </div>

            {/* Interaction Matrix Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                Active Surveillance Findings
              </h4>
              <ul className="space-y-2">
                {analysisResult.interaction_warnings.map((w, i) => (
                  <li key={i} className="text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    • {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: LONGITUDINAL TRENDS */}
        {activeTab === 'trends' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Biomarker Trajectory & Longitudinal Delta Tracking
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing multi-month progression across metabolic and vital observations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendSeries.map((series, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{series.test_name}</div>
                      <div className="text-[11px] text-slate-500">Ref: {series.reference_range}</div>
                    </div>
                    <span className="text-xs font-mono bg-slate-900 px-2 py-0.5 rounded text-cyan-400 border border-slate-800">
                      {series.unit}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {series.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between text-xs bg-slate-900/60 p-2 rounded border border-slate-800/80">
                        <span className="text-slate-400">{pt.date}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono font-bold ${getValueColor(pt.status)}`}>
                            {pt.value} {series.unit}
                          </span>
                          {getStatusBadge(pt.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AI COPILOT DIALOGUE */}
        {activeTab === 'assistant' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col h-[540px]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-cyan-400" />
                <span>Grounded strictly in your de-identified observations and medications</span>
              </div>
              <span className="text-[10px] bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-400">
                ABHA Active
              </span>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] p-3.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-800/90 text-slate-200 rounded-bl-none border border-slate-700/60'
                    }`}
                  >
                    <div>{msg.text}</div>
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2 pt-1.5 border-t border-slate-700/50 flex flex-wrap gap-1 text-[9px] text-cyan-300">
                        {msg.citations.map((cite, cIdx) => (
                          <span key={cIdx} className="bg-slate-950/70 px-1.5 py-0.5 rounded border border-slate-800">
                            📚 {cite}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isChatWaiting && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-3 rounded-xl rounded-bl-none text-xs text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>Analyzing clinical context...</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={isChatWaiting || !inputMessage.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ABDM / ABHA Health Locker Modal */}
      {showAbhaModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-bold text-base text-white">Ayushman Bharat Digital Mission (ABDM)</h3>
                  <p className="text-xs text-slate-400">Health Record Locker & HL7 FHIR Standard Gateway</p>
                </div>
              </div>
              <button
                onClick={() => setShowAbhaModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">ABHA Number</div>
                <div className="text-base font-mono font-bold text-cyan-400">{abhaProfile.abha_id}</div>
                <div className="text-xs text-slate-400">Address: <span className="text-slate-200">{abhaProfile.abha_address}</span></div>
                <span className="inline-block text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Aadhaar Verified
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Demographics</div>
                <div className="text-sm font-semibold text-slate-200">{abhaProfile.name}</div>
                <div className="text-xs text-slate-400">{abhaProfile.gender} • Born {abhaProfile.dob}</div>
                <div className="text-xs text-slate-400">Mobile: {abhaProfile.mobile}</div>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Connected Health Information Providers (HIP):
              </div>
              <ul className="space-y-2">
                {abhaProfile.linked_hip_facilities.map((fac, i) => (
                  <li key={i} className="text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      {fac}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">Consent Active</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FHIR R4 JSON Preview Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  HL7 FHIR R4 Document Bundle (NRCES):
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(fhirData, null, 2));
                    setCopiedFhir(true);
                    setTimeout(() => setCopiedFhir(false), 2000);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedFhir ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedFhir ? "Copied" : "Copy FHIR JSON"}</span>
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-[11px] font-mono text-cyan-300/80 h-44 overflow-y-auto whitespace-pre-wrap">
                {fhirData ? JSON.stringify(fhirData, null, 2) : "Loading FHIR R4 Document Bundle..."}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowAbhaModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Visit Prep Sheet Modal */}
      {showPrepModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <Printer className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-base text-white">Doctor Visit Preparation Sheet</h3>
              </div>
              <button
                onClick={() => setShowPrepModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="font-bold text-cyan-400 uppercase text-[10px] tracking-wider mb-1">Clinical Summary</div>
                <p className="leading-relaxed">{analysisResult.clinical_synthesis}</p>
              </div>

              <div>
                <div className="font-bold text-slate-200 mb-2">Key Questions to Ask Your Physician:</div>
                <ul className="space-y-2">
                  {analysisResult.physician_questions.map((q, i) => (
                    <li key={i} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex items-start gap-2">
                      <span className="font-bold text-cyan-400">{i + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-200 mb-2">Noted Abnormal Lab Markers:</div>
                <div className="grid grid-cols-2 gap-2">
                  {analysisResult.anomalies.map((a, i) => (
                    <div key={i} className="bg-amber-950/20 border border-amber-900/40 p-2.5 rounded-lg text-amber-200">
                      • {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowPrepModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white flex items-center gap-1.5 transition shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Legal & Safety Disclaimer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 px-6 py-3.5 text-center text-[11px] text-slate-500">
        {t.disclaimer}
      </footer>
    </div>
  );
}