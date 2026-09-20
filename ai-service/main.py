"""
FitFlow AI Microservice
-----------------------
FastAPI application exposing:
  /health                       — liveness probe
  /v1/workouts/recommend        — retrieve similar plans using pgvector
  /v1/workouts/generate         — LLM-based personalised plan generation
  /v1/nutrition/recognize       — food recognition from S3 image
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import workouts, nutrition

app = FastAPI(
    title="FitFlow AI Service",
    description=(
        "AI microservice for personalised workout plan generation "
        "and food recognition. Internal service — not directly exposed to clients."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS (internal only) ──────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(workouts.router, prefix="/v1/workouts", tags=["workouts"])
app.include_router(nutrition.router, prefix="/v1/nutrition", tags=["nutrition"])


@app.get("/health", tags=["health"])
async def health() -> dict:
    """Liveness probe — used by ECS Fargate and docker-compose healthcheck."""
    return {"status": "ok", "service": "fitflow-ai"}
