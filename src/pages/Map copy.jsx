import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER = [
  -74.00283970140276,
  40.71156264212178
]
const INITIAL_ZOOM = 18
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
      pitch: pitch // Set the initial map tilt/pitch here
    });

    mapRef.current.on('move', () => {
      // get current center, zoom, and pitch from the map
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      const mapPitch = mapRef.current.getPitch()

      // update state
      setCenter([ mapCenter.lng, mapCenter.lat ])
      setZoom(mapZoom)
      setPitch(mapPitch)
    })

    return () => {
      mapRef.current.remove()
    }
  }, [])

  // console.log("center:" + center)

  return (
    <>
      {/* <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)} | Pitch: {pitch.toFixed(1)}°
      </div> */}
      <div className="w-screen h-screen" id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default Map