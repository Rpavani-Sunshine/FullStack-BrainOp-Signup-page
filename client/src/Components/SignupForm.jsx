// src/SignupForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        profilePicture: '',
        terms: false
    });

    const [error, setError] = useState('');

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
          const response = await fetch(API + '/auth/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });

          if (!response.ok) {
              const data = await response.json();
              throw new Error(data.msg || 'Signup failed');
          }

          navigate('/posts'); // Redirect to post list screen upon successful signup
      } catch (error) {
          setError(error.message);
      }
    };

    return (
        <div className='p-5 md:pt-32'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className='w-2/4 p-9 m-auto shadow-sm border-2 border-zinc-400 text-center'>
              <h1 className='mb-7 text-2xl font-bold'>Signup</h1>
              <div className='mb-7'>
              <input className='shadow-sm border-2 rounded text-lg h-7 p-4 w-96' type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
              </div>
              <div className='mb-7'>
              <input className='shadow-sm border-2 rounded text-lg h-7 p-4 w-96' type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
              </div>
              <div className='mb-7'>
              <input className='shadow-sm border-2 rounded text-lg h-7 p-4 w-96' type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
              </div>
              <div className='mb-7'>
              <input className='shadow-sm border-2 rounded text-lg h-7 p-4 w-96' type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
              </div>
              <div className='mb-7'>
              <input className='shadow-sm border-2 rounded text-lg w-96' type="file" name="profilePicture" value={formData.profilePicture} onChange={handleChange} placeholder="Profile Picture" />
              </div>
              <div className='mb-7'>
              <label>
                    <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} /> I accept the terms and conditions
                </label>
              </div>
                <button className='shadow-sm border-2 rounded h-9 w-96 bg-zinc-400' type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
