import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GenreProvider } from "./context/GenreContext.jsx";
import { GeneralProvider } from "./context/GeneralContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GeneralProvider>
      <GenreProvider>
        <App />
      </GenreProvider>
    </GeneralProvider>
  </StrictMode>
);
