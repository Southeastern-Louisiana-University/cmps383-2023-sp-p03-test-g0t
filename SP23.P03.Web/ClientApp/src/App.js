import "./App.css";
import React from "react";
import { StationPicker } from "./components/StationPicker";

function App() {
  return (
    <div className="App">
      <StationPicker title={"Orgin"} />
      <StationPicker title={"Destination"} />
    </div>
  );
}

export default App;
