
import React from 'react';

const AdminDashboard = () => {

    // Dummy handler functions
    const handleAddFaculty = () => alert('Navigate to Add Faculty page');
    const handleAddStudent = () => alert('Navigate to Add Student page');
    const handleAddSubject = () => alert('Navigate to Add Subject page');
    const handleViewAttendance = () => alert('Navigate to View Attendance page');
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {/* Add Faculty Card */}
                <div className="dashboard-card" onClick={handleAddFaculty}>
                    <h3>Add Faculty</h3>
                    <p>Create accounts for new faculty members.</p>
                </div>

                {/* Add Student Card */}
                <div className="dashboard-card" onClick={handleAddStudent}>
                    <h3>Add Student</h3>
                    <p>Enroll new students into the system.</p>
                </div>

                {/* Add Subject Card */}
                <div className="dashboard-card" onClick={handleAddSubject}>
                    <h3>Add Subjects</h3>
                    <p>Define new subjects and course codes.</p>
                </div>

                {/* View Attendance Card */}
                <div className="dashboard-card" onClick={handleViewAttendance}>
                    <h3>View Attendance</h3>
                    <p>Monitor attendance records across all classes.</p>
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

export default AdminDashboard;
