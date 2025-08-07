import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/keycloak';

import Landing from './components/landing/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";
import ProjectExplorer from "./pages/ProjectExplorer/ProjectExplorer";
import ProjectFormPage from "./pages/ProjectForm/ProjectFormPage";

const App = () => (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />

                {/* Приватные роуты */}
                <Route element={<PrivateRoute />}>
                    <Route path="/projects" element={<ProjectExplorer />} />
                    <Route path="/projects/create" element={<ProjectFormPage />} />

                    {/* Добавляй сюда любые защищённые маршруты */}
                </Route>


            </Routes>
        </BrowserRouter>
);

export default App;
