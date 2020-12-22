import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import {CRS} from 'leaflet';
import gtasamap from './assets/maps/gtasamap.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <MapContainer center={[1500, 1500]} 
                    zoom={-2} minZoom={-3} maxZoom={2} 
                    crs={CRS.Simple}
                    maxBounds={[[-50, -50], [3122, 3122]]}
                    maxBoundsViscosity={0.5}
                    doubleClickZoom={false}>
        <ImageOverlay url={gtasamap} bounds={[[0, 0], [3072, 3072]]}/>
        <Marker position={[1500, 1800]}></Marker>
        <Marker position={[1100, 1500]}></Marker>
      </MapContainer>
    </div>
  );
}

export default App;