
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react'; // Make sure to install: npm install qrcode.react

const MarkAttendance = () => {
    // State for filters and session management
    const [filters, setFilters] = useState({ branch: '', semester: '', section: '', subject: '' });
    const [studentCount, setStudentCount] = useState(null);
    const [session, setSession] = useState(null); // { sessionId, qrToken, expiresAt }
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(0);

    // Dummy data for dropdowns - replace with API calls
    const branches = ['CSE', 'ECE', 'MECH'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    const sections = ['A', 'B', 'C'];
    const subjects = [{ id: 1, name: 'Theory of Computation' }, { id: 2, name: 'Database Management' }]; // id should come from DB

    const getToken = useCallback(async (sessionId) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/api/faculty/sessions/${sessionId}/token`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSession(prev => ({ ...prev, qrToken: res.data.token, expiresAt: res.data.expiresAt }));
            setCountdown(30); // Reset countdown
        } catch (err) {
            setError('Failed to fetch new QR token. Please refresh.');
            console.error(err);
        }
    }, []);

    // Countdown timer effect
    useEffect(() => {
        if (!session) return;

        if (countdown <= 0) {
            getToken(session.sessionId); // Fetch new token when timer hits 0
            return;
        }

        const timerId = setInterval(() => setCountdown(c => c - 1), 1000);
        return () => clearInterval(timerId);
    }, [countdown, session, getToken]);


    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckStudents = async () => {
        const { branch, semester, section } = filters;
        if (!branch || !semester || !section) {
            return setError('Please select Branch, Semester, and Section.');
        }
        setError('');
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('/api/faculty/sessions/students', {
                params: { branch, semester, section },
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudentCount(res.data.count);
        } catch (err) {
            setError('Failed to fetch student count.');
            console.error(err);
        }
    };

    const handleGenerateQR = async () => {
        if (!filters.subject) {
            return setError('Please select a subject.');
        }
        setError('');
        try {
            const token = localStorage.getItem('token');
            // 1. Create the session
            const sessionRes = await axios.post('/api/faculty/sessions', {
                branch: filters.branch,
                semester: filters.semester,
                section: filters.section,
                subject_id: filters.subject,
                date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            }, { headers: { Authorization: `Bearer ${token}` } });
            
            const newSessionId = sessionRes.data.sessionId;
            setSession({ sessionId: newSessionId, qrToken: null, expiresAt: null });

            // 2. Fetch the first token
            await getToken(newSessionId);

        } catch (err) {
            setError('Failed to start session. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Mark Attendance</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!session ? (
                // ==== SETUP PHASE ====
                <div>
                    {/* Filters */}
                    <div className="filters">
                        <select name="branch" onChange={handleFilterChange}><option value="">Select Branch</option>{branches.map(b => <option key={b} value={b}>{b}</option>)}</select>
                        <select name="semester" onChange={handleFilterChange}><option value="">Select Semester</option>{semesters.map(s => <option key={s} value={s}>{s}</option>)}</select>
                        <select name="section" onChange={handleFilterChange}><option value="">Select Section</option>{sections.map(s => <option key={s} value={s}>{s}</option>)}</select>
                        <select name="subject" onChange={handleFilterChange}><option value="">Select Subject</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
                    </div>
                    
                    <button onClick={handleCheckStudents}>Check Number of Students</button>
                    {studentCount !== null && <p>Found {studentCount} students.</p>}

                    <button onClick={handleGenerateQR} disabled={studentCount === null}>Generate QR</button>
                </div>
            ) : (
                // ==== ACTIVE SESSION PHASE ====
                <div style={{ textAlign: 'center' }}>
                    <h2>Scan QR to Mark Attendance</h2>
                    {session.qrToken ? (
                        <QRCode value={session.qrToken} size={256} />
                    ) : (
                        <p>Generating QR code...</p>
                    )}
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
                        Refreshes in: {countdown}s
                    </p>
                    <button onClick={() => setSession(null)}>End Session</button>
                </div>
            )}
        </div>
    );
};

export default MarkAttendance;
