# NowSpace

Projeto para hackathon: integração de APIs da NASA e outras fontes, backend em Flask, frontend em React (Vite).

## Objetivo

Construir uma aplicação web onde cada integrante pode criar sua própria página consumindo uma API diferente (ex: APOD, clima, Marte, etc).

---

## Estrutura do Projeto

```
NowSpace/
├── client/        # Frontend React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── pages/         # <--- Crie suas páginas aqui!
│   │   │   ├── Apod.jsx
│   │   │   ├── Clima.jsx
│   │   │   └── ...
│   │   ├── assets/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/        # Backend Flask
│   ├── main.py
│   ├── .env
│   └── ...
```

---

## Como rodar o projeto

### Backend (Flask)
1. Instale as dependências:
   ```
   pip install flask flask-cors python-dotenv requests
   ```
2. Crie um arquivo `.env` em `server/` com sua chave da NASA:
   ```
   NASA_API_KEY=sua_key_aqui
   ```
3. Execute o servidor:
   ```
   python main.py
   ```
   O backend estará disponível em `http://localhost:8080`.

### Frontend (React)
1. Instale as dependências:
   ```
   npm install
   ```
2. Execute o projeto:
   ```
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:5173`.

---

## Como adicionar uma nova API e página

### 1. Crie uma rota no backend (Flask)

No arquivo `server/main.py`, adicione uma nova rota para sua API.  
Exemplo para uma API de clima:

```python
@app.route('/api/clima')
def get_clima():
    # Exemplo usando uma API pública de clima
    url = 'https://api.weatherapi.com/v1/current.json?key=SUA_KEY&q=London'
    response = requests.get(url)
    return jsonify(response.json())
```

### 2. Crie uma página no frontend (React)

1. Crie um novo arquivo em `client/src/pages/Clima.jsx`:

```javascript
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Clima() {
  const [clima, setClima] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/clima')
      .then(res => setClima(res.data));
  }, []);

  if (!clima) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Clima em {clima.location.name}</h2>
      <p>Temperatura: {clima.current.temp_c}°C</p>
      <p>Condição: {clima.current.condition.text}</p>
    </div>
  );
}
```

2. Faça o mesmo para outras APIs, criando arquivos como `Apod.jsx`, `Marte.jsx`, etc.

### 3. Adicione as rotas no React Router

No arquivo `client/src/App.jsx`, configure o React Router para cada página:

```javascript
// ...existing code...
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Apod from './pages/Apod';
import Clima from './pages/Clima';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/apod">APOD</Link> | <Link to="/clima">Clima</Link>
      </nav>
      <Routes>
        <Route path="/apod" element={<Apod />} />
        <Route path="/clima" element={<Clima />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

> **Dica:** Cada um de nós pode criar sua página em `src/pages/`, adicionar a rota no `App.jsx` e criar a rota correspondente no Flask.

---

## Resumo do fluxo

1. Crie uma rota no Flask para sua API.
2. Crie um componente/página React para consumir essa rota.
3. Adicione a página no React Router.
4. Pronto! Sua página estará acessível em `http://localhost:5173/nome-da-sua-pagina`.

---

