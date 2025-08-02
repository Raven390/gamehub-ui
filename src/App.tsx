import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './auth/keycloak';

import Landing from './components/landing/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Projects from "./pages/Projects";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            onLoad: 'check-sso',
            checkLoginIframe: false, // Отключает iframe (рекомендую на dev)
        }}
        onEvent={(event, error) => console.log('Keycloak event:', event, error)}
        onTokens={tokens => console.log('Keycloak tokens:', tokens)}
    >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/" />} />

                {/* Приватные роуты */}
                <Route element={<PrivateRoute />}>
                    <Route path="/projects" element={<Projects />} />
                    {/* Добавляй сюда любые защищённые маршруты */}
                </Route>

            </Routes>
        </BrowserRouter>
    </ReactKeycloakProvider>
);

export default App;
