import os
from functools import lru_cache
from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Ensure the exact backend/.env file is resolved
BACKEND_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_FILE)


class Settings(BaseSettings):
    app_name: str = "RAFON AI API"
    app_version: str = "2.0.0"
    environment: str = "development"

    frontend_url: str = "http://localhost:3000"

    database_url: str = "sqlite:///./rafon.db"

    # Support GROQ_API_KEY or fallback to GROK_API_KEY
    groq_api_key: str | None = os.getenv("GROQ_API_KEY") or os.getenv("GROK_API_KEY")

    razorpay_key_id: str | None = os.getenv("RAZORPAY_KEY_ID")
    razorpay_key_secret: str | None = os.getenv("RAZORPAY_KEY_SECRET")
    razorpay_webhook_secret: str | None = os.getenv("RAZORPAY_WEBHOOK_SECRET")

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
