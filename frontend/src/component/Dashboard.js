
import React, { useState } from 'react';
import axios from 'axios';

export function Dashboard(){
    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        moneyWant: ''
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
          const token = localStorage.getItem('token');
          const response = await axios.post('http://localhost:5000/user/create', formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('Project created:', response.data);
        } catch (error) {
          console.error('Error creating project:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Money Want</label>
            <input
              type="number"
              name="moneyWant"
              value={formData.moneyWant}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Create Project</button>
        </form>
      );
}