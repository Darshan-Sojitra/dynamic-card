import  { useState } from 'react';
import './Signup.css'; // Make sure the CSS file is in the same directory
import { Navbar } from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/login', formData);
            console.log('Response:', response.data);
            // Assuming the login is successful and you might get a status back
            if (response.status === 200) {
                navigate('/admin/cards');  // Redirect to the 'admin/cards' route
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data || error.message);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <>
        <Navbar></Navbar>
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                <input
                    type="text"
                    name="username"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
               
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
        </>
    );
}

export default Signup;
