import { FC } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import { Login } from '../pages/Login'
import { Cadastro } from '../pages/Cadastro'
import { Home } from '../pages/Home'

export const Rotas: FC = () => {
	return (
		<Routes>
			<Route path="*" element={<Navigate to="/" />} />
			<Route path="/" element={<Login />} />
			<Route path="cadastro" element={<Cadastro />} />
			<Route element={<ProtectedRoutes />}>
				<Route path="home" element={<Home />} />
			</Route>
		</Routes>
	)
}
