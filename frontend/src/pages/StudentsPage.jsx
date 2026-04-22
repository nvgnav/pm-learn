import PageLayout from "../components/PageLayout";

export default function StudentsPage() {
  return (
    <PageLayout activePage="students">
      <div className="content-block">
        <h1>Результаты студентов</h1>
        <p>
          Раздел доступен администратору. Здесь позже можно вывести список студентов,
          их результаты по практическим и аудиторным работам, оценки и общий прогресс.
        </p>
      </div>
    </PageLayout>
  );
}