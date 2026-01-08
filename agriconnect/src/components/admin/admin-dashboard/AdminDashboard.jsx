import React, { useState } from 'react';
import { Search, Menu, CheckCircle, Clock, Edit2, Check, X } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, text: "Delayed shipment of organic fertilizers", userId: "C-9021", type: "Consumer", remarks: "Processing at hub", status: "Pending" },
    { id: 2, text: "Soil sensor connectivity issues in Sector B", userId: "F-4412", type: "Farmer", remarks: "Technical team assigned", status: "Resolved" },
    { id: 3, text: "Inquiry regarding bulk harvest logistics", userId: "F-1029", type: "Farmer", remarks: "", status: "Pending" },
    { id: 4, text: "Damaged packaging upon delivery", userId: "C-3381", type: "Consumer", remarks: "Refund initiated", status: "Resolved" },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [tempRemarks, setTempRemarks] = useState("");

  const startEditing = (id, currentRemarks) => {
    setEditingId(id);
    setTempRemarks(currentRemarks);
  };

  const saveRemarks = (id) => {
    setComplaints(prev =>
      prev.map(item => (item.id === id ? { ...item, remarks: tempRemarks } : item))
    );
    setEditingId(null);
  };

  const updateStatus = (id, newStatus) => {
    setComplaints(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  return (
    <div className="agri-admin-wrapper">
      {/* Topbar matching your image */}
      <header className="agri-topbar">
        <div className="topbar-left">
          <Menu className="menu-icon" />
          <div className="logo-section">
            <span className="logo-text">agri<span className="logo-accent">connect</span></span>
          </div>
        </div>
        
        <div className="search-container">
          <input type="text" placeholder="Search marketplace..." className="nav-search" />
          <button className="search-btn">
            <Search size={18} color="white" />
          </button>
        </div>

        <div className="topbar-right">
          <span className="nav-link">Notifications</span>
          <span className="nav-link">Help</span>
        </div>
      </header>

      <main className="dashboard-content">
        <h2 className="page-heading">Complaints</h2>

        <div className="table-container">
          <table className="agri-table">
            <thead>
              <tr>
                <th>SL NO.</th>
                <th>COMPLAINTS</th>
                <th>CONSUMER/FARMER ID</th>
                <th>REMARKS</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item, index) => (
                <tr key={item.id}>
                  <td className="sl-no">{index + 1}</td>
                  <td className="complaint-text">{item.text}</td>
                  <td>
                    <div className="user-info">
                      <span className="user-id">{item.userId}</span>
                      <span className="user-label">{item.type}</span>
                    </div>
                  </td>
                  <td className="remarks-cell">
                    {editingId === item.id ? (
                      <div className="edit-mode">
                        <input 
                          type="text" 
                          value={tempRemarks} 
                          onChange={(e) => setTempRemarks(e.target.value)}
                          className="remarks-input"
                        />
                        <button onClick={() => saveRemarks(item.id)} className="action-icon save"><Check size={16}/></button>
                        <button onClick={() => setEditingId(null)} className="action-icon cancel"><X size={16}/></button>
                      </div>
                    ) : (
                      <div className="view-mode">
                        <span className={item.remarks ? "remarks-val" : "remarks-none"}>
                          {item.remarks || "None"}
                        </span>
                        <Edit2 size={14} className="edit-trigger" onClick={() => startEditing(item.id, item.remarks)} />
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={`status-wrapper ${item.status.toLowerCase()}`}>
                      {item.status === 'Resolved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      <select 
                        value={item.status} 
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="status-dropdown"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                      </select>
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