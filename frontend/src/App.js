// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { Dashboard } from "./component/Dashboard";
import {Signin} from './component/Signin'
import { Signup } from "./component/Signup";
import { Dashboard } from './component/Dashboard';
import { Nav } from './component/Nav';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import RoleSelection from './component/RoleSelection';
import { Home } from './component/Home';
import { AdminSignin } from './component/AdminSignin';
import { AdminSignup } from './component/AdminSignup';
import { AdminDashboard } from './component/AdminDashboard';



function App() {
  return (
    <div className="App">
  
      <Router>
      <AuthProvider>
      <Nav/>
        <Routes>
        <Route path="/" element={<RoleSelection/>} />
          <Route path="/user/signin" element={<Signin/>} />
          <Route path="/user/signup" element={<Signup/>} />
          <Route path="/user/home" element={<Home/>} />
          <Route path="/user/create" element={<Dashboard/>} />

          <Route path="/admin/signin" element={<AdminSignin/>} />
          <Route path="/admin/signup" element={<AdminSignup/>} />
          <Route path="/admin/home" element={<AdminDashboard/>} />
        </Routes>
        </AuthProvider>
      </Router>
     
    </div>
  );
}

export default App;
