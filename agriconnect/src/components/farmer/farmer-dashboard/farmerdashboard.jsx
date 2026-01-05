


import React from 'react';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle,
  MDBIcon, MDBNavbar, MDBInputGroup, MDBBtn, MDBTable, MDBTableHead, MDBTableBody 
} from 'mdb-react-ui-kit';

// Charting Components
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import WeatherCard from './WeatherCard'; 

// Registering ChartJS
ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend
);

function FarmerDashboard() {
  // Theme Colors
  const agrilight = "#37c90bff";
  const agriDark = "#153b0fff"; 
  const agriyellow = "#9eaa13ff"; 
  const lightGreyBg = "#f6f6f6";

  // Configuration for Weekly Analytic Graph
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      fill: true,
      label: 'Sold Products',
      data: [12, 19, 15, 25, 22, 30, 28],
      borderColor: agrilight,
      backgroundColor: 'rgba(55, 201, 11, 0.1)',
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { font: { size: 10 } } }
    },
  };

  // Reusable Component: Weather-Style ActionCard
  const ActionCard = ({ title, children, footerAction, insightTitle, insightContent }) => (
    <MDBCard className="h-100 shadow-sm border-1" style={{ borderRadius: '15px', borderTop: `5px solid ${agrilight}` }}>
      <MDBCardBody className="p-3 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{title}</h6>
          <MDBIcon fas icon="ellipsis-h" className="text-muted small" />
        </div>

        <div className="flex-grow-1 mb-3">
          {children}
        </div>

        {insightTitle && (
          <div className="p-2 mb-2" style={{ border: '1px dashed #ccc', borderRadius: '10px', backgroundColor: '#fafafa' }}>
            <div className="d-flex align-items-center justify-content-center mb-1">
               <MDBIcon fas icon="leaf" size="xs" className="me-2" style={{ color: agrilight }} />
               <small className="fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{insightTitle}</small>
            </div>
            <div className="text-center small">{insightContent}</div>
          </div>
        )}

        <div className="text-end mt-auto pt-2">
          <a href="#!" className="text-decoration-none small fw-bold text-muted" style={{ fontSize: '0.75rem' }}>
            <MDBIcon fas icon="sync-alt" className="me-1" size="xs" /> {footerAction || 'Update Now'}
          </a>
        </div>
      </MDBCardBody>
    </MDBCard>
  );

  return (
    <div style={{ 
      backgroundColor: lightGreyBg, 
      minHeight: '100vh', 
      width: '100%', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      
      {/* --- 1. DARK TOP NAV BAR (FULL WIDTH) --- */}
      <MDBNavbar expand='lg' dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center">
            <MDBIcon fas icon="bars" className="text-white me-3" style={{ cursor: 'pointer' }} />
            <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
              <img src="/logo.png" alt="AgriConnect" height="45" className="me-2" style={{ objectFit: 'contain' }} />
              <span className="text-white fw-bold" style={{ fontSize: '1.2rem', letterSpacing: '-0.5px' }}>
                agri<span style={{ color: '#b9f319ff' }}>connect</span><span style={{ color: '#153b0fff' }}>....</span>
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center flex-grow-1 justify-content-center">
            <MDBInputGroup containerClass="w-50 mx-4" style={{ height: '35px' }}>
              <input className='form-control border-0' type='text' placeholder='Search marketplace...' style={{ fontSize: '0.9rem' }} />
              <MDBBtn style={{ backgroundColor: agriyellow, color: '#333', border: 'none' }} className="px-3 shadow-0">
                <MDBIcon fas icon="search" />
              </MDBBtn>
            </MDBInputGroup>
          </div>

          <div className="text-white d-flex align-items-center" style={{ fontSize: '0.8rem' }}>
            <span className="px-3" style={{ cursor: 'pointer' }}>Notifications</span>
            <span className="px-3" style={{ cursor: 'pointer' }}>Help</span>
            <span className="ps-3 fw-bold" style={{ cursor: 'pointer' }}>Settings</span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      {/* --- 2. SUB-MENU BAR --- */}
      <div className="bg-white border-bottom mb-4 px-4 py-2 d-flex gap-4 small fw-bold text-muted shadow-sm">
        {['Catalog', 'Inventory', 'Orders', 'Advertising', 'Growth'].map((item, i) => (
          <span key={i} style={{ cursor: 'pointer', color: i === 1 ? agrilight : 'inherit' }}>{item}</span>
        ))}
      </div>

      <MDBContainer fluid className="px-4">
        
        {/* --- 3. METRIC STRIP (Now spans full row) --- */}
        <MDBRow className="mb-4">
          <MDBCol md="12">
            <div className="d-flex bg-white border shadow-sm rounded-3 w-100 overflow-hidden">
              {[{label: "Sales", val: "₹ 8,351"}, {label: "Balance", val: "2.45 ETH"}, {label: "IPI", val: "740"}].map((m, i) => (
                <div key={i} className={`p-3 flex-grow-1 ${i < 2 ? 'border-end' : ''}`} style={{ borderTop: `4px solid ${agrilight}` }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.65rem' }}>Today's {m.label}</small>
                    <MDBIcon fas icon="chevron-down" size="xs" className="text-muted" />
                  </div>
                  <h4 className="mb-0 fw-bold" style={{ color: agrilight }}>{m.val}</h4>
                </div>
              ))}
            </div>
            <MDBBtn style={{ backgroundColor: agrilight, border: 'none' }}>
          <MDBIcon fas icon="plus" className="me-2" /> Add New Crop
        </MDBBtn>
          </MDBCol>
          
            
         
        </MDBRow>

        {/* --- 4. TOP GRID: Analytics & Weather --- */}
        <MDBRow className="g-4 mb-4">
          <MDBCol md="8" >
            <ActionCard title="Weekly Sold Analytics" footerAction="View Full Report" insightTitle="Market Trend" insightContent="Demand for Grains is up 15%"  >
              <div className="d-flex justify-content-between align-items-end mb-2" >
                 <h4 className="fw-bold mb-0">151 Units</h4>
                 <small className="text-success fw-bold">+12% from last week</small>
              </div>
              <div style={{ height: '180px' }}>
                 <Line data={chartData} options={chartOptions} />
              </div>
            </ActionCard>
          </MDBCol>
          <MDBCol md="4">
             <MDBCard className="h-100 shadow-sm border-0" style={{ borderRadius: '15px' }}>
                <WeatherCard customColor={agrilight} />
             </MDBCard>
          </MDBCol>
       
          <MDBCol md="3">
            <ActionCard title="Match Market Price" footerAction="Update Price" insightTitle="Price Alert" insightContent="Current Avg: 0.003 ETH">
              <div className="text-center py-2">
                <span className="text-muted small">Your Price:</span>
                <h3 className="fw-bold text-danger mt-1">0.005 ETH</h3>
              </div>
            </ActionCard>
          </MDBCol>
          <MDBCol md="3">
            <ActionCard title="Farmer University" footerAction="Resume Lesson">
              <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400" className="w-100 rounded mb-2 border" style={{height: '75px', objectFit: 'cover'}} alt="edu"/>
              <p className="small text-muted mb-0">Blockchain Logistics 101</p>
            </ActionCard>
          </MDBCol>
          <MDBCol md="3">
            <ActionCard title="A-to-z Claims" footerAction="Manage Claims" insightTitle="Critical" insightContent={<span className="text-danger">Action Required</span>}>
                <div className="text-center py-3 d-flex flex-column justify-content-center h-100">
                   <h1 className="fw-bold mb-0">1</h1>
                </div>
            </ActionCard>
          </MDBCol>
          <MDBCol md="3">
            <ActionCard title="List Globally" footerAction="Manage Listings">
                <div className="text-center py-2 h-100 d-flex flex-column justify-content-center align-items-center">
                    <MDBIcon fas icon="globe-asia" size="3x" className="mb-2" style={{ color: '#eee' }} />
                    <p className="small text-muted">Active in 4 Regions</p>
                </div>
            </ActionCard>
          </MDBCol>
        
          <MDBCol md="8">
            <ActionCard title="Inventory Management" footerAction="Add New Item">
              <MDBTable hover responsive small className="mt-2">
                <MDBTableHead light>
                  <tr>
                    <th>Crop Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price/Unit</th>
                    <th>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>Organic Tomatoes</td>
                    <td>Vegetables</td>
                    <td>50 kg</td>
                    <td>0.002 ETH</td>
                    <td><span className="badge" style={{backgroundColor: 'rgba(55,201,11,0.2)', color: agrilight}}>In Stock</span></td>
                  </tr>
                  <tr>
                    <td>Golden Wheat</td>
                    <td>Grains</td>
                    <td>200 kg</td>
                    <td>0.005 ETH</td>
                    <td><span className="badge" style={{backgroundColor: 'rgba(255,193,7,0.2)', color: '#ffc107'}}>Low Stock</span></td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </ActionCard>
          </MDBCol>

          <MDBCol md="4">
            <ActionCard title="Recent Payments" footerAction="View All DeFi TX">
              <div className="mb-3 p-2 border-bottom">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold small">Order #7721</span>
                  <span className="text-success small fw-bold">+0.40 ETH</span>
                </div>
                <small className="text-muted" style={{fontSize: '0.65rem'}}>TX: 0x4f2a...88e1</small>
              </div>
              <div className="mb-2 p-2">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold small">Order #7718</span>
                  <span className="text-success small fw-bold">+0.15 ETH</span>
                </div>
                <small className="text-muted" style={{fontSize: '0.65rem'}}>TX: 0x9b1c...22a4</small>
              </div>
            </ActionCard>
          </MDBCol>
        </MDBRow>

      </MDBContainer>
    </div>
  );
}

export default FarmerDashboard;