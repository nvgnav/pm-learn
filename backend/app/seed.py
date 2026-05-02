from sqlalchemy.orm import Session
from app.models.user import User
from app.models.theory import TheoryMaterial
from app.models.practice import PracticeTask
from app.core.security import hash_password


def seed_data(db: Session):
    if db.query(User).count() == 0:
        users = [
            User(
                full_name="Администратор",
                email="admin@pmlearn.com",
                password_hash=hash_password("admin123"),
                role="admin"
            ),
            User(
                full_name="Преподаватель",
                email="teacher@pmlearn.com",
                password_hash=hash_password("teacher123"),
                role="teacher"
            ),
            User(
                full_name="Студент",
                email="student@pmlearn.com",
                password_hash=hash_password("student123"),
                role="student"
            ),
        ]
        db.add_all(users)

    if db.query(TheoryMaterial).count() == 0:
        theory_items = [
            TheoryMaterial(
                title="Введение в проектный менеджмент",
                description="Базовая теория",
                content="Теоретический материал по основам управления проектами.",
                order_index=1
            ),
            TheoryMaterial(
                title="Жизненный цикл проекта",
                description="Основные этапы проекта",
                content="Инициация, планирование, исполнение, контроль и завершение проекта.",
                order_index=2
            ),
        ]
        db.add_all(theory_items)

    if db.query(PracticeTask).count() == 0:
        practice_items = [
            PracticeTask(
                title="Практика 1",
                description="Базовое задание",
                task_text="Опишите основные этапы жизненного цикла проекта.",
                max_score=100
            ),
            PracticeTask(
                title="Практика 2",
                description="Планирование проекта",
                task_text="Составьте краткий план проекта по выбранной теме.",
                max_score=100
            ),
        ]
        db.add_all(practice_items)

    db.commit()