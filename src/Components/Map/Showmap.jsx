import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const Showmap = ({ lng, lat, alldir }) => {
  console.log(alldir, "alldir");
  const map = useMap();
  useEffect(() => {
    L.Routing.control({
      waypoints: [L.latLng(alldir[0], alldir[1]), L.latLng(lat, lng)],
    }).addTo(map);
  }, []);

  return null;
};

export default Showmap;
