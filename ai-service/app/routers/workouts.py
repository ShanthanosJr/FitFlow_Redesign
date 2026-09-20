"""Workout AI router — plan generation and recommendation."""

import uuid
from fastapi import APIRouter, BackgroundTasks, HTTPException
from app.models.schemas import (
    GeneratePlanRequest,
    GeneratePlanResponse,
    RecommendPlanRequest,
    RecommendPlanResponse,
)
from app.config import settings

router = APIRouter()


# ── Helpers (TODO: replace stubs with real implementations) ───────────────────

async def _generate_plan_task(job_id: str, req: GeneratePlanRequest) -> None:
    """
    Background task:
    1. Build feature vector from user profile + history (PostgreSQL).
    2. Retrieve similar exercise templates via pgvector (cosine similarity).
    3. Compose prompt; call LLM (OpenAI / Vertex) to generate structured plan.
    4. Validate plan against safety rules (load progression, contraindications).
    5. Write plan to PostgreSQL; publish plan.ready to SQS → WebSocket gateway.
    """
    # TODO: implement full pipeline
    pass


@router.post("/generate", response_model=GeneratePlanResponse, status_code=202)
async def generate_plan(
    req: GeneratePlanRequest,
    background_tasks: BackgroundTasks,
) -> GeneratePlanResponse:
    """
    Kick off an async workout plan generation job.
    Returns immediately with a jobId; the NestJS WebSocket gateway
    delivers `plan.ready` when the job completes.
    """
    job_id = str(uuid.uuid4())
    background_tasks.add_task(_generate_plan_task, job_id, req)
    return GeneratePlanResponse(job_id=job_id, status="queued")


@router.post("/recommend", response_model=RecommendPlanResponse)
async def recommend_plans(req: RecommendPlanRequest) -> RecommendPlanResponse:
    """
    Return plan IDs ranked by similarity to the user's profile embedding.
    Uses pgvector cosine similarity over the plans table.
    TODO: implement real embedding lookup.
    """
    return RecommendPlanResponse(
        plan_ids=["placeholder-plan-id"],
        scores=[0.95],
    )
