import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  MDBCard, 
  MDBCardBody, 
  MDBCardTitle, 
  MDBIcon, 
  MDBTypography,
  MDBSpinner
} from 'mdb-react-ui-kit';

const WeatherCard = ({ customColor }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configuration
  const API_KEY = '6bb9e303bfa7bb04949c5c531b5fbe0b'; 
  const DEFAULT_CITY = 'Thiruvananthapuram'; 

  /**
   * Logic to fetch weather data based on coordinates or city name
   */
  const fetchWeather = useCallback(async (lat, lon, city) => {
    setLoading(true);
    setError(null);
    
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else {
      url += `&q=${city}`;
    }

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Weather service temporarily unavailable.");
      setLoading(false);
    }
  }, [API_KEY]);

  /**
   * On component mount, attempt to get browser location
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Fallback if user denies location access
          fetchWeather(null, null, DEFAULT_CITY);
        }
      );
    } else {
      fetchWeather(null, null, DEFAULT_CITY);
    }
  }, [fetchWeather]);

  /**
   * Helper: Map weather description to FontAwesome icons
   */
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('cloud')) return 'cloud';
    if (desc.includes('rain') || desc.includes('drizzle')) return 'cloud-showers-heavy';
    if (desc.includes('clear') || desc.includes('sun')) return 'sun';
    if (desc.includes('mist') || desc.includes('fog')) return 'smog';
    if (desc.includes('thunder')) return 'bolt';
    if (desc.includes('snow')) return 'snowflake';
    return 'cloud-sun'; // Default
  };

  /**
   * Helper: Agri-Insight for Soil Temperature Estimation
   */
  const estimateSoilTemp = (airTemp, description) => {
    const isSunny = description.toLowerCase().includes('clear') || description.toLowerCase().includes('sun');
    const solarFactor = isSunny ? 1.1 : 0.85; 
    const estimated = (airTemp * 0.9) * solarFactor;
    return Math.round(estimated);
  };

  // Loading State
  if (loading) {
    return (
      <MDBCard className="text-center h-100 shadow-sm d-flex align-items-center justify-content-center py-5">
        <MDBSpinner color='success'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
        <p className="mt-2 text-muted">Syncing farm weather...</p>
      </MDBCard>
    );
  }

  // Error State
  if (error || !weather) {
    return (
      <MDBCard className="text-center h-100 shadow-sm p-4 border-danger">
        <MDBIcon fas icon="exclamation-triangle" size="2x" className="text-danger mb-2" />
        <p className="small text-muted">{error || "Data unavailable"}</p>
        <button className="btn btn-sm btn-outline-success" onClick={() => window.location.reload()}>Retry</button>
      </MDBCard>
    );
  }

  const soilTemp = estimateSoilTemp(weather.main.temp, weather.weather[0].description);

  return (
    <MDBCard className="text-center h-100 shadow-sm" style={{ borderTop: `5px solid ${customColor}`, borderRadius: '15px' }}>
      <MDBCardBody>
        {/* Top Section: Icon and City */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <MDBIcon 
            fas 
            icon={getWeatherIcon(weather.weather[0].description)} 
            size="3x" 
            style={{ color: customColor }} 
          />
          <div className="text-end">
            <MDBCardTitle className="mb-0 fw-bold">{weather.name}</MDBCardTitle>
            <small className="text-muted"><MDBIcon fas icon="map-marker-alt" className="me-1"/>Current Location</small>
          </div>
        </div>

        {/* Temperature Display */}
        <h1 className="fw-bold mb-0" style={{ fontSize: '3rem' }}>{Math.round(weather.main.temp)}°C</h1>
        <MDBTypography tag='div' className='text-capitalize mb-3 fw-bold' style={{ color: customColor }}>
          {weather.weather[0].description}
        </MDBTypography>

        {/* Row 1: Standard Weather Details */}
        <div className="d-flex justify-content-around border-top pt-3 mt-2">
          <div className="text-center">
            <small className="text-muted d-block small">Humidity</small>
            <span className="fw-bold">{weather.main.humidity}%</span>
          </div>
          <div className="text-center border-start border-end px-3">
            <small className="text-muted d-block small">Wind</small>
            <span className="fw-bold">{weather.wind.speed} m/s</span>
          </div>
          <div className="text-center">
            <small className="text-muted d-block small">Pressure</small>
            <span className="fw-bold">{weather.main.pressure} hPa</span>
          </div>
        </div>

        {/* Row 2: Agricultural Insights */}
        <div className="mt-4 p-2 rounded-3" style={{ backgroundColor: '#f8f9fa', border: '1px dashed #ced4da' }}>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <MDBIcon fas icon="seedling" className="me-2 text-success" />
            <small className="fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>Agri-Insight</small>
          </div>
          <div className="d-flex justify-content-between align-items-center px-2">
            <span className="small text-muted">Est. Soil Temp:</span>
            <span className="fw-bold" style={{ color: '#d35400' }}>{soilTemp}°C</span>
          </div>
          <div className="mt-1">
            {soilTemp >= 22 && soilTemp <= 32 ? (
              <span className="badge badge-success" style={{fontSize: '0.7rem'}}>Ideal for Planting</span>
            ) : (
              <span className="badge badge-warning" style={{fontSize: '0.7rem'}}>Check Crop Compatibility</span>
            )}
          </div>
        </div>

        {/* Refresh Link */}
        <div className="text-end mt-3">
          <small 
            className="text-muted cursor-pointer" 
            style={{ cursor: 'pointer', fontSize: '0.75rem' }} 
            onClick={() => window.location.reload()}
          >
            <MDBIcon fas icon="sync-alt" className="me-1" /> Update Now
          </small>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
};

export default WeatherCard;