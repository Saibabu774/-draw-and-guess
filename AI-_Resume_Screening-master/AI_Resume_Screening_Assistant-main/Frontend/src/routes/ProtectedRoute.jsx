import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  /*
  ============================================
  Loading
  ============================================
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent" />

      </div>
    );
  }

  /*
  ============================================
  Not Logged In
  ============================================
  */

  if (!user) {
    return <Navigate to="/" replace />;
  }

  /*
  ============================================
  Logged In
  ============================================
  */

  return children;
}