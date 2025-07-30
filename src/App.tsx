import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage isAuthenticated={false} />} />
    </Routes>
  </BrowserRouter>
);

export default App;
