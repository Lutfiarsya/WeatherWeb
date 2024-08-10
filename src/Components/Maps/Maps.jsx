import { maps } from "../../libs/apicall"
import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
function WeatherMap() {
  const apiMaps = 'https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=a55bca5aaf89dd7973d4234b37a9a385';

  return (
    <div>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;