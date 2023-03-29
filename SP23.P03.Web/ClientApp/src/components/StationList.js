import "./StationList.css";
import axios from "axios";
import { useEffect, useState } from "react";

export function StationList({
  selectedStation,
  setSelectedStation,
  searchTerm,
  children,
}) {
  const [locatedStations, setLocatedStations] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`/api/stations?searchTerm=${searchTerm}`)
        .then((x) => setLocatedStations(x.data));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <>
      <div className="station-list">
        {locatedStations.map((x) => (
          <div
            className={
              "station-list_item" + (x === selectedStation ? " selected" : "")
            }
            key={x.id}
            onClick={() => setSelectedStation(x)}
          >
            {x.name}
          </div>
        ))}
      </div>
      {children}
    </>
  );
}
