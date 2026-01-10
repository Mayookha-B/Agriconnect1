import React, { useState, useEffect } from 'react';
import { Search, Menu, CheckCircle, Clock, Edit2, Check, X } from 'lucide-react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]); // Start with empty array
  const [editingId, setEditingId] = useState(null);
  const [tempRemarks, setTempRemarks] = useState("");
  const [loading, setLoading] = useState(true);

  // --- FETCH COMPLAINTS FROM DATABASE ---
  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/disputes/all');
      setComplaints(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // --- SAVE REMARKS TO DATABASE ---
  const saveRemarks = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/disputes/update/${id}`, {
        remarks: tempRemarks
      });
      setComplaints(prev =>
        prev.map(item => (item._id === id ? { ...item, remarks: tempRemarks } : item))
      );
      setEditingId(null);
    } catch (err) {
      alert("Failed to update remarks");
    }
  };

  // --- UPDATE STATUS IN DATABASE ---
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/disputes/update/${id}`, {
        status: newStatus
      });
      setComplaints(prev =>
        prev.map(item => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const startEditing = (id, currentRemarks) => {
    setEditingId(id);
    setTempRemarks(currentRemarks);
  };

  return (
    <div className="agri-admin-wrapper">
      <header className="agri-topbar">
        <div className="topbar-left">
          <Menu className="menu-icon" />
          <div className="logo-section">
            <span className="logo-text">agri<span className="logo-accent">connect</span></span>
          </div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search complaints" className="nav-search" />
          <button className="search-btn"><Search size={18} color="white" /></button>
        </div>
      </header>

      <main className="dashboard-content">
        <h2 className="page-heading">Complaints Management</h2>

        {loading ? (
          <p>Loading complaints...</p>
        ) : (
          <div className="table-container">
            <table className="agri-table">
              <thead>
                <tr>
                  <th>COMPLAINT ID</th>
                  <th>COMPLAINTS</th>
                  <th>FARMER ID</th>
                  <th>REMARKS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((item) => (
                  <tr key={item._id}>
                    <td className="sl-no">{item.complaintId}</td>
                    <td className="complaint-text">{item.complaint}</td>
                    <td><span className="user-id">{item.farmerId}</span></td>
                    <td className="remarks-cell">
                      {editingId === item._id ? (
                        <div className="edit-mode">
                          <input 
                            type="text" 
                            value={tempRemarks} 
                            onChange={(e) => setTempRemarks(e.target.value)}
                            className="remarks-input"
                          />
                          <button onClick={() => saveRemarks(item._id)} className="action-icon save"><Check size={16}/></button>
                          <button onClick={() => setEditingId(null)} className="action-icon cancel"><X size={16}/></button>
                        </div>
                      ) : (
                        <div className="view-mode">
                          <span className={item.remarks !== "No remarks yet." ? "remarks-val" : "remarks-none"}>
                            {item.remarks}
                          </span>
                          <Edit2 size={14} className="edit-trigger" onClick={() => startEditing(item._id, item.remarks)} />
                        </div>
                      )}
                    </td>
                    <td>
                      <div className={`status-wrapper ${item.status.toLowerCase()}`}>
                        {item.status === 'Resolved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                        <select 
                          value={item.status} 
                          onChange={(e) => updateStatus(item._id, e.target.value)}
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
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;