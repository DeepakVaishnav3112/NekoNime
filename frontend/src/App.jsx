import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";
import Browse from "./pages/Browse";
import AuthPage from "./pages/AuthPage";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
