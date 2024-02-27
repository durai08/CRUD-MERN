import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Crud from './Crud'; // Corrected import statement

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Crud />} /> {/* Use curly braces to render the component */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
