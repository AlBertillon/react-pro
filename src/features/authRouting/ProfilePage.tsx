import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

export function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  if (isLoading) {
    return <div style={styles.loading}>Загрузка...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Профиль</h2>

      <div style={styles.card}>
        <p style={styles.info}>
          <strong>Имя:</strong> {user?.name || user?.email || "—"}
        </p>
        <p style={styles.info}>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <button onClick={handleLogout} style={styles.button}>
        Выйти
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loading: {
    textAlign: "center",
    padding: "40px",
    fontSize: "16px",
    color: "#666",
  },
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "24px",
  },
  title: {
    margin: "0 0 20px",
  },
  card: {
    padding: "16px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  info: {
    margin: "8px 0",
  },
  button: {
    padding: "10px 24px",
    fontSize: "14px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};