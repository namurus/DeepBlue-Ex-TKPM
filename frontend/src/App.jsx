import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes/routes';
import DisplayStudentPage from './pages/DisplayStudentPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route path="/" element={<DisplayStudentPage />} />
      </Routes>
    </div>
  );
}

export default App;
