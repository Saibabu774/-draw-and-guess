import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      <div style={{ background: "#1976d2", color: "white", padding: "12px", display: "flex", justifyContent: "space-between" }}>
        <span>App - {user?.username}</span>
        <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>
      </div>
      <div style={{ padding: 20 }}><Outlet /></div>
    </div>
  );
}