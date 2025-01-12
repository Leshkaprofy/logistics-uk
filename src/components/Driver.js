import React from 'react';
import '../styles/Drivers.css';

const Driver = ({ driver }) => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="driver-info">
            <div className="driver-header">
                <h2>{driver.name}</h2>
                <p>Vehicle: {driver.vehicle}</p>
                <p>Total Minutes: {driver.totalMinutes}</p>
                {driver.activityTimes.map(activity => (
                    <p key={activity.type}>{activity.type}: {activity.summarizedDuration}</p>
                ))}
            </div>
            <div className="week-activity">
                {daysOfWeek.map((day, dayIndex) => (
                    <div key={dayIndex} className={`day-box ${driver.activities.includes(day) ? 'active' : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export const formatDriver = (driver) => {
    const totalMinutes = driver.traces.reduce((sum, trace) => {
        return sum + trace.activity.reduce((activitySum, activity) => activitySum + activity.duration, 0);
    }, 0);
    const activities = driver.traces.map(trace => new Date(trace.date).toLocaleDateString('en-US', { weekday: 'long' }));
    const activityTimes = aggregateActivityDurations(driver.traces);
    return {
        name: `${driver.forename} ${driver.surname}`,
        vehicle: driver.vehicleRegistration,
        totalMinutes,
        activities,
        activityTimes
    };
};

function aggregateActivityDurations(traces) {
    const aggregatedDurations = {};

    traces.forEach(trace => {
        trace.activity.forEach(({ type, duration }) => {
            if (!aggregatedDurations[type]) {
                aggregatedDurations[type] = 0;
            }
            aggregatedDurations[type] += duration;
        });
    });

    // Convert the object to an array of { type, summarizedDuration }
    return Object.entries(aggregatedDurations).map(([type, summarizedDuration]) => ({
        type,
        summarizedDuration,
    }));
}

export default Driver;
