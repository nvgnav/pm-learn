from datetime import datetime
from pathlib import Path
import os

from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from app.core.database import get_db
from app.models.submission import Submission
from app.models.report import ReportLog
from app.models.user import User
from app.models.theory import TheoryMaterial
from app.models.practice import PracticeTask
from app.routers.users import require_roles, get_current_user


router = APIRouter(prefix="/reports", tags=["Reports"])

REPORT_DIR = Path("reports/generated")
REPORT_DIR.mkdir(parents=True, exist_ok=True)

BASE_DIR = Path(__file__).resolve().parent.parent
FONT_PATH = BASE_DIR / "fonts" / "DejaVuSans.ttf"

if FONT_PATH.exists():
    pdfmetrics.registerFont(TTFont("DejaVu", str(FONT_PATH)))
    PDF_FONT = "DejaVu"
else:
    PDF_FONT = "Helvetica"


def save_report_log(db: Session, report_type: str, file_path: str, created_by: int) -> None:
    log = ReportLog(
        report_type=report_type,
        file_path=file_path,
        created_by=created_by
    )
    db.add(log)
    db.commit()


def draw_multiline_text(c: canvas.Canvas, text: str, x: int, y: int, max_width: int, line_height: int = 16):
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        test_line = f"{current_line} {word}".strip()
        width = pdfmetrics.stringWidth(test_line, PDF_FONT, 11)
        if width <= max_width:
            current_line = test_line
        else:
            if current_line:
                lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)

    for line in lines:
        c.drawString(x, y, line)
        y -= line_height

    return y


def init_pdf(file_path: Path, title: str):
    c = canvas.Canvas(str(file_path), pagesize=A4)
    width, height = A4

    c.setFont(PDF_FONT, 16)
    c.drawString(50, height - 40, title)

    c.setFont(PDF_FONT, 10)
    c.drawString(50, height - 60, f"Дата формирования: {datetime.now().strftime('%d.%m.%Y %H:%M:%S')}")

    y = height - 90
    return c, width, height, y


def check_new_page(c: canvas.Canvas, y: int, height: float):
    if y < 60:
        c.showPage()
        c.setFont(PDF_FONT, 11)
        return height - 50
    return y


@router.get("/my-progress")
def my_progress_report(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    if user.role == "student":
        rows = db.query(Submission).filter(Submission.student_id == user.id).all()
    else:
        rows = db.query(Submission).all()

    total = len(rows)
    checked_rows = [row for row in rows if row.score is not None]
    checked = len(checked_rows)
    avg_score = round(sum(row.score for row in checked_rows) / checked, 2) if checked else 0

    return {
        "message": "Отчет сформирован в приложении",
        "user_id": user.id,
        "role": user.role,
        "total_submissions": total,
        "checked_submissions": checked,
        "average_score": avg_score,
        "generated_at": datetime.now().strftime("%d.%m.%Y %H:%M:%S")
    }


@router.get("/users-pdf")
def users_pdf_report(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "teacher"))
):
    rows = db.query(User).all()
    file_path = REPORT_DIR / f"users_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    c, width, height, y = init_pdf(file_path, "Отчет №1. Пользователи")
    c.setFont(PDF_FONT, 11)

    c.drawString(50, y, f"Всего пользователей: {len(rows)}")
    y -= 25

    for row in rows:
        text = (
            f"ID: {row.id}; ФИО: {row.full_name}; "
            f"Email: {row.email}; Роль: {row.role}; "
            f"Активен: {'Да' if row.is_active else 'Нет'}; "
            f"Дата регистрации: {row.created_at}"
        )
        y = draw_multiline_text(c, text, 50, y, max_width=500)
        y -= 10
        y = check_new_page(c, y, height)

    c.save()
    save_report_log(db, "users_pdf", str(file_path), user.id)

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        filename=file_path.name
    )


@router.get("/practice-pdf")
def practice_pdf_report(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "teacher"))
):
    rows = db.query(PracticeTask).all()
    file_path = REPORT_DIR / f"practice_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    c, width, height, y = init_pdf(file_path, "Отчет №2. Практические задания")
    c.setFont(PDF_FONT, 11)

    c.drawString(50, y, f"Всего практических заданий: {len(rows)}")
    y -= 25

    for row in rows:
        text = (
            f"ID: {row.id}; Название: {row.title}; "
            f"Описание: {row.description}; "
            f"Максимальный балл: {row.max_score}; "
            f"Опубликовано: {'Да' if row.is_published else 'Нет'}; "
            f"Дата создания: {row.created_at}"
        )
        y = draw_multiline_text(c, text, 50, y, max_width=500)
        y -= 10
        y = check_new_page(c, y, height)

    c.save()
    save_report_log(db, "practice_pdf", str(file_path), user.id)

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        filename=file_path.name
    )


@router.get("/submissions-pdf")
def submissions_pdf_report(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "teacher"))
):
    rows = db.query(Submission).all()
    file_path = REPORT_DIR / f"submissions_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    grades = [row.score for row in rows if row.score is not None]
    avg_score = round(sum(grades) / len(grades), 2) if grades else 0

    c, width, height, y = init_pdf(file_path, "Отчет №3. Отправленные решения")
    c.setFont(PDF_FONT, 11)

    c.drawString(50, y, f"Всего решений: {len(rows)}")
    y -= 18
    c.drawString(50, y, f"Средняя оценка: {avg_score}")
    y -= 25

    for row in rows:
        text = (
            f"ID решения: {row.id}; ID студента: {row.student_id}; "
            f"ID задания: {row.practice_id}; "
            f"Оценка: {row.score if row.score is not None else 'не проверено'}; "
            f"Статус: {row.status}; "
            f"Комментарий: {row.feedback if row.feedback else 'нет'}; "
            f"Дата создания: {row.created_at}"
        )
        y = draw_multiline_text(c, text, 50, y, max_width=500)
        y -= 10
        y = check_new_page(c, y, height)

    c.save()
    save_report_log(db, "submissions_pdf", str(file_path), user.id)

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        filename=file_path.name
    )


@router.get("/theory-pdf")
def theory_pdf_report(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "teacher"))
):
    rows = db.query(TheoryMaterial).all()
    file_path = REPORT_DIR / f"theory_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    c, width, height, y = init_pdf(file_path, "Отчет №4. Теоретические материалы")
    c.setFont(PDF_FONT, 11)

    c.drawString(50, y, f"Всего теоретических материалов: {len(rows)}")
    y -= 25

    for row in rows:
        text = (
            f"ID: {row.id}; Заголовок: {row.title}; "
            f"Описание: {row.description}; "
            f"Порядок: {row.order_index}; "
            f"Опубликован: {'Да' if row.is_published else 'Нет'}; "
            f"Дата создания: {row.created_at}"
        )
        y = draw_multiline_text(c, text, 50, y, max_width=500)
        y -= 10
        y = check_new_page(c, y, height)

    c.save()
    save_report_log(db, "theory_pdf", str(file_path), user.id)

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        filename=file_path.name
    )


@router.get("/students-results-pdf")
def students_results_pdf_report(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("admin", "teacher"))
):
    students = db.query(User).filter(User.role == "student").all()
    practice_count = db.query(PracticeTask).count()
    file_path = REPORT_DIR / f"students_results_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"

    c, width, height, y = init_pdf(file_path, "Отчет №5. Успеваемость студентов")
    c.setFont(PDF_FONT, 11)

    c.drawString(50, y, f"Всего студентов: {len(students)}")
    y -= 18
    c.drawString(50, y, f"Всего практических заданий: {practice_count}")
    y -= 25

    for student in students:
        submissions = db.query(Submission).filter(Submission.student_id == student.id).all()
        checked_submissions = [submission for submission in submissions if submission.score is not None]
        avg_score = round(
            sum(submission.score for submission in checked_submissions) / len(checked_submissions),
            2
        ) if checked_submissions else 0

        text = (
            f"Студент: {student.full_name}; "
            f"Email: {student.email}; "
            f"Всего решений: {len(submissions)} из {practice_count}; "
            f"Проверено решений: {len(checked_submissions)}; "
            f"Средний балл: {avg_score}"
        )
        y = draw_multiline_text(c, text, 50, y, max_width=500)
        y -= 10
        y = check_new_page(c, y, height)

    c.save()
    save_report_log(db, "students_results_pdf", str(file_path), user.id)

    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        filename=file_path.name
    )