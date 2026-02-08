import { useEffect, useState } from 'react'
import axios from 'axios'

function Apod() {
  const [apod, setApod] = useState({})

  useEffect(() => {
    axios.get('http://localhost:8080/api/nasa/apod')
      .then(res => setApod(res.data))
  }, [])

  return (
    <div>
      <h1>TESTE</h1>
      <h1>{apod.title}</h1>
      <img src={apod.url} alt={apod.title} />
      <p>{apod.explanation}</p>
    </div>
  )
}

export default Apod
