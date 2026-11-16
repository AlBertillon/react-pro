/** Категория товара (например, "Электроника", "Одежда") */
export interface Category {
  /** Уникальный идентификатор категории */
  id: number;
  /** Название категории */
  name: string;
  /** URL-дружественный идентификатор (slug) */
  slug: string;
}

/** Информация о пользователе, создавшем товар */
export interface ProductUser {
  /** Уникальный идентификатор пользователя */
  id: string;
  /** Email пользователя */
  email: string;
  /** Имя пользователя */
  name: string;
  /** Путь к аватару */
  avatarPath: string;
  /** Информация о пользователе */
  about: string;
  /** Телефон пользователя */
  phone: string;
  /** Роли пользователя */
  roles: string[];
  /** ID товаров в избранном */
  likes: string[];
  /** Пароль (хэш) */
  password: string;
  /** ID постов в избранном */
  favoritesPost: string[];
}

/** Информация о пользователе в отзыве */
export interface ReviewUser {
  /** Уникальный идентификатор пользователя */
  id: string;
  /** Имя пользователя */
  name: string;
  /** Путь к аватару */
  avatarPath: string;
}

/** Отзыв о товаре */
export interface Review {
  /** Уникальный идентификатор отзыва */
  id: string;
  /** Текст отзыва */
  text: string;
  /** Оценка от 1 до 5 */
  rating: number;
  /** Дата создания */
  createdAt: string;
  /** Автор отзыва */
  user: ReviewUser;
}

/** Товар каталога */
export interface Product {
  /** Уникальный идентификатор товара */
  id: string;
  /** Дата создания товара */
  createdAt: string;
  /** Дата последнего обновления товара */
  updatedAt: string;
  /** Название товара */
  name: string;
  /** URL-дружественный идентификатор */
  slug: string;
  /** Описание товара */
  description: string;
  /** Цена товара */
  price: number;
  /** URL изображения товара */
  images: string;
  /** Скидка в процентах */
  discount: number;
  /** Остаток на складе */
  stock: number;
  /** Вес товара */
  wight: string;
  /** Теги товара */
  tags: string[];
  /** Флаг публикации товара */
  isPublished: boolean;
  /** Отзывы о товаре */
  reviews: Review[];
  /** ID лайков */
  likes: string[];
  /** Категория товара */
  category: Category;
  /** Пользователь, создавший товар */
  user: ProductUser;
}

/** Ответ API при получении списка товаров */
export interface ProductsResponse {
  /** Массив товаров */
  products: Product[];
  /** Общее количество товаров (для пагинации) */
  length: number;
}

/** Параметры запроса к API (фильтры, сортировка, пагинация) */
export interface ProductsQuery {
  /** Сортировка: по убыванию цены, по возрастанию цены, по новизне, по старинке */
  sort?: "high-price" | "low-price" | "newest" | "oldest";
  /** Поисковый запрос */
  searchTerm?: string;
  /** Рейтинг товара */
  ratings?: string;
  /** Минимальная цена */
  minPrice?: string;
  /** Максимальная цена */
  maxPrice?: string;
  /** Идентификатор категории */
  categoryId?: string;
  /** Количество товаров на странице */
  perPage?: number;
  /** Номер страницы */
  page?: number;
}
