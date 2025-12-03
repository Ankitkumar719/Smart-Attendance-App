
import React from 'react';

const FacultyDashboard = () => {

    const handleMarkAttendance = () => window.location.href = '/faculty/mark-attendance';
    const handleViewAttendance = () => window.location.href = '/faculty/view-attendance';
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Faculty Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {/* Mark Attendance Card */}
                <div className="dashboard-card" onClick={handleMarkAttendance}>
                    <h3>Mark Attendance</h3>
                    <p>Start a new class session and generate a QR code.</p>
                </div>

                {/* View Attendance Card */}
                <div className="dashboard-card" onClick={handleViewAttendance}>
                    <h3>View Attendance</h3>
                    <p>Check historical attendance records for your classes.</p>
                </div>
            </div>

            <style>{`
                .dashboard-card {
                    background: #f9f9f9;
                    border-radius: 8px;
                    padding: 25px;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    border-left: 5px solid #667eea;
                }
                .dashboard-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
                }
                .dashboard-card h3 {
                    margin-top: 0;
                    margin-bottom: 10px;
                }
                .dashboard-card p {
                    color: #666;
                    font-size: 14px;
                }
            `}</style>
        </div>
    );
};

export default FacultyDashboard;
