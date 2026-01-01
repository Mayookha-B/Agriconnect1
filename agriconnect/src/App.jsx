import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing-page/landing";
import Farmerlog from "./components/farmer/farmer-login/farmerlogin";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Changed path to "/" so it loads immediately at localhost:5174 */}
        <Route path="/" element={<Landing />} />
        <Route path="/farmerlogin" element={<Farmerlog />} />
      </Routes>
    </Router>
  );
};

export default App;