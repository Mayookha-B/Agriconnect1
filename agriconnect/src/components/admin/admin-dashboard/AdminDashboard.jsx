import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Menu, CheckCircle, Clock } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints] = useState([
    { id: 1, text: "Delayed shipment of organic fertilizers", userId: "C-9021", type: "Consumer", remarks: "Processing at hub", status: "Pending" },
    { id: 2, text: "Soil sensor connectivity issues in Sector B", userId: "F-4412", type: "Farmer", remarks: "Technical team assigned", status: "Resolved" },
    { id: 3, text: "Inquiry regarding bulk harvest logistics", userId: "F-1029", type: "Farmer", remarks: "Checking availability", status: "Pending" },
    { id: 4, text: "Damaged packaging upon delivery", userId: "C-3381", type: "Consumer", remarks: "Refund initiated", status: "Resolved" },
  ]);

  return (
    <div className="agri-admin-wrapper">
      {/* Topbar - Dark Green Theme */}
      <header className="agri-topbar">
        <div className="topbar-left">
          <Menu className="menu-icon" />
          <div className="logo-section">
            <span className="logo-text">agri<span className="logo-accent">connect</span></span>
          </div>
        </div>
        
        <div className="search-container">
          <input type="text" placeholder="Search Complaints..." className="nav-search" />
          <button className="search-btn">
            <Search size={18} />
          </button>
        </div>

        <div className="topbar-right">
          <div className="nav-link">Notifications</div>
          <div className="nav-link border-left">Help</div>
        </div>
      </header>

      
      <main className="dashboard-content">
        <h2 className="page-heading">Complaints</h2>

        <div className="table-card">
          <table className="agri-table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Complaints</th>
                <th>Consumer/Farmer ID</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td className="complaint-desc">{item.text}</td>
                  <td>
                    <span className="user-id">{item.userId}</span>
                    <span className="user-label">{item.type}</span>
                  </td>
                  <td className="remarks-text">{item.remarks}</td>
                  <td>
                    <div className={`status-container ${item.status.toLowerCase()}`}>
                      {item.status === 'Resolved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;