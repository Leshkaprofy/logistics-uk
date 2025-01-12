import React, { useEffect, useState } from 'react';
import '../styles/Drivers.css';
import '../styles/Search.css';
import driversData from '../data/drivers.json';
import Driver, { formatDriver } from './Driver';

const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (driversData && driversData.data) {
            const formattedDrivers = driversData.data.map(driver => formatDriver(driver));
            setDrivers(formattedDrivers);
        }
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredDrivers = drivers.filter(driver => 
        driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="drivers-container">
            <input
                type="text"
                placeholder="Search by name or registration"
                value={searchTerm}
                onChange={handleSearch}
                className="search-box"
            />
            <div className="drivers-list">
                {filteredDrivers.length > 0 ? (
                    filteredDrivers.map((driver) => (
                        <Driver key={driver.driverID} driver={driver} />
                    ))
                ) : (
                    <p>No driver data available</p>
                )}
            </div>
        </div>
    );
};

export default Drivers;
