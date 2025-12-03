
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [attendanceData, setAttendanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/'; // Redirect to login if no token
                    return;
                }

                const res = await axios.get('/api/student/attendance', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAttendanceData(res.data);
            } catch (err) {
                setError('Failed to fetch attendance data. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    if (loading) return <p>Loading attendance...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>Student Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            {attendanceData && (
                <div>
                    {/* Overall Percentage Card */}
                    <div style={{ 
                        background: '#f0f5ff', 
                        borderRadius: '8px', 
                        padding: '25px', 
                        marginBottom: '30px',
                        borderLeft: `5px solid ${attendanceData.overallPercentage >= 75 ? '#52c41a' : '#ff4d4f'}`
                    }}>
                        <h3 style={{ marginTop: 0 }}>Overall Attendance</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0' }}>
                            {attendanceData.overallPercentage}%
                        </p>
                        <p style={{ color: '#555' }}>
                            {attendanceData.overallPercentage < 75 ? 'Your attendance is below the required 75%.' : 'You are on track. Keep it up!'}
                        </p>
                    </div>

                    {/* Date-wise List */}
                    <h3>Attendance History</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Subject</th>
                                <th style={tableHeaderStyle}>Date</th>
                                <th style={tableHeaderStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.records.map((record, index) => (
                                <tr key={index}>
                                    <td style={tableCellStyle}>{record.subject}</td>
                                    <td style={tableCellStyle}>{new Date(record.date).toLocaleDateString()}</td>
                                    <td style={{ ...tableCellStyle, color: record.status === 'Present' ? 'green' : 'red' }}>
                                        {record.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

// Inline styles for the table
const tableHeaderStyle = { 
    background: '#fafafa', 
    padding: '12px', 
    borderBottom: '2px solid #f0f0f0',
    textAlign: 'left'
};

const tableCellStyle = { 
    padding: '12px', 
    borderBottom: '1px solid #f0f0f0' 
};

export default StudentDashboard;
