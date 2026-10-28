import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom' // Assuming react-router-dom is used for navigation
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER = [
  -74.00283970140276,
  40.71156264212178
]
const INITIAL_ZOOM = 16
const INITIAL_PITCH = 65

const RIDE_OPTIONS = [
  { id: 'share', name: 'Go Share', price: 'K86', img: 'silver-car.png' },
  { id: 'private', name: 'Go Private', price: 'K65', img: 'yellow-car.png' },
  { id: 'luxury', name: 'Go Luxury', price: 'K150', img: 'black-car.png' },
]

function Map() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const navigate = useNavigate()

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [pitch, setPitch] = useState(INITIAL_PITCH)
  
  const [selectedRide, setSelectedRide] = useState('share')
  const [pickup, setPickup] = useState('Current Location')
  const [destination, setDestination] = useState('Times Square, NY')

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZ29kc3BlZWQtIiwiYSI6ImNtaXN1emhtZzBudGw1aXM5dTNsZzRkaHUifQ.qO0d8krzFYtwa2zG305nvA',
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      pitch: pitch,
      style: 'mapbox://styles/mapbox/navigation-night-v1' // Sleek dark theme base
    });

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
            'fill-extrusion-color': '#22252a',
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

  return (
    <div className="relative w-screen h-screen overflow-hidden font-sans text-white bg-slate-950">
      {/* Map Container */}
      <div className="w-full h-full" id='map-container' ref={mapContainerRef} />

      {/* Top Header Overlay: Back Button & Location Inputs */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex flex-col gap-3 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent pb-8">
        <div className="flex items-center gap-3">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-amber-400 hover:bg-slate-800 transition-colors shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>

          {/* Pickup & Destination Inputs Box */}
          <div className="flex-1 bg-slate-900/90 backdrop-blur-md rounded-2xl p-3 border border-slate-700/60 shadow-xl flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_#f59e0b]" />
              <input 
                type="text" 
                value={pickup} 
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Pickup location"
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="h-[1px] bg-slate-800 ml-5" />

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shrink-0 shadow-[0_0_8px_#22d3ee]" />
              <input 
                type="text" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where to?"
                className="w-full bg-transparent text-sm font-medium text-white focus:outline-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Overlay: Car Cards & Action Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-8 flex flex-col gap-4">
        {/* Horizontal Car Cards Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {RIDE_OPTIONS.map((ride) => {
            const isSelected = selectedRide === ride.id;
            return (
              <div
                key={ride.id}
                onClick={() => setSelectedRide(ride.id)}
                className={`snap-center shrink-0 w-36 p-3 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between items-center relative overflow-hidden border ${
                  isSelected 
                    ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105' 
                    : 'bg-slate-900/90 border-slate-800 text-white hover:border-slate-700'
                }`}
              >
                <img 
                  src={ride.img} 
                  alt={ride.name} 
                  className="h-20 object-contain drop-shadow-md my-1"
                />
                <div className="text-center w-full">
                  <h3 className={`font-bold text-sm ${isSelected ? 'text-slate-950' : 'text-white'}`}>
                    {ride.name}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
                    Est. {ride.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ride Now Button */}
        <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider rounded-2xl transition-all shadow-[0_4px_20px_rgba(245,158,11,0.4)] active:scale-[0.99]">
          Ride Now
        </button>
      </div>
    </div>
  )
}

export default Map