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
import ShopPage from './components/consumer/shop-now/shopnow';
import AdminDashboard from './components/Admin/admin-dashboard/AdminDashboard';
import AddCrop from './components/farmer/add-crop/AddCrop';
import Inventory from './components/farmer/inventory/Inventory';
import Orders from './components/farmer/orders/Orders';
import Growth from './components/farmer/growth/Growth';
import ViewVideo from './components/farmer/university/ViewVideo';
import HelpPage from "./components/farmer/help/HelpPage";
import MyOrders from "./components/consumer/orders/MyOrders";

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Landing />} />
        <Route path="/farmerlogin" element={<Farmerlog />} />
        <Route path="/consumer-login" element={<Consumerlog />} />
        <Route path="/admin-login" element={<Adminlog />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/consumerregister" element={<ConsumerRegister />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        <Route path="/consumer-page" element={<ConsumerPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-crop" element={<AddCrop />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/growth" element={<Growth />} />
        <Route path="/view-video" element={<ViewVideo />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/my-orders" element={<MyOrders />} />
      
        
      </Routes>
    </Router>
  );
};

export default App;