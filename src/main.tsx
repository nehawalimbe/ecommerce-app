import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { CartProvider } from "./context/CartContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
 
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <BrowserRouter>
//       <CartProvider>
//         <App />
//       </CartProvider>
//     </BrowserRouter>
//   </StrictMode>,
// );
