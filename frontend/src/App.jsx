import FiltersSection from "./components/FiltersSection/FiltersSection";
import Navbar from "./components/Navbar/Navbar";
import { useGeneralContext } from "./context/GeneralContext";
import Home from "./pages/Home";

function App() {
  const { dropDownOpen } = useGeneralContext();

  return (
    <div className="relative font-primary">
      <Navbar />
      {dropDownOpen && <FiltersSection />}
      <Home />
    </div>
  );
}

export default App;
