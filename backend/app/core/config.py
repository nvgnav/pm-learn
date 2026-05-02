from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "PM-Learn API"
    secret_key: str = "super-secret-key-change-me"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 1440
    database_url: str = "sqlite:///./pm_learn.db"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()