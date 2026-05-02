from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine, SessionLocal

from app.models import user, theory, practice, submission, report, practice_result
from app.seed import seed_data

from app.routers.auth import router as auth_router
from app.routers.users import router as users_router
from app.routers.theory import router as theory_router
from app.routers.practice import router as practice_router
from app.routers.submissions import router as submissions_router
from app.routers.reports import router as reports_router
from app.routers.practice_results import router as practice_results_router


# 🔥 СНАЧАЛА СОЗДАЕМ APP
app = FastAPI(title="PM-Learn API")


# 🔥 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔥 БД + сидинг
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()


# 🔥 ROOT
@app.get("/")
def root():
    return {"message": "PM-Learn API работает"}


# 🔥 РОУТЫ (ВСЕ ТУТ, ПОСЛЕ app)
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(theory_router)
app.include_router(practice_router)
app.include_router(submissions_router)
app.include_router(reports_router)
app.include_router(practice_results_router)