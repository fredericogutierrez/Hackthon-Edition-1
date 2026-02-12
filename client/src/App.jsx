import { Routes, Route } from 'react-router-dom'
import Apod from './pages/Apod'
import Mars from "./pages/Mars";

function App() {
  return (
    <Routes>
      <Route path="/apod" element={<Apod />} />
      <Route path="/mars" element={<Mars />} />
    </Routes>
  )
}

export default App
