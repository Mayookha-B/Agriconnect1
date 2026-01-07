import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBTable, MDBTableHead, MDBTableBody, MDBBadge 
} from 'mdb-react-ui-kit';

function SoldOrders() {
  const navigate = useNavigate();
  const agriDark = "#153b0fff"; 
  const lightGreyBg = "#f6f6f6";

  const soldData = [
    { 
      sl_no: 1, 
      customerid: "CUST-9921", 
      productid: "CROP-001", 
      productname: "Organic Tomatoes", 
      category: "Vegetables", 
      quantity: "35 kg", 
      price: "0.07 ETH", 
      status: "Delivered" 
    },
    { 
      sl_no: 2, 
      customerid: "CUST-8842", 
      productid: "CROP-005", 
      productname: "Basmati Rice", 
      category: "Grains", 
      quantity: "100 kg", 
      price: "0.50 ETH", 
      status: "Delivered" 
    }
  ];

  return (
    <div style={{ backgroundColor: lightGreyBg, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <MDBNavbar dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center" onClick={() => navigate('/farmer-dashboard')} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="arrow-left" className="text-white me-3" />
            <span className="text-white fw-bold">agri<span style={{ color: '#b9f319ff' }}>connect</span> | Sold Products</span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
          <MDBCardBody className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="fw-bold mb-1" style={{ color: agriDark }}>Sold Products History</h4>
                <p className="text-muted small">List of all completed sales and delivered items</p>
              </div>
              <MDBIcon fas icon="file-download" size="lg" className="text-success" style={{cursor: 'pointer'}} />
            </div>

            <MDBTable hover responsive align='middle' className="mb-0">
              <MDBTableHead style={{ backgroundColor: '#f8f9fa' }}>
                <tr className="small text-muted text-uppercase">
                  <th>Sl.No</th>
                  <th>Customer ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Sold Qty</th>
                  <th>Revenue</th>
                  <th>Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {soldData.map((order) => (
                  <tr key={order.sl_no}>
                    <td>{order.sl_no}</td>
                    <td><span className="fw-bold text-muted small">{order.customerid}</span></td>
                    <td>{order.productid}</td>
                    <td className="fw-bold">{order.productname}</td>
                    <td>{order.category}</td>
                    <td>{order.quantity}</td>
                    <td className="fw-bold text-success">{order.price}</td>
                    <td><MDBBadge color='success' light pill>Completed</MDBBadge></td>
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

export default SoldOrders;