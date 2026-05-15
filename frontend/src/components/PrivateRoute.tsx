import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // Verificação superficial: checa se a chave do crachá existe no armazenamento do navegador
  const token = localStorage.getItem('@FutList:token');

  // Se tiver token, renderiza as telas que estão dentro dele (Outlet). 
  // Se não tiver, expulsa sumariamente para o /login substituindo o histórico de navegação.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}