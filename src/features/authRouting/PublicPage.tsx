import { useNavigate } from "react-router-dom";

export function PublicPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/login")} style={styles.loginButton}>
        Войти
      </button>
      <h2>Публичная страница</h2>
      <p>Эта страница доступна всем пользователям без авторизации.</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "24px",
    position: "relative",
  },
  loginButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};