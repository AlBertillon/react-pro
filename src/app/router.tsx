import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, Link } from "react-router-dom";

import CatalogPage from "pages/CatalogPage/CatalogPage";
import CartPage from "pages/CartPage/CartPage";
import FavoritesPage from "pages/FavoritesPage/FavoritesPage";
import CreateProductPage from "pages/CreateProductPage/CreateProductPage";
import Loader from "shared/ui/Loader";
import Footer from "shared/ui/Footer";
import { ProtectedRoute } from "entities/auth";
import Header from "widgets/Header/Header";
import './App.css'

const ProductDetailPage = lazy(() => import("pages/ProductDetailPage/ProductDetailPage"));
const UserPage = lazy(() => import("pages/UserPage/UserPage"));
const MyProductsPage = lazy(() => import("pages/MyProductsPage/MyProductsPage"));
const PurchasedPage = lazy(() => import("pages/PurchasedPage/PurchasedPage"));

/** Основной макет */
const RootLayout = () => (
  <div className="app-layout">
    <Header />
    <main className="app-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <CatalogPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
      {
        path: "/products/create",
        element: (
          <ProtectedRoute>
            <CreateProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader size={32} />}>
              <UserPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-products",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader size={32} />}>
              <MyProductsPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/purchased",
        element: (
          <Suspense fallback={<Loader size={32} />}>
            <PurchasedPage />
          </Suspense>
        ),
      },
      {
        path: "/products/:id",
        element: (
          <Suspense fallback={<Loader size={32} />}>
            <ProductDetailPage />
          </Suspense>
        ),
        loader: async ({ params }) => {
          const { product, error } = await import("pages/ProductDetailPage/ProductDetailPage").then(
            (m) => m.productLoader(params.id as string)
          );
          return { product, error };
        },
        errorElement: (
          <div className="product-detail-error">
            <h2>Товар не найден</h2>
            <Link to="/">Вернуться в каталог</Link>
          </div>
        ),
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

export default router;
