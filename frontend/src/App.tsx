import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './features/Login'
import Movies from './features/Movies'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <section>
                <React.Fragment>
                < Login />
                </React.Fragment>
              </section>
            }
          />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
