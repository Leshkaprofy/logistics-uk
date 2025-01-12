import React, { useEffect, useState } from 'react';
import driversData from '../data/drivers.json';
import '../styles/Vehicles.css';

const Vehicles = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (driversData?.data) {
        setDrivers(driversData.data);
    }
  }, []);

  return (
    <div className="vehicles">
      <h1>Vehicles List</h1>
        {drivers.length > 0 ? (
            drivers.filter(driver => driver.vehicleRegistration).map(driver => (
            <p key={driver.vehicleRegistration}>{driver.vehicleRegistration}</p>
            ))
        ) : (
            <p>No vehicles found</p>
        )}
    </div>
  );
};

export default Vehicles;
