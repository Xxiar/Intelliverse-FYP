// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LostAndFoundPage from "./pages/LostAndFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LostAndFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
