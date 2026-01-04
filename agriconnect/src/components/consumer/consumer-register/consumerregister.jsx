import React from 'react';
import { MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import consumerImg from './loginimg.jpg'; // You can swap this for a consumer-specific image

function ConsumerRegister() {
  const myCustomColor = "#48aa0b"; // Keeping the theme consistent

  return (
    <div className="vh-100 vw-100 m-0 p-0" style={{ overflowX: 'hidden' }}>
      <MDBRow className="w-100 g-0 m-0">
        
        {/* Left Column: Fixed Image */}
        <MDBCol md='6' className="d-none d-md-block p-0">
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '50%',
            height: '100vh',
            zIndex: 1
          }}>
            <img 
              src={consumerImg}
              alt="Consumer illustration" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover'
              }}
            />
          </div>
        </MDBCol>

        {/* Right Column: Consumer Form */}
        <MDBCol 
          md='6' 
          className="ms-auto bg-white d-flex flex-column align-items-center py-5" 
          style={{ minHeight: '100vh', position: 'relative', zIndex: 2 }}
        >
          <div style={{ width: '90%', maxWidth: '550px', padding: '20px' }}>
            
            <h2 className="fw-bold mb-4" style={{ color: myCustomColor }}>Consumer Registration</h2>
            <p className="text-muted mb-4">Join the ecosystem to buy fresh produce directly from farmers.</p>

            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Full Name' id='consumerName' type='text' size="lg"/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Email address' id='consumerEmail' type='email' size="lg"/>
              </MDBCol>
            </MDBRow>

            {/* Crucial for DeFi Transactions */}
            <MDBInput 
              wrapperClass='mb-4' 
              label='MetaMask Public ID (0x...)' 
              id='consumerMetamask' 
              type='text' 
              size="lg"
              placeholder="Your wallet address for payments"
            />

            <MDBRow>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Phone Number' id='consumerPhone' type='tel' size="lg"/>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput wrapperClass='mb-4' label='Date of Birth' id='consumerDob' type='date' size="lg"/>
              </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass='mb-4' label='Delivery Address' id='consumerAddress' type='text' size="lg"/>

            <MDBInput wrapperClass='mb-4' label='Set Password' id='consumerPass' type='password' size="lg"/>

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="w-100 mb-3" size='lg' style={{ backgroundColor: myCustomColor, border: 'none' }}>
                CREATE CONSUMER ACCOUNT
              </MDBBtn>
              <p className="small fw-bold mt-2">
                Already have an account? <a href="/consumer-login" className="link-danger">Login</a>
              </p>
            </div>

          </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
}

export default ConsumerRegister;