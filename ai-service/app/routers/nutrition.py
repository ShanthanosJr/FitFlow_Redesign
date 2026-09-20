"""Nutrition AI router — food recognition from photos."""

import boto3
from fastapi import APIRouter, HTTPException
from app.models.schemas import RecognizeFoodRequest, RecognizeFoodResponse, FoodCandidate
from app.config import settings

router = APIRouter()


@router.post("/recognize", response_model=RecognizeFoodResponse)
async def recognize_food(req: RecognizeFoodRequest) -> RecognizeFoodResponse:
    """
    Recognize food in an S3 image and return candidate food items with
    macro estimates and confidence scores.

    Pipeline (TODO: full implementation):
    1. Download image from S3 using the provided key.
    2. Run inference (AWS Rekognition labels + OpenAI Vision GPT-4o).
    3. Map labels → food catalogue entries with macro lookup.
    4. Return ranked candidates with estimated portion size.
    """
    # Stub response — replace with real inference
    stub_candidates = [
        FoodCandidate(
            name="Chicken Breast (grilled)",
            confidence=0.92,
            calories_per_100g=165.0,
            protein_per_100g=31.0,
            carbs_per_100g=0.0,
            fat_per_100g=3.6,
            estimated_portion_g=150.0,
        ),
        FoodCandidate(
            name="Brown Rice (cooked)",
            confidence=0.85,
            calories_per_100g=111.0,
            protein_per_100g=2.6,
            carbs_per_100g=23.0,
            fat_per_100g=0.9,
            estimated_portion_g=200.0,
        ),
    ]
    return RecognizeFoodResponse(
        candidates=stub_candidates,
        raw_labels=["Chicken", "Rice", "Food", "Meal"],
    )
