import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Map from './pages/Map'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  )
}

export default App