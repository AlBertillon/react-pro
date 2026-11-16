/** Профиль пользователя */
export interface User {
  /** ID пользователя */
  id: string;
  /** Email */
  email: string;
  /** Отображаемое имя */
  name?: string;
  /** URL аватара */
  avatarPath?: string;
  /** Биография */
  about?: string;
  /** Телефон */
  phone?: string;
  /** Роли */
  roles?: string[];
  /** ID лайкнутых товаров */
  likes?: string[];
  /** ID избранных постов */
  favoritesPost?: string[];
}

/** Ошибка API авторизации */
export interface AuthError {
  /** HTTP-код статуса */
  statusCode: number;
  /** Сообщения об ошибке */
  message: string[];
  /** Тип ошибки */
  error: string;
}
