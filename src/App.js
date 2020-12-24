import { MapContainer, ImageOverlay, Marker } from 'react-leaflet';
import { CRS } from 'leaflet';
import gtasamap from './assets/maps/gtasamap.jpg';
import axios from 'axios';

import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [collectOptions, setCollectOptions] = useState([]);
  const [collectiblesList, setCollectiblesList] = useState([]);
  const [selectedCollectible, setSelectedCollectible] = useState("tags");


  const collectOptionsCall = async () => {
    const request = axios.get('data/collectibles.json');
    const response = await request;
    setCollectOptions(response.data.items);
  }

  const collectibleCall = async () => {
    const request = axios.get(`data/${selectedCollectible}.json`);
    const response = await request;
    setCollectiblesList(response.data.locations);
  }

  useEffect(() => {
    collectOptionsCall();    
  },[]);

  useEffect(() => {
    collectibleCall();
  },[selectedCollectible]); 

  return (
    <div className="App">
      <select className="map-options" value={selectedCollectible} onChange={e => {setSelectedCollectible(e.target.value)}}>
        {collectOptions && collectOptions.map((collect) => {
          return (<option 
                    value={collect.value}
                    key={collect.id}>{collect.name}
                  </option>);
          })}
        </select>

      <MapContainer center={[1500, 1500]} zoom={-2} minZoom={-3} maxZoom={2} crs={CRS.Simple}
                    maxBounds={[[-500, -500], [3650, 3650]]} maxBoundsViscosity={0.5}
                    doubleClickZoom={false}>

        <ImageOverlay url={gtasamap} bounds={[[0, 0], [3150, 3150]]}/>
        {collectiblesList && collectiblesList.map((collectible) => {
          return (
            <Marker position={[collectible.lat, collectible.lng]} key={collectible.id}></Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;