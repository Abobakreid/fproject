import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = ({ setLat, setLng }) => {
  const map = useMap();
  useEffect(() => {
    map.on("click", function (e) {
      document.querySelector(".leaflet-pane.leaflet-marker-pane").innerHTML =
        "";
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    });
  }, []);
  return null;
};

export default LeafletRoutingMachine;
