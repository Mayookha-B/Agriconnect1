import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBTable, MDBTableHead, MDBTableBody, MDBBadge 
} from 'mdb-react-ui-kit';

function Orders() {
  const navigate = useNavigate();
  const agriDark = "#153b0fff"; 
  const lightGreyBg = "#f6f6f6";

  // Mock data for the orders list
  const ordersData = [
    { 
      sl_no: 1, 
      customerid: "CUST-4021", 
      productid: "CROP-001", 
      productname: "Organic Tomatoes", 
      category: "Vegetables", 
      quantity: "20 kg", 
      price: "0.04 ETH", 
      status: "Delivered" 
    },
    { 
      sl_no: 2, 
      customerid: "CUST-4055", 
      productid: "CROP-002", 
      productname: "Golden Wheat", 
      category: "Grains", 
      quantity: "50 kg", 
      price: "0.25 ETH", 
      status: "Pending" 
    },
    { 
      sl_no: 3, 
      customerid: "CUST-3091", 
      productid: "CROP-001", 
      productname: "Organic Tomatoes", 
      category: "Vegetables", 
      quantity: "5 kg", 
      price: "0.01 ETH", 
      status: "In Transit" 
    }
  ];

  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return <MDBBadge color='success' light>Delivered</MDBBadge>;
      case 'Pending': return <MDBBadge color='warning' light>Pending</MDBBadge>;
      case 'In Transit': return <MDBBadge color='info' light>In Transit</MDBBadge>;
      default: return <MDBBadge color='secondary' light>{status}</MDBBadge>;
    }
  };

  return (
    <div style={{ backgroundColor: lightGreyBg, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Navigation */}
      <MDBNavbar dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center" onClick={() => navigate('/farmer-dashboard')} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="arrow-left" className="text-white me-3" />
            <span className="text-white fw-bold">agri<span style={{ color: '#b9f319ff' }}>connect</span> | Order History</span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
          <MDBCardBody className="p-4">
            <div className="mb-4">
              <h4 className="fw-bold mb-1" style={{ color: agriDark }}>Customer Orders</h4>
              <p className="text-muted small">Track and manage your marketplace sales</p>
            </div>

            <MDBTable hover responsive align='middle' className="mb-0">
              <MDBTableHead style={{ backgroundColor: '#f8f9fa' }}>
                <tr className="small text-muted text-uppercase">
                  <th>Sl.No</th>
                  <th>Customer ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {ordersData.map((order) => (
                  <tr key={order.sl_no}>
                    <td>{order.sl_no}</td>
                    <td><span className="fw-bold text-primary">{order.customerid}</span></td>
                    <td>{order.productid}</td>
                    <td className="fw-bold">{order.productname}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td><span className="fw-bold">{order.price}</span></td>
                    <td>{getStatusBadge(order.status)}</td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default Orders;