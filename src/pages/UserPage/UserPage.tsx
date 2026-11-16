import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getUserById, useAuth, useAuthActions } from "entities/auth";
import type { User } from "entities/auth";
import Button from "shared/ui/Button";
import userSvg from "shared/assets/user.svg";

import "./UserPage.css";

/** Страница профиля */
const UserPage = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const token = localStorage.getItem("auth_token");

    if (!token) return;

    setIsLoading(true);
    setError(null);

    getUserById(user.id, token)
      .then((data: User | null) => {
        if (cancelled) return;
        setProfile(data);
        setAvatarError(false);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="user-page">
        <h1>Профиль</h1>
        <p className="user-page__loading">Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-page">
        <h1>Профиль</h1>
        <p className="user-page__error">{error}</p>
        <Link to="/">
          <Button variant="primary" text="Вернуться в каталог" />
        </Link>
      </div>
    );
  }

  return (
    <div className="user-page">
      <Link to="/" className="user-page__back">
        ← Вернуться в каталог
      </Link>

      <h1>Профиль</h1>

      <div className="user-page__avatar-wrapper">
        {profile?.avatarPath && !avatarError ? (
          <img
            src={profile.avatarPath}
            alt={profile.name || "Аватар"}
            className="user-page__avatar"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <img src={userSvg} alt="Аватар" className="user-page__avatar user-page__avatar--fallback" />
        )}
      </div>

      <div className="user-page__info">
        <div className="user-page__field">
          <span className="user-page__label">Email:</span>
          <span className="user-page__value">{profile?.email}</span>
        </div>

        {profile?.name && (
          <div className="user-page__field">
            <span className="user-page__label">Имя:</span>
            <span className="user-page__value">{profile.name}</span>
          </div>
        )}

        {profile?.phone && (
          <div className="user-page__field">
            <span className="user-page__label">Телефон:</span>
            <span className="user-page__value">{profile.phone}</span>
          </div>
        )}

        {profile?.about && (
          <div className="user-page__field">
            <span className="user-page__label">О себе:</span>
            <span className="user-page__value">{profile.about}</span>
          </div>
        )}

        {profile?.roles && profile.roles.length > 0 && (
          <div className="user-page__field">
            <span className="user-page__label">Роли:</span>
            <span className="user-page__value">{profile.roles.join(", ")}</span>
          </div>
        )}
      </div>

      <div className="user-page__actions">
        <Button variant="primary" text="Выход" onClick={() => logout()} />
      </div>
    </div>
  );
};

export default UserPage;
