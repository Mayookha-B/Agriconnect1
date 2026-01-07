import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBBtnGroup, MDBBtn 
} from 'mdb-react-ui-kit';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, Title, Tooltip, Filler, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

function Growth() {
  const navigate = useNavigate();
  const [view, setView] = useState('weekly');

  // Theme Colors
  const agrilight = "#37c90bff";
  const agriDark = "#153b0fff"; 
  const lightGreyBg = "#f6f6f6";

  // Mock Data for different views
  const dataConfig = {
    daily: {
      labels: ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'],
      data: [2, 5, 8, 12, 7, 4],
      label: 'Daily Sales (Units)'
    },
    weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [12, 19, 15, 25, 22, 30, 28],
      label: 'Weekly Sales (Units)'
    },
    monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [85, 120, 95, 150],
      label: 'Monthly Sales (Units)'
    }
  };

  const chartData = {
    labels: dataConfig[view].labels,
    datasets: [{
      fill: true,
      label: dataConfig[view].label,
      data: dataConfig[view].data,
      borderColor: agrilight,
      backgroundColor: 'rgba(55, 201, 11, 0.2)',
      tension: 0.4,
      pointRadius: 5,
      pointBackgroundColor: agriDark,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { font: { weight: 'bold' } } },
      tooltip: { backgroundColor: agriDark }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#eee' } },
      x: { grid: { display: false } }
    },
  };

  return (
    <div style={{ backgroundColor: lightGreyBg, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <MDBNavbar dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center" onClick={() => navigate('/farmer-dashboard')} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="arrow-left" className="text-white me-3" />
            <span className="text-white fw-bold">agri<span style={{ color: '#b9f319ff' }}>connect</span> | Growth Analytics</span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                  <div>
                    <h4 className="fw-bold mb-1" style={{ color: agriDark }}>Sales Growth</h4>
                    <p className="text-muted small">Monitor your marketplace performance over time</p>
                  </div>
                  
                  {/* View Toggles */}
                  <MDBBtnGroup shadow='0'>
                    <MDBBtn color='light' active={view === 'daily'} onClick={() => setView('daily')}>Daily</MDBBtn>
                    <MDBBtn color='light' active={view === 'weekly'} onClick={() => setView('weekly')}>Weekly</MDBBtn>
                    <MDBBtn color='light' active={view === 'monthly'} onClick={() => setView('monthly')}>Monthly</MDBBtn>
                  </MDBBtnGroup>
                </div>

                <div style={{ height: '400px', width: '100%' }}>
                  <Line data={chartData} options={chartOptions} />
                </div>

                <MDBRow className="mt-5 text-center g-3">
                  <MDBCol size="4">
                    <h5 className="fw-bold mb-0">{view === 'weekly' ? '151' : view === 'daily' ? '38' : '450'}</h5>
                    <small className="text-muted text-uppercase" style={{fontSize: '0.7rem'}}>Total Units Sold</small>
                  </MDBCol>
                  <MDBCol size="4">
                    <h5 className="fw-bold text-success mb-0">+12.5%</h5>
                    <small className="text-muted text-uppercase" style={{fontSize: '0.7rem'}}>Growth Rate</small>
                  </MDBCol>
                  <MDBCol size="4">
                    <h5 className="fw-bold mb-0">0.85 ETH</h5>
                    <small className="text-muted text-uppercase" style={{fontSize: '0.7rem'}}>Avg. Revenue</small>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Growth;