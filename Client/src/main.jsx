import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MouseFollower } from "react-mouse-follower";
import { ThemeProvider } from "@material-tailwind/react";
import { LanguageProvider } from "./context/LanguageContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MouseFollower />
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
