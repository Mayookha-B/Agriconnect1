import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing-page/landing";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Changed path to "/" so it loads immediately at localhost:5174 */}
        <Route path="/" element={<Landing />} />
        
      </Routes>
    </Router>
  );
};

export default App;