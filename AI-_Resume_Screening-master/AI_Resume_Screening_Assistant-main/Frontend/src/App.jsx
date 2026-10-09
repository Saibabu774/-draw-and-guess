import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import ResumeMatching from "./pages/ResumeMatching";
import CandidateSummary from "./pages/CandidateSummary";
import InterviewQuestions from "./pages/InterviewQuestions";
import EvaluationHistory from "./pages/EvaluationHistory";
import Upload from "./pages/Upload"; // 1. idhi import chey

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

      <Route
        path="/"
        element={
          user? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/login"
        element={
          user? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route
        path="/register"
        element={
          user? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Register />
          )
        }
      />

      {/* ========================= */}
      {/* Protected Routes */}
      {/* ========================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <Candidates />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-matching"
        element={
          <ProtectedRoute>
            <ResumeMatching />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate-summary"
        element={
          <ProtectedRoute>
            <CandidateSummary />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview-questions"
        element={
          <ProtectedRoute>
            <InterviewQuestions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/evaluation-history"
        element={
          <ProtectedRoute>
            <EvaluationHistory />
          </ProtectedRoute>
        }
      />

      {/* 2. NEW UPLOAD ROUTE ADD CHESAM */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
<Route
  path="/upload"
  element={<Upload />}
/>