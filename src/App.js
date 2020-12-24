import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import { CRS } from 'leaflet';
import gtasamap from './assets/maps/gtasamap.jpg';
import { oystersLocations } from './data/oysters';
import './App.css';

function App() {

  return (
    <div className="App">
      <MapContainer center={[1500, 1500]} 
                    zoom={-2} minZoom={-3} maxZoom={2} 
                    crs={CRS.Simple}
                    maxBounds={[[-500, -500], [3650, 3650]]}
                    maxBoundsViscosity={0.5}
                    doubleClickZoom={false}>
        <ImageOverlay url={gtasamap} bounds={[[0, 0], [3150, 3150]]}/>
        {oystersLocations.map((oyster) => {
          return (
            <Marker position={[oyster.lat, oyster.lng]} key={oyster.id}></Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;