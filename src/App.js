import React, { useState } from "react";
import "./App.css";
import flightsData from "./data/flights.json";
import FlightTable from "./components/FlightTable";

function App() {
  const [flights, setFlights] = useState(flightsData?.flights ?? []);

  return (
    <div className="app-wrapper">
      {/* Breadcrumb */}
      <div className="app-breadcrumb">
        Operations <span>›</span> <span>Flight Schedule</span>
      </div>

      {/* Live badge */}
      <div className="app-live-badge">
        <span className="live-dot" />
        LIVE — SEASON 2026
      </div>

      {/* Title */}
      <h1 className="app-title">
        Flight Schedule <span className="accent">Management</span>
      </h1>
      <p className="app-subtitle">
        Monitor, edit, and manage all active routes across your network.
      </p>

      <FlightTable flights={flights} setFlights={setFlights} />
    </div>
  );
}

export default App;
