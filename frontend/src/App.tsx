import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Racha } from './pages/Racha';

export function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/racha" />} />
        <Route path="/racha" element={<Racha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;