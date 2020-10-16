import React, { useRef, useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { RiCloseFill } from 'react-icons/ri';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapContainer } from './styles';
import CustomMarker from './CustomMarker';

const apiKey =
  'pk.eyJ1IjoibGVjb2VsaG8iLCJhIjoiY2tjMTBxZ2ZsMTBuZTJ5bG1lencyMWp0MyJ9.lAGIKN0HAdt0dGj0r4tG6w';

export default function Map({ dispatch, selectedTweet, tweets }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const markers = useRef(null);

  function closeMap() {
    dispatch({ type: 'close-map' });
  }

  const addMarkers = useCallback(() => {
    if (map && tweets) {
      tweets.forEach((tweet) => {
        const placeholder = document.createElement('div');
        const lat = tweet.place[1];
        const lon = tweet.place[0];
        const { tone } = tweet;
        ReactDOM.render(<CustomMarker tone={tone} />, placeholder);
        const marker = new mapboxgl.Marker({ element: placeholder })
          .setLngLat([lat, lon])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="popup-content">
                <p>${tweet.text}</p>
                <a href="https://twitter.com/${tweet.username}/status/${tweet.id}" target="_blank" rel="noreferrer noopener">View Tweet</a>
              </div>
            `),
          )
          .addTo(map);
        if (markers.current) {
          markers.current = [...markers.current, marker];
        } else {
          markers.current = [marker];
        }
      });
    }
  }, [tweets, map]);

  const removeMarkers = useCallback(() => {
    if (markers.current) {
      markers.current.forEach((marker) => marker.remove());
      markers.current = null;
    }
  }, []);

  useEffect(() => {
    addMarkers();

    return () => removeMarkers();
  }, [addMarkers, removeMarkers]);

  useEffect(() => {
    function initMap() {
      mapboxgl.accessToken = apiKey;

      const newMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/lecoelho/ckeloxffj0ckq19psdd2nm07w',
        center: [selectedTweet.place[1], selectedTweet.place[0]] || [-50, -13],
        zoom: 11,
      });

      newMap.addControl(new mapboxgl.NavigationControl());

      newMap.on('load', () => {
        setMap(newMap);
      });
    }

    if (!map) {
      initMap();
    }
  }, [map, selectedTweet.place]);

  return (
    <MapContainer>
      <div className="map" ref={mapContainerRef} />
      <button type="button" onClick={closeMap}>
        <RiCloseFill size={22} />
        Close Map
      </button>
    </MapContainer>
  );
}
