from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # Server
    port: int = 8000
    cors_origins: List[str] = ["http://localhost:3000"]

    # PostgreSQL (same instance as backend, separate schema or same DB)
    database_url: str = "postgresql://fitflow:fitflow_dev_password@localhost:5432/fitflow_dev"

    # OpenAI / LLM provider (swap via adapter interface)
    openai_api_key: str = "sk-placeholder"
    llm_model: str = "gpt-4o-mini"

    # AWS
    aws_region: str = "us-east-1"
    s3_bucket_name: str = "fitflow-media-dev"

    # Feature flags
    enable_pgvector: bool = True


settings = Settings()
