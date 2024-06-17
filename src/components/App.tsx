import { Routes, Route } from 'react-router-dom';
import Authorization from './Authorization';
import ClientList from './ClientList';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/clients" element={<ClientList />} />
      </Routes>
    </main>
  );
}

export default App;
