import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Simulator from "./components/Simulator";
import IrrigationCard from "./components/IrrigationCard";
import Navbar from "./components/Navbar";
import InfoSection from "./components/InfoSection";
import WeatherSearch from "./components/WeatherSearch";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <InfoSection />
            </>
          }
        />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/irrigation" element={<IrrigationCard />} />
        <Route path="/weather" element={<WeatherSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
