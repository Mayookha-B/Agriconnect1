import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBTable, MDBTableHead, MDBTableBody, MDBBtn 
} from 'mdb-react-ui-kit';

function Inventory() {
  const navigate = useNavigate();
  const agrilight = "#37c90bff";
  const agriDark = "#153b0fff"; 
  const lightGreyBg = "#f6f6f6";

  // Mock data matching your requested fields
  const inventoryData = [
    { id: "CROP-001", name: "Organic Tomatoes", category: "Vegetables", quantity: "50 kg", price: "0.002 ETH", unsold: "15 kg", sold: "35 kg" },
    { id: "CROP-002", name: "Golden Wheat", category: "Grains", quantity: "200 kg", price: "0.005 ETH", unsold: "150 kg", sold: "50 kg" },
    { id: "CROP-003", name: "Fresh Carrots", category: "Vegetables", quantity: "100 kg", price: "0.001 ETH", unsold: "90 kg", sold: "10 kg" }
  ];

  return (
    <div style={{ backgroundColor: lightGreyBg, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Top Nav */}
      <MDBNavbar dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center" onClick={() => navigate('/farmer-dashboard')} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="arrow-left" className="text-white me-3" />
            <span className="text-white fw-bold">agri<span style={{ color: '#b9f319ff' }}>connect</span> | Inventory</span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
          <MDBCardBody className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold mb-0" style={{ color: agriDark }}>Product Inventory</h4>
              <MDBBtn onClick={() => navigate('/add-crop')} style={{ backgroundColor: agrilight, border: 'none' }} className="shadow-0">
                <MDBIcon fas icon="plus" className="me-2" /> Add New Product
              </MDBBtn>
            </div>

            <MDBTable hover responsive align='middle' className="mb-0">
              <MDBTableHead style={{ backgroundColor: '#f8f9fa' }}>
                <tr className="small text-muted text-uppercase">
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Total Quantity</th>
                  <th>Price/Unit</th>
                  <th>Unsold Qty</th>
                  <th>Sold Qty</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {inventoryData.map((item, index) => (
                  <tr key={index}>
                    <td><span className="fw-bold">{item.id}</span></td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td><span className="text-danger">{item.unsold}</span></td>
                    <td><span className="text-success">{item.sold}</span></td>
                    <td>
                      <MDBBtn color="link" className="p-0 text-muted me-3 shadow-0"><MDBIcon fas icon="edit" /></MDBBtn>
                      <MDBBtn color="link" className="p-0 text-danger shadow-0"><MDBIcon fas icon="trash" /></MDBBtn>
                    </td>
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

export default Inventory;