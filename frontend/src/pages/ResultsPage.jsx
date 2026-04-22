import PageLayout from "../components/PageLayout";

export default function ResultsPage() {
  return (
    <PageLayout activePage="results">
      <div className="content-block">
        <h1>Мои результаты</h1>
        <p>
          Здесь будет отображаться информация о выполненных практических и
          аудиторных работах, набранных баллах, статусах проверки и общем прогрессе.
        </p>
      </div>
    </PageLayout>
  );
}