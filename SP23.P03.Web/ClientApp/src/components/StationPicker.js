import { useState } from "react";
import { SearchBox } from "./SearchBox";
import { StationList } from "./StationList";

export function StationPicker({ title }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStation, setSelectedStation] = useState();

  return (
    <div>
      <h2>{title}</h2>
      <SearchBox
        label="search term"
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <StationList
        searchTerm={searchTerm}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
      >
        {selectedStation ? "What seat do you want?" : null}
      </StationList>
    </div>
  );
}
