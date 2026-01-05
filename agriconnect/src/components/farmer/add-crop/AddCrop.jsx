import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBBtn, MDBInput, MDBValidation, MDBValidationItem 
} from 'mdb-react-ui-kit';

function AddCrop() {
  const navigate = useNavigate();
  
  // Theme Colors (Matching your Dashboard)
  const agrilight = "#37c90bff";
  const agriDark = "#153b0fff"; 
  const lightGreyBg = "#f6f6f6";

  const [formValue, setFormValue] = useState({
    cropName: '',
    place: '',
    harvestedDate: '',
    quantity: '',
    price: '',
    category: 'Vegetables'
  });

  const [preview, setPreview] = useState(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div style={{ backgroundColor: lightGreyBg, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* --- TOP NAV (Identical to Dashboard) --- */}
      <MDBNavbar expand='lg' dark style={{ backgroundColor: agriDark, padding: '0.5rem 1rem' }}>
        <MDBContainer fluid>
          <div className="d-flex align-items-center" onClick={() => navigate('/farmer-dashboard')} style={{cursor: 'pointer'}}>
            <MDBIcon fas icon="arrow-left" className="text-white me-3" />
            <img src="/logo.png" alt="AgriConnect" height="40" className="me-2" />
            <span className="text-white fw-bold">agri<span style={{ color: '#b9f319ff' }}>connect</span></span>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="8">
            <MDBCard className="shadow-sm" style={{ borderRadius: '15px', borderTop: `5px solid ${agrilight}` }}>
              <MDBCardBody className="p-4">
                <div className="mb-4">
                  <h4 className="fw-bold" style={{ color: agriDark }}>Add New Crop Listing</h4>
                  <p className="text-muted small">Enter produce details for the decentralized marketplace</p>
                </div>

                <MDBValidation className='row g-3'>
                  <MDBCol md="6">
                    <label className="small fw-bold text-muted mb-1">Crop Name</label>
                    <MDBInput name='cropName' value={formValue.cropName} onChange={onChange} required placeholder="e.g. Organic Tomatoes" />
                  </MDBCol>

                  <MDBCol md="6">
                    <label className="small fw-bold text-muted mb-1">Location (Place)</label>
                    <MDBInput name='place' value={formValue.place} onChange={onChange} required placeholder="e.g. Vazhuthacaud" />
                  </MDBCol>

                  <MDBCol md="3">
                    <label className="small fw-bold text-muted mb-1">Harvested Date</label>
                    <MDBInput type="date" name='harvestedDate' onChange={onChange} required />
                  </MDBCol>

                  <MDBCol md="3">
                    <label className="small fw-bold text-muted mb-1">Quantity (kg)</label>
                    <MDBInput type="number" name='quantity' onChange={onChange} required placeholder="0" />
                  </MDBCol>

                  <MDBCol md="3">
                    <label className="small fw-bold text-muted mb-1">Price (ETH/unit)</label>
                    <MDBInput type="number" step="0.001" name='price' onChange={onChange} required placeholder="0.00" />
                  </MDBCol>

                  <MDBCol md="3">
                    <label className="small fw-bold text-muted mb-1">Category</label>
                    <select className="form-select" name="category" onChange={onChange} style={{padding: '0.45rem'}}>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Grains">Grains</option>
                      <option value="Fruits">Fruits</option>
                    </select>
                  </MDBCol>

                  <MDBCol md="12" className="mt-4">
                    <label className="small fw-bold text-muted mb-2 d-block">Produce Image</label>
                    <div className="p-4 text-center border rounded-3" style={{ borderStyle: 'dashed !important', backgroundColor: '#fafafa' }}>
                      <input type="file" id="cropImg" hidden onChange={handleImageChange} accept="image/*" />
                      <label htmlFor="cropImg" style={{ cursor: 'pointer' }}>
                        {preview ? (
                          <img src={preview} alt="preview" style={{ maxHeight: '150px' }} className="rounded" />
                        ) : (
                          <>
                            <MDBIcon fas icon="cloud-upload-alt" size="2x" className="text-muted mb-2" />
                            <p className="mb-0 small text-muted">Click to upload crop photo</p>
                          </>
                        )}
                      </label>
                    </div>
                  </MDBCol>

                  <MDBCol md="12" className="text-end mt-5 pt-3 border-top">
                    <MDBBtn color='light' className="me-2 shadow-0" onClick={() => navigate(-1)}>Cancel</MDBBtn>
                    <MDBBtn style={{ backgroundColor: agrilight, border: 'none' }} className="px-5 shadow-0 fw-bold">
                       Submit Listing
                    </MDBBtn>
                  </MDBCol>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default AddCrop;