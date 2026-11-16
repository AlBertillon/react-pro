import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, AuthModalProvider } from "entities/auth";
import { CartProvider } from "entities/cart";
import { FavoritesProvider } from "entities/favorites";
import { PurchasedProvider } from "entities/purchased";
import AuthModal from "features/authModal";

import router from "./router";

/** Корневой компонент приложения */
function App() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <CartProvider>
          <FavoritesProvider>
            <PurchasedProvider>
              <RouterProvider router={router} />
              <AuthModal />
              <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
            </PurchasedProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthModalProvider>
    </AuthProvider>
  );
}

export default App;
