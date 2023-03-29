import logo from "./logo.svg";
import "./App.css";
import { useContext, useEffect, useMemo } from "react";
import React, { useState } from "react";
import axios from "axios";
import { SearchBox } from "./components/SearchBox";
import { StationList } from "./components/StationList";
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
