import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../components/features/Auth/Login/index";
import Register from "../components/features/Auth/Register/index";
import Home from "../components/features/Home/index";
import Unauthorized from "../components/errors/Unauthorized";

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/home"
                    element={<Home />}
                />

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;