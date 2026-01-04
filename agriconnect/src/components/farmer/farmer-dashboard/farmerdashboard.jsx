import React from 'react';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBCardTitle, MDBCardText, MDBBtn, MDBIcon, MDBTable, MDBTableHead, MDBTableBody 
} from 'mdb-react-ui-kit';

import WeatherCard from './WeatherCard';

function FarmerDashboard() {
  const myCustomColor = "#48aa0b";

  return (
    <MDBContainer fluid className="p-4 bg-light" style={{ minHeight: '100vh' }}>
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold" style={{ color: myCustomColor }}>Farmer Dashboard</h2>
          <p className="text-muted">Welcome back! Here is what's happening with your farm today.</p>
        </div>
        <MDBBtn style={{ backgroundColor: myCustomColor, border: 'none' }}>
          <MDBIcon fas icon="plus" className="me-2" /> Add New Crop
        </MDBBtn>
      </div>

      

      {/* SECTION 1: View Statistics */}
      <MDBRow className="mb-4">
        <MDBCol md="4">
          <MDBCard className="text-center h-100 shadow-sm">
            <MDBCardBody>
              <MDBIcon fas icon="wallet" size="2x" className="mb-3" style={{ color: myCustomColor }} />
              <MDBCardTitle>Total Earnings</MDBCardTitle>
              <h3 className="fw-bold">2.45 ETH</h3>
              <MDBCardText className="text-success small">+12% from last month</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="text-center h-100 shadow-sm">
            <MDBCardBody>
              <MDBIcon fas icon="box" size="2x" className="mb-3" style={{ color: myCustomColor }} />
              <MDBCardTitle>Active Inventory</MDBCardTitle>
              <h3 className="fw-bold">14 Items</h3>
              <MDBCardText className="text-muted small">Across 3 categories</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4">
          <MDBCard className="text-center h-100 shadow-sm">
            <MDBCardBody>
              <MDBIcon fas icon="shuttle-van" size="2x" className="mb-3" style={{ color: myCustomColor }} />
              <MDBCardTitle>Pending Orders</MDBCardTitle>
              <h3 className="fw-bold">5</h3>
              <MDBCardText className="text-danger small">2 Require attention</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        {/* SECTION 2: Inventory Management */}
        <MDBCol md="8">
          <MDBCard className="shadow-sm mb-4">
            <MDBCardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <MDBCardTitle className="fw-bold">Inventory Management</MDBCardTitle>
                <a href="#!" style={{ color: myCustomColor }}>View All</a>
              </div>
              <MDBTable hover responsive>
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
                    <td><span className="badge badge-success">In Stock</span></td>
                  </tr>
                  <tr>
                    <td>Golden Wheat</td>
                    <td>Grains</td>
                    <td>200 kg</td>
                    <td>0.005 ETH</td>
                    <td><span className="badge badge-warning">Low Stock</span></td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        {/* SECTION 3: Payment History (DeFi focused) */}
        <MDBCol md="4">
          <MDBCard className="shadow-sm">
            <MDBCardBody>
              <MDBCardTitle className="fw-bold mb-3">Recent Payments</MDBCardTitle>
              <div className="mb-3 p-2 border-bottom">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Order #7721</span>
                  <span className="text-success">+0.40 ETH</span>
                </div>
                <small className="text-muted">TX: 0x4f2a...88e1</small>
              </div>
              <div className="mb-3 p-2 border-bottom">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Order #7718</span>
                  <span className="text-success">+0.15 ETH</span>
                </div>
                <small className="text-muted">TX: 0x9b1c...22a4</small>
              </div>
              <MDBBtn outline color="success" size="sm" className="w-100">View All Transactions</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        {/* SECTION 1: View Statistics */}


  

  <MDBCol md="3">
     <WeatherCard customColor={myCustomColor} /> {/* Your New Weather Module */}
  </MDBCol>
      </MDBRow>
      

    </MDBContainer>
  );
}

export default FarmerDashboard;