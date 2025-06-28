import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";
import Browse from "./pages/Browse";

function App() {

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/anime/:id" element={<AnimePage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
