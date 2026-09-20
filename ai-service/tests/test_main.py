"""Basic smoke tests for the FitFlow AI service."""

import pytest
from httpx import AsyncClient, ASGITransport

from main import app


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_generate_plan_queued():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post(
            "/v1/workouts/generate",
            json={
                "cognito_sub": "test-sub-123",
                "goal": "build_muscle",
                "sessions_per_week": 3,
                "duration_weeks": 4,
            },
        )
    assert response.status_code == 202
    data = response.json()
    assert data["status"] == "queued"
    assert "job_id" in data


@pytest.mark.asyncio
async def test_recognize_food():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        response = await client.post(
            "/v1/nutrition/recognize",
            json={"s3_key": "uploads/test-meal.jpg"},
        )
    assert response.status_code == 200
    data = response.json()
    assert len(data["candidates"]) > 0
    assert 0.0 <= data["candidates"][0]["confidence"] <= 1.0
