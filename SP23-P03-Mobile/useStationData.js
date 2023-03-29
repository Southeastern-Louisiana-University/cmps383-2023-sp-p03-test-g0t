import { useEffect, useState } from "react";
import { BaseUrl } from "./configuration";

export function useStationData() {
  const [stuff, setStuff] = useState([]);
  useEffect(() => {
    fetch(`${BaseUrl}/api/stations`)
      .then((x) => x.json())
      .then((x) => setStuff(x));
  }, []);

  return stuff;
}
