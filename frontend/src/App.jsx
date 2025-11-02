import React, { useState } from "react";
import Hero from "./components/Hero";
import Simulator from "./components/Simulator";

function App() {
  // This state controls which page is visible
  const [page, setPage] = useState("home"); // 'home' or 'simulator'

  if (page === "home") {
    return <Hero onStartSimulation={() => setPage("simulator")} />;
  }

  if (page === "simulator") {
    return <Simulator onBackToHome={() => setPage("home")} />;
  }
}

export default App;
