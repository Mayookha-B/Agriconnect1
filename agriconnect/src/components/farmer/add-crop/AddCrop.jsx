import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, 
  MDBIcon, MDBNavbar, MDBBtn, MDBInput, MDBValidation 
} from 'mdb-react-ui-kit';

function AddCrop() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lon: null, lat: null });
  const [formValue, setFormValue] = useState({
    cropName: '',
    price: '',
    quantity: '',
    category: 'Vegetables'
  });

  // GEOLOCATION CAPTURE: Runs when the component loads
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lon: position.coords.longitude,
            lat: position.coords.latitude
          });
          console.log("Farm location captured:", position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Location error:", error);
          alert("Please enable location services to list your crops.");
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coords.lat || !coords.lon) return alert("Waiting for location coordinates...");
    
    setLoading(true);
    const finalData = {
      ...formValue,
      location: {
        type: "Point",
        coordinates: [coords.lon, coords.lat] // GeoJSON standard [Long, Lat]
      }
    };

    console.log("Sending to Backend & Blockchain:", finalData);
    // Add your axios.post or smart contract call here
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
      <MDBNavbar dark style={{ backgroundColor: '#153b0fff' }}>
        <MDBContainer fluid>
          <MDBBtn color="link" className="text-white" onClick={() => navigate('/farmer-dashboard')}>
            <MDBIcon fas icon="arrow-left" /> Back
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>

      <MDBContainer className="py-5">
        <MDBCard className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
          <MDBCardBody className="p-4">
            <h4 className="fw-bold mb-4">Add Crop with Geo-Tagging</h4>
            
            <div className="p-2 mb-3 bg-light rounded small border border-dashed text-center">
              {coords.lat ? (
                <span className="text-success fw-bold">
                  <MDBIcon fas icon="check-circle" /> Farm Location Verified: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
                </span>
              ) : (
                <span className="text-muted">Detecting farm location...</span>
              )}
            </div>

            <MDBValidation onSubmit={handleSubmit} className="row g-3">
              <MDBCol md="6">
                <MDBInput label="Crop Name" required onChange={(e) => setFormValue({...formValue, cropName: e.target.value})} />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput label="Price (ETH)" type="number" step="0.001" required onChange={(e) => setFormValue({...formValue, price: e.target.value})} />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput label="Quantity (kg)" type="number" required onChange={(e) => setFormValue({...formValue, quantity: e.target.value})} />
              </MDBCol>
              <MDBCol md="12">
                <MDBBtn type="submit" disabled={loading || !coords.lat} className="w-100" style={{ backgroundColor: '#37c90bff' }}>
                  {loading ? 'Processing...' : 'Submit Listing'}
                </MDBBtn>
              </MDBCol>
            </MDBValidation>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default AddCrop;