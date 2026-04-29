import { Navigate, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TheoryPage from "./pages/TheoryPage";
import TheoryTimePage from "./pages/TheoryTimePage";
import PracticePage from "./pages/PracticePage";
import ClassroomPage from "./pages/ClassroomPage";
import ResultsPage from "./pages/ResultsPage";
import ProfilePage from "./pages/ProfilePage";
import StudentsPage from "./pages/StudentsPage";

import { getToken, getCurrentUser } from "./api/auth";

function PrivateRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const token = getToken();
  const user = getCurrentUser();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<AuthPage />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/theory"
        element={
          <PrivateRoute>
            <TheoryPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/theory/time-management"
        element={
          <PrivateRoute>
            <TheoryTimePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/classroom"
        element={
          <PrivateRoute>
            <ClassroomPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/practice"
        element={
          <PrivateRoute>
            <PracticePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/results"
        element={
          <PrivateRoute>
            <ResultsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/students"
        element={
          <AdminRoute>
            <StudentsPage />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}