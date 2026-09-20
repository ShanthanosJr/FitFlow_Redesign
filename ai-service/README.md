# FitFlow AI Service — FastAPI

Python microservice for AI-powered workout generation and food recognition.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness probe |
| POST | `/v1/workouts/generate` | Generate personalized workout plan (async, 202) |
| POST | `/v1/workouts/recommend` | Recommend plans via pgvector similarity |
| POST | `/v1/nutrition/recognize` | Recognize food from S3 image |

Interactive docs: http://localhost:8000/docs

## Local Development

```bash
# Prerequisites: Python 3.12+, PostgreSQL running

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt

cp .env.example .env   # fill in your OPENAI_API_KEY etc.

uvicorn main:app --reload --port 8000
```

## Tests

```bash
pytest                 # all tests
ruff check .           # lint
```

## Architecture

- **Plan generation**: pgvector retrieval → LLM prompt → schema validation → SQS event → WebSocket delivery
- **Food recognition**: S3 download → AWS Rekognition + GPT-4o Vision → food catalogue lookup → ranked candidates
- LLM provider is abstracted behind an adapter interface (`app/llm/`) — swap OpenAI for Vertex AI by changing `LLM_MODEL` env var.
