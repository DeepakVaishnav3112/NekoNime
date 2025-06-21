import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GenreProvider } from "./context/GenreContext.jsx";
import { GeneralProvider } from "./context/GeneralContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralProvider>
        <GenreProvider>
          <App />
        </GenreProvider>
      </GeneralProvider>
    </BrowserRouter>
  </StrictMode>
);
