from __future__ import annotations
from typing import Any
from pydantic import BaseModel, Field
from enum import Enum


class FitnessGoal(str, Enum):
    lose_fat = "lose_fat"
    build_muscle = "build_muscle"
    maintain = "maintain"
    improve_endurance = "improve_endurance"


class ExperienceLevel(str, Enum):
    beginner = "beginner"
    intermediate = "intermediate"
    advanced = "advanced"


# ── Workout request/response models ──────────────────────────────────────────

class GeneratePlanRequest(BaseModel):
    cognito_sub: str
    goal: FitnessGoal
    equipment: list[str] = Field(default_factory=list)
    injuries: str | None = None
    experience: ExperienceLevel = ExperienceLevel.intermediate
    sessions_per_week: int = Field(3, ge=1, le=7)
    duration_weeks: int = Field(4, ge=1, le=52)


class Exercise(BaseModel):
    name: str
    sets: int
    reps: int | None = None
    duration_seconds: int | None = None
    rest_seconds: int = 60
    notes: str | None = None


class PlanSession(BaseModel):
    week: int
    day: int
    title: str
    estimated_duration_minutes: int
    exercises: list[Exercise]


class GeneratePlanResponse(BaseModel):
    job_id: str
    status: str = "queued"
    plan_sessions: list[PlanSession] | None = None


class RecommendPlanRequest(BaseModel):
    cognito_sub: str
    goal: FitnessGoal
    embedding_vector: list[float] | None = None


class RecommendPlanResponse(BaseModel):
    plan_ids: list[str]
    scores: list[float]


# ── Nutrition models ──────────────────────────────────────────────────────────

class FoodCandidate(BaseModel):
    name: str
    confidence: float = Field(ge=0.0, le=1.0)
    calories_per_100g: float
    protein_per_100g: float
    carbs_per_100g: float
    fat_per_100g: float
    estimated_portion_g: float | None = None


class RecognizeFoodRequest(BaseModel):
    s3_key: str


class RecognizeFoodResponse(BaseModel):
    candidates: list[FoodCandidate]
    raw_labels: list[str] = Field(default_factory=list)
