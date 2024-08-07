
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export function Nav() {
//   const { isAuthenticated, signOut } = useAuth();

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white font-bold text-xl">MyApp</div>
//         <div className="flex space-x-4">
//           {isAuthenticated ? (
//             <>
//               <Link to="/user/home" className="text-white hover:text-gray-400">Home</Link>
//               <Link to="/user/create" className="text-white hover:text-gray-400">ReqFund</Link>
//               <button onClick={signOut} className="text-white hover:text-gray-400">Signout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/user/signup" className="text-white hover:text-gray-400">Signup</Link>
//               <Link to="/user/signin" className="text-white hover:text-gray-400">Signin</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// src/component/Nav.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Nav() {
  const { isAuthenticated, isAdmin, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyApp</div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin/home" className="text-white hover:text-gray-400">Admin Dashboard</Link>
                  {/* <Link to="/admin/projects" className="text-white hover:text-gray-400">Manage Projects</Link> */}
                </>
              ) : (
                <>
                  <Link to="/user/home" className="text-white hover:text-gray-400">Home</Link>
                  <Link to="/user/create" className="text-white hover:text-gray-400">ReqFund</Link>
                </>
              )}
              <button onClick={signOut} className="text-white hover:text-gray-400">Signout</button>
            </>
          ) : (
            <>
              <Link to="/user/signup" className="text-white hover:text-gray-400">Signup</Link>
              <Link to="/user/signin" className="text-white hover:text-gray-400">Signin</Link>
              <Link to="/admin/signin" className="text-white hover:text-gray-400">Admin Signin</Link>
              <Link to="/admin/signup" className="text-white hover:text-gray-400">Admin Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

