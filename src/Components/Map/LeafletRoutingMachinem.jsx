import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import img7 from "./map-marker-icon.png";
const LeafletRoutingMachinem = ({ setLat, setLng }) => {
  const map = useMap();

  map.on("click", function (e) {
    document.querySelector(".leaflet-pane.leaflet-marker-pane").innerHTML = "";
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    setLat(e.latlng.lat);
    setLng(e.latlng.lng);
    document.querySelector(
      ".leaflet-pane.leaflet-marker-pane"
    ).children[0].src = `${img7}`;
  });
  return null;
};

export default LeafletRoutingMachinem;
