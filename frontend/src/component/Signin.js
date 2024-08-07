// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router";
// import { useAuth } from '../contexts/AuthContext';

// export function Signin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate=useNavigate();
//   const { signIn } = useAuth();

//   const handle = async (e) => {
//     e.preventDefault();

//     const resp = await axios.post("http://localhost:5000/user/signin", {
//       username: email,
//       password,
//     });

//     localStorage.setItem('token',resp.data.token)
//     signIn(resp.data.token);
//     navigate('/user/home')

//     console.log(resp.data);
//   };

//   return (
//     <div>
//       <h2>Signin</h2>
//       <form onSubmit={handle}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Signin</button>
//       </form>
//     </div>
//   );
// }

// src/component/UserSignin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/signin', { username:email, password });
      const { token } = response.data;
      signIn(token); // Pass false for admin
      navigate('/user/home');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
