import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login'
import {Cadastro} from './pages/Cadastro'
import {Home} from './pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to ="/" />}/>
        <Route path="/" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  );
}
export default App
