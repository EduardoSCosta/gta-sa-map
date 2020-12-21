import { MapContainer, ImageOverlay } from 'react-leaflet';
import {CRS} from 'leaflet';
import gtasamap from './assets/maps/gtasamap.jpg'
import './App.css';

function App() {
  return (
    <div className="App">
      <MapContainer center={[3072, 0]} 
                    zoom={0} minZoom={-3} maxZoom={2} 
                    crs={CRS.Simple}>
        <ImageOverlay url={gtasamap} bounds={[[0, 0], [3072, 3072]]}/>
      </MapContainer>
    </div>
  );
}

export default App;