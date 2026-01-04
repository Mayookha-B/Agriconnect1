import React, { useState } from 'react';
import { MDBCol, MDBRow, MDBBtn, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import regimg from './loginimg.jpg'; // Reusing your image or use a different one

function FarmerRegister() {
  const myCustomColor = "#48aa0b";

  return (
    <div className="d-flex flex-column min-vh-100 vw-100 m-0 p-0" style={{ overflowX: 'hidden' }}>
      
      <div className="flex-grow-1 d-flex">
        <MDBRow className="w-100 g-0 m-0">
          
          {/* Left Column: Image (Hidden on small screens) */}
          <MDBCol md='5' className="d-none d-md-block p-0">
            <img 
              src={regimg}
              alt="Register illustration" 
              style={{ 
                width: '50', 
                height: '100%', 
                objectFit: 'cover', 
                position: 'fixed' // Keeps image steady while scrolling long form
              }}
            />
          </MDBCol>

          {/* Right Column: Registration Form */}
          <MDBCol md='7' className="d-flex flex-column justify-content-center align-items-center bg-white py-5" >
            <div style={{ width: '90%', maxWidth: '600px', padding: '20px' }}>
              
              <h2 className="fw-bold mb-4" style={{ color: myCustomColor }}>Farmer Registration</h2>
              <p className="text-muted mb-4">Create your account to join the DeFi marketplace.</p>

              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Full Name' id='name' type='text' size="lg"/>
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg"/>
                </MDBCol>
              </MDBRow>

              {/* DeFi Specific Field */}
              <MDBInput 
                wrapperClass='mb-4' 
                label='MetaMask Public ID (0x...)' 
                id='metamaskId' 
                type='text' 
                size="lg"
                placeholder="Connect your wallet"
              />

              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Phone Number' id='phone' type='tel' size="lg"/>
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Date of Birth' id='dob' type='date' size="lg"/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Address' id='address' type='text' size="lg"/>

              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='License Number' id='license' type='text' size="lg"/>
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Organization Name' id='orgName' type='text' size="lg"/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Password' id='pass' type='password' size="lg"/>

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="w-100 mb-3" size='lg' style={{ backgroundColor: myCustomColor, border: 'none' }}>
                  REGISTER
                </MDBBtn>
                <p className="small fw-bold mt-2">
                  Already have an account? <a href="/farmerlogin" className="link-danger">Login</a>
                </p>
              </div>

            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
}

export default FarmerRegister;