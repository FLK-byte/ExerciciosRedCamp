import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login'
import { Cadastro } from './pages/Cadastro'
import { Home } from './pages/Home'
import ProtectedRoutes from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App
