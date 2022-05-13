import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = localStorage.getItem('jwt')

    return token ? true : false
};

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;