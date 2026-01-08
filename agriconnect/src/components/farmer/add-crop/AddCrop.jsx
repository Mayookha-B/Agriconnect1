import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBBtn, MDBInput, MDBTextArea 
} from 'mdb-react-ui-kit';

function AddCrop() {
  const navigate = useNavigate();
  const agriGreen = "#37c90b"; 
  const navBg = "#153b0f";     

  const [formValue, setFormValue] = useState({
    cropName: '',
    harvestDate: '',
    expiryDate: '',
    manualAddress: '',
    quantity: '',
    price: '',
    category: 'Grains'
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [isLocating, setIsLocating] = useState(false);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // --- NEW: IMAGE UPLOAD HANDLER ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Store file for backend/IPFS upload
      setPreview(URL.createObjectURL(file)); // Create preview URL
    }
  };

  // --- LOCATION LOGIC ---
  const getCurrentGPS = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lon: longitude });
        try {
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          setFormValue(prev => ({ ...prev, manualAddress: res.data.display_name }));
        } catch (err) {
          setFormValue(prev => ({ ...prev, manualAddress: `Lat: ${latitude}, Lon: ${longitude}` }));
        }
        setIsLocating(false);
      });
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f2f5", minHeight: '100vh' }}>
      <MDBNavbar dark style={{ backgroundColor: navBg }}>
        <MDBContainer fluid className="px-4">
           <div onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
             <MDBIcon fas icon="arrow-left" className="text-white me-3" />
             <span className="text-white fw-bold">agriconnect | Add Listing</span>
           </div>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBRow className="justify-content-center">
          <MDBCol md="10">
            <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-5">
                <h3 className="fw-bold mb-4">Add New Crop Listing</h3>
                
                <form>
                  <MDBRow className="g-4">
                    {/* Basic Details */}
                    <MDBCol md="6">
                      <MDBInput label="Crop Name" name='cropName' onChange={onChange} required />
                    </MDBCol>
                    <MDBCol md="6">
                      <select className="form-select" name="category" onChange={onChange}>
                        <option value="Grains">Grains</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                      </select>
                    </MDBCol>

                    {/* Freshness Details */}
                    <MDBCol md="6">
                      <label className="small fw-bold text-muted mb-1">Harvest Date</label>
                      <MDBInput type="date" name="harvestDate" onChange={onChange} required />
                    </MDBCol>
                    <MDBCol md="6">
                      <label className="small fw-bold text-muted mb-1">Expiry Date</label>
                      <MDBInput type="date" name="expiryDate" onChange={onChange} required min={formValue.harvestDate} />
                    </MDBCol>

                    {/* --- IMAGE UPLOAD PROVISION --- */}
                    <MDBCol md="12">
                      <label className="small fw-bold text-muted mb-2 d-block">Produce Image</label>
                      <div className="text-center p-4 rounded-3 bg-light" style={{ border: '2px dashed #ced4da', minHeight: '200px' }}>
                        <input type="file" id="cropImg" hidden onChange={handleImageChange} accept="image/*" />
                        <label htmlFor="cropImg" style={{ cursor: 'pointer', width: '100%' }}>
                          {preview ? (
                            <img src={preview} alt="Preview" style={{ maxHeight: '250px', borderRadius: '8px' }} />
                          ) : (
                            <div className="py-4">
                               <MDBIcon fas icon="cloud-upload-alt" size="3x" className="text-muted mb-2" />
                               <p className="text-muted small mb-0">Click to upload produce photo</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </MDBCol>

                    {/* Location */}
                    <MDBCol md="12">
                      <div className="d-flex justify-content-between mb-1">
                        <label className="small fw-bold text-muted">Crop Location</label>
                        <MDBBtn size="sm" color="success" outline onClick={getCurrentGPS}>
                          <MDBIcon fas icon="crosshairs" /> {isLocating ? "Locating..." : "Use Current GPS"}
                        </MDBBtn>
                      </div>
                      <MDBTextArea name='manualAddress' value={formValue.manualAddress} onChange={onChange} rows={3} />
                    </MDBCol>

                    {/* Submit Section */}
                    <MDBCol md="12" className="d-flex justify-content-end align-items-center mt-5 border-top pt-4">
                      <MDBBtn color='link' className='text-muted fw-bold me-4 shadow-0' onClick={() => navigate(-1)}>CANCEL</MDBBtn>
                      <MDBBtn className='px-5 fw-bold shadow-0' style={{ backgroundColor: agriGreen, borderRadius: '8px' }}>
                        SUBMIT LISTING
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default AddCrop;