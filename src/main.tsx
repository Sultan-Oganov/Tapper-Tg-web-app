import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";
import { Toaster } from "sonner";
import "./i18n"; // 👈 Подключаем

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-center"
        richColors
        toastOptions={{
          style: {
            background: "#1D234F",
            border: "none",
            color: "#fff",
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
