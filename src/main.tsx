import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './components/MainPage';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainPage isAuthenticated={false} />
  </React.StrictMode>
);
