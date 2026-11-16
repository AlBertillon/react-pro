# React + TypeScript + Vite

## Структура

```
src/
├── app/              — точка входа, роутер, провайдеры
├── shared/           — UI-компоненты, хуки, ассеты (чистая презентация)
├── entities/         — доменные сущности: auth, cart, product, favorites
├── features/         — фичи: add-to-cart, product-card, auth-modal
├── widgets/          — виджеты: Header, ProductFilters и тд.
└── pages/            — страницы: CartPage, UserPage, ProductDetailPage и тд.
```

Зависимости идут только вниз: `shared` ← `entities` ← `features` ← `widgets` ← `pages`.

## Что сделано

### Загрузка данных
- **useFetch** — кастомный хук с `AbortController` для отмены запросов
- **useProducts** — хук загрузки списка товаров
- **getUserById** — загрузка профиля пользователя по ID

### Авторизация
- **AuthProvider** — React Context с localStorage для токена
- **AuthModal** — модалка входа/регистрации с табами, `useActionState`, `React.Portal`, `#modal-root`, ESC, автофокус
- **ProtectedRoute** — защищённый маршрут для авторизованных пользователей
- **Регистрация** — форма с полями email, name, password, avatarPath, about, phone; валидация на клиенте; обработка ошибок 400/409/500

### Корзина и покупки
- **CartProvider** — Context с localStorage для товаров корзины
- **CartPage** — страница корзины с изменением количества и кнопкой "Купить"
- **Кнопка "Купить"** — добавляет все товары в PurchasedProvider, редирект на `/purchased`

### Избранное
- **FavoritesProvider** — Context с localStorage для лайкнутых товаров
- **FavoriteButton** — кнопка добавления/удаления из избранного с toast-уведомлениями
- **FavoritesPage** — страница списка избранных товаров

### Купленные товары
- **PurchasedProvider** — Context с localStorage, учитывает quantity при повторной покупке
- **PurchasedPage** — страница купленных товаров с счётчиком и кнопкой "Очистить историю"
- **PurchasedIcon** — SVG-иконка пакета в шапке
- **ProductCard** — показывает "Куплено: N шт." вместо кнопки "В корзину" для купленных товаров

### Каталог товаров
- **CatalogPage** — список товаров с пагинацией (shared-хук `usePagination`)
- **ProductCard** — карточка товара с ценой, наличием, кнопками корзины и избранного
- **ProductFilters** — виджет фильтров товаров
- **ProductDetailPage** — детальная страница товара
- **usePagination** — shared-хук для пагинации (используется в каталоге)

### Пользователь
- **UserPage** — защищённый маршрут, SVG-аватар, fallback при битой ссылке
- **MyProductsPage** — страница "Мои товары" с загрузкой из `/users/me`
- **CreateProductPage** — страница создания нового товара

### Уведомления
- **react-toastify** — toast-уведомления при покупке и добавлении в избранное

### Оптимизация
- **React.memo** — на всех списках, карточках, UI-компонентах
- **useMemo/useCallback** — для тяжёлых вычислений и обработчиков
- **React.Portal** — для модального окна
- **Lazy loading** — страницы загружаются через `React.lazy`

### Роутинг
- `/` — каталог товаров
- `/cart` — корзина
- `/favorites` — избранное
- `/purchased` — купленные товары
- `/user` — профиль пользователя
- `/my-products` — мои товары
- `/product/:id` — детальная страница товара
- `/create` — создание товара

## Сборки

Два варианта: Oxc (по умолчанию) и SWC.
Oxc:
    Время сборки: 723 ms
    Размер бандла: 450.17 kB

SWC:
    Время сборки: 631 ms
    Размер бандла: 450.17 kB


## hotspot
Header — перерендеривается при каждом изменении корзины,

## Запуск

```bash
npm install
npm run dev
npm run build        # Oxc
npm run build:swc    # SWC
```
