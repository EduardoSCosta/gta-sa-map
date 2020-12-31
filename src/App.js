import { useEffect, useState } from 'react';
import Leaflet, { CRS } from 'leaflet';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import axios from 'axios';

import gtasamap from './assets/maps/gtasamap.jpg';
import oystersMarker from './assets/markers/marker-oysters.png';
import tagsMarker from './assets/markers/marker-tags.png';
import horseshoesMarker from './assets/markers/marker-horseshoes.png';
import snapshotsMarker from './assets/markers/marker-snapshots.png';
import shadowMarker from './assets/markers/marker-shadow.png';

import './App.css';

function App() {

  const [collectOptions, setCollectOptions] = useState([]);
  const [collectiblesList, setCollectiblesList] = useState([]);
  const [selectedCollectible, setSelectedCollectible] = useState("tags");
  const [optionMarker, setOptionMarker] = useState(tagsMarker);


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

  const idLength = (id) => {
    let collectId = id.toString();

    switch (collectId.length) {
      case 1:
        return ("00" + collectId);
      case 2:
        return ("0" + collectId);
      default:
        return (collectId);
    }
  }

  const mapIcon = Leaflet.icon({
    iconUrl: optionMarker,    
    iconSize: [29, 43],
    iconAnchor: [14, 43],
    shadowUrl: shadowMarker,
    shadowSize: [42, 33],
    shadowAnchor: [8, 32],
    popupAnchor: [0, -45]
  });
  

  useEffect(() => {
    collectOptionsCall();    
  },[]);

  useEffect(() => {
    collectibleCall();
    switch (selectedCollectible) {
      case "tags":
        return (setOptionMarker(tagsMarker));
      case "oysters":
        return (setOptionMarker(oystersMarker));
      case "horseshoes":
        return (setOptionMarker(horseshoesMarker));
      case "snapshots":
        return (setOptionMarker(snapshotsMarker));
      default:
        return (tagsMarker);
    }
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
                    maxBounds={[[-1000, -1000], [4150, 4150]]} maxBoundsViscosity={0.5}
                    doubleClickZoom={false}>

        <ImageOverlay url={gtasamap} bounds={[[0, 0], [3150, 3150]]}/>
        {collectiblesList && collectiblesList.map((collectible) => {
          return (
            <Marker position={[collectible.lat, collectible.lng]} 
                    key={collectible.id}
                    icon={mapIcon}>
              <Popup>
                <div className="img-container">
                  <p className="img-id">{collectible.id}</p>
                  <img className="ingame-pic" src={`https://www.gta-sanandreas.com/psysscreens/sideobjectives/${selectedCollectible}/${idLength(collectible.id)}.jpg`} alt="Collectible Ingame"/>
                </div>
              </Popup>
            </Marker>);
          })}
        </MapContainer>
    </div>
  );
}

export default App;