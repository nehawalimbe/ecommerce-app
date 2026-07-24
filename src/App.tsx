import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <NavBar />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
