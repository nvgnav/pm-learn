import { getCurrentUser } from "../api/auth";
import PageLayout from "../components/PageLayout";

export default function ProfilePage() {
  const user = getCurrentUser();

  return (
    <PageLayout activePage="profile">
      <div className="content-block">
        <h1>Профиль пользователя</h1>
        <p>
          ФИО: {user?.full_name || "Не указано"}.
          <br />
          Email: {user?.email || "Не указан"}.
          <br />
          Учебная группа: {user?.group_name || "Не указана"}.
          <br />
          Роль: {user?.role || "Не указана"}.
        </p>
      </div>
    </PageLayout>
  );
}