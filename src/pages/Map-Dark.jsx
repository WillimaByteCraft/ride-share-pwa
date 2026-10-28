import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER = [
  -74.00283970140276,
  40.71156264212178
]
const INITIAL_ZOOM = 16
const INITIAL_PITCH = 65

function Map() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [pitch, setPitch] = useState(INITIAL_PITCH)

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZ29kc3BlZWQtIiwiYSI6ImNtaXN1emhtZzBudGw1aXM5dTNsZzRkaHUifQ.qO0d8krzFYtwa2zG305nvA',
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      pitch: pitch,
      style: 'mapbox://styles/mapbox/navigation-night-v1' // Sleek dark theme base
    });
    // mapbox://styles/mapbox/navigation-night-v1

    // Once the map style loads, add the 3D building layer
    mapRef.current.on('load', () => {
      const layers = mapRef.current.getStyle().layers;
      
      // Find the index of the first symbol layer to place buildings underneath text labels
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // Add the 3D building extrusion layer
      mapRef.current.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            // Dark charcoal/slate color to fit the dark-v11 aesthetic
            'fill-extrusion-color': '#22252a',
            
            // Smoothly animate building height as you zoom in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.85
          }
        },
        labelLayerId
      );
    });

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      const mapPitch = mapRef.current.getPitch()

      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
      setPitch(mapPitch)
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])

  console.log("center:" + center)
  console.log("zoom:" + zoom)

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full" id='map-container' ref={mapContainerRef} />
    </div>
  )
}

export default Map