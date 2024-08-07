// src/component/AdminProjects.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/admin/allproject', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        setMessage('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, [setMessage]);

  const handleStatusChange = async (projectId, status) => {

    console.log(projectId,status)
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/admin/projects/${projectId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Project status updated successfully');
     
      const response = await axios.get('http://localhost:5000/admin/allproject', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      setMessage('Failed to update project status');
    }
  };

  return (
    <div>
      <h1>Admin Projects</h1>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Money Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.projectName}</td>
              <td>{project.description}</td>
              <td>{project.moneyWant}</td>
              <td>{project.status ? 'Accepted' : 'Rejected'}</td>
              <td>
                <button onClick={() => handleStatusChange(project._id, 'accept')}>Accept</button>
                <button onClick={() => handleStatusChange(project._id, 'reject')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
