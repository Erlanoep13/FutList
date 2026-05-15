import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Login } from './pages/Login';
import { Racha } from './pages/Racha';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/racha" element={<Racha />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;