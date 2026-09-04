from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "RAFON AI API"
    app_version: str = "0.1.0"
    environment: str = "development"

    frontend_url: str = "http://localhost:3000"

    database_url: str = "sqlite:///./rafon.db"

    grok_api_key: str | None = None
    xai_api_key: str | None = None
    gemini_api_key: str | None = None
    groq_api_key: str | None = None

    razorpay_key_id: str | None = None
    razorpay_key_secret: str | None = None
    razorpay_webhook_secret: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
