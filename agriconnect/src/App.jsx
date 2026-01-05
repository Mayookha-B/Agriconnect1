import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/landing-page/Landing";
import Farmerlog from "./components/farmer/farmer-login/farmerlogin";
import Consumerlog from "./components/consumer/consumer-login/consumerlogin";
import Adminlog from "./components/admin/admin-login/adminlogin";
import FarmerRegister from "./components/farmer/farmer-register/farmerregister";
import ConsumerRegister from "./components/consumer/consumer-register/consumerregister";  
import FarmerDashboard from "./components/farmer/farmer-dashboard/farmerdashboard";
import ConsumerPage from './components/consumer/consumer-page/ConsumerPage';
import AdminDashboard from './components/admin/admin-dashboard/AdminDashboard';
import AddCrop from './components/farmer/add-crop/AddCrop';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Changed path to "/" so it loads immediately at localhost:5174 */}
        <Route path="/" element={<Landing />} />
        <Route path="/farmerlogin" element={<Farmerlog />} />
        <Route path="/consumer-login" element={<Consumerlog />} />
        <Route path="/admin-login" element={<Adminlog />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/consumerregister" element={<ConsumerRegister />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/consumer-page" element={<ConsumerPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-crop" element={<AddCrop />} />
      </Routes>
    </Router>
  );
};

export default App;