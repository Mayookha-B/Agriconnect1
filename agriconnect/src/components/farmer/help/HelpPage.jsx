import React, { useState } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBTextArea, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HelpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ farmerId: '', dispute: '' });
  const [status, setStatus] = useState(''); // State to hold the message

  const agrilight = "#37c90bff";
  const agriDark = "#153b0fff";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...'); // Optional: show loading state
    
    try {
      const response = await axios.post('http://localhost:5000/api/disputes', formData);
      
      if (response.data.success) {
        setStatus('Dispute submitted successfully!'); // This triggers the green text
        setFormData({ farmerId: '', dispute: '' }); // Clear the form
      }
    } catch (err) {
      console.error(err);
      setStatus('Error submitting dispute. Please try again.'); // This triggers red text
    }
  };

  return (
    <div style={{ backgroundColor: '#f6f6f6', minHeight: '100vh', padding: '40px 0' }}>
      <MDBContainer>
        <MDBBtn color='none' className='text-dark mb-4 shadow-0' onClick={() => navigate(-1)}>
          <MDBIcon fas icon="arrow-left" /> Back to Dashboard
        </MDBBtn>

        <MDBCard className="shadow-sm mx-auto" style={{ maxWidth: '600px', borderRadius: '15px', borderTop: `5px solid ${agrilight}` }}>
          <MDBCardBody className="p-4">
            <div className="text-center mb-4">
              <MDBIcon fas icon="hands-helping" size="3x" style={{ color: agrilight }} />
              <h3 className="fw-bold mt-2" style={{ color: agriDark }}>Help & Dispute Center</h3>
              <p className="text-muted small">Please provide your details and explain the issue.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label small fw-bold">Farmer ID / Username</label>
                <MDBInput 
                  placeholder="e.g. FARMER-123" 
                  type="text" 
                  value={formData.farmerId}
                  onChange={(e) => setFormData({...formData, farmerId: e.target.value})}
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Describe your Dispute</label>
                <MDBTextArea 
                  rows={5} 
                  placeholder="Describe the issue with your order, payment, or account..."
                  value={formData.dispute}
                  onChange={(e) => setFormData({...formData, dispute: e.target.value})}
                  required 
                />
              </div>

              <MDBBtn block style={{ backgroundColor: agrilight, fontWeight: 'bold' }} type="submit">
                Submit Dispute
              </MDBBtn>

              {/* SUCCESS/ERROR MESSAGE DISPLAY */}
              {status && (
                <div 
                  className={`text-center mt-3 p-2 rounded small ${
                    status.includes('Error') ? 'text-danger bg-danger-light' : 'text-success bg-success-light'
                  }`}
                  style={{ backgroundColor: status.includes('Error') ? '#f8d7da' : '#d4edda' }}
                >
                  {status}
                </div>
              )}
            </form>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default HelpPage;