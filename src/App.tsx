import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AboutPage from "./pages/AboutPage";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<ProductsPage></ProductsPage>} />
        <Route path="/cart" element={<CartPage></CartPage>} />
        <Route path="/about" element={<AboutPage></AboutPage>} />
        <Route path="/product/:id" element={<ProductDetails></ProductDetails>} />
      </Routes>
    </>
  );
}

export default App;
