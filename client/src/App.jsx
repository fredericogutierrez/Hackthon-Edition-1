import { Routes, Route } from 'react-router-dom'
import Apod from './pages/Apod'

function App() {
  return (
    <Routes>
      <Route path="/apod" element={<Apod />} />
    </Routes>
  )
}

export default App
