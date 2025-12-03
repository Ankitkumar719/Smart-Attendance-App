
import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const Login = () => {
    const [role, setRole] = useState('faculty');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('/api/auth/login', { username, password, role });
            const { token } = res.data;

            // Store token and role in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Redirect based on role
            window.location.href = `/${role}-dashboard`;

        } catch (err) {
            setError('Invalid credentials or server error. Please try again.');
            console.error('Login failed:', err.response ? err.response.data : err.message);
        }
    };

    const renderLabel = () => {
        switch(role) {
            case 'faculty': return 'FACULTY ID';
            case 'student': return 'STUDENT ID';
            case 'admin': return 'ADMIN ID';
            default: return 'USER ID';
        }
    }

    return (
        <div style={{ background: 'white', padding: '50px', borderRadius: '20px', maxWidth: '500px', margin: '20px auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1>🎓 Smart Attendance</h1>
                <p>Login to continue</p>
            </div>

            {/* Role Selection */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
                <button onClick={() => setRole('faculty')} className={role === 'faculty' ? 'active' : ''}>👨‍🏫 Faculty</button>
                <button onClick={() => setRole('student')} className={role === 'student' ? 'active' : ''}>👨‍🎓 Student</button>
                <button onClick={() => setRole('admin')} className={role === 'admin' ? 'active' : ''}>🔐 Admin</button>
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            {/* Login Form */}
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                    <label>{renderLabel()}</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={`Enter your ${role} ID`}
                        required
                    />
                </div>
                <div style={{ marginBottom: '25px' }}>
                    <label>PASSWORD</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit">{`Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}</button>
            </form>
        </div>
    );
};

export default Login;
