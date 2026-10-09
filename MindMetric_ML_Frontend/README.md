# MindMetric — Mental Health ML Frontend

A premium React/Vite frontend for the provided FastAPI mental-health prediction API.

## API contract used

- Base URL: `http://127.0.0.1:8000`
- Endpoint: `POST /predict`
- Response field: `predicted_mental_score`

The frontend uses the exact fields and enum values defined by the supplied FastAPI `StudentData` model.

## Run

### 1. Start FastAPI

Use your existing backend command, for example:

```bash
uvicorn main:app --reload --port 8000
```

Replace `main` with the filename containing your FastAPI app if different.

### 2. Start frontend

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## API URL

Create `.env` in the project root:

```env
VITE_API_URL=http://127.0.0.1:8000
```

If no `.env` is created, the frontend defaults to `http://127.0.0.1:8000`.

## Notes

The frontend does not modify or retrain the model. It sends the form values to the existing `/predict` endpoint and displays the returned `predicted_mental_score`.

The UI deliberately does not label the score as a clinical diagnosis or invent a threshold because the supplied API exposes only a numeric prediction and does not define clinical score ranges.
