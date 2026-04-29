import { useState } from "react";
import PageLayout from "../components/PageLayout";
import ClassroomTopicList from "../components/classroom/ClassroomTopicList";
import ClassroomCostPractice from "../components/classroom/ClassroomCostPractice";
import "../styles/study.css";

export default function ClassroomPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  if (selectedTopic === "randomness-project-management") {
    return (
      <PageLayout title="Аудиторные работы" activePage="classroom">
        <ClassroomCostPractice onBack={() => setSelectedTopic(null)} />
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Аудиторные работы" activePage="classroom">
      <ClassroomTopicList onOpenTopic={setSelectedTopic} />
    </PageLayout>
  );
}