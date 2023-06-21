//General Imports
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

//Component Imports
import NewRequest from "../NewRequest/NewRequest";

//Context Imports
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import EmployeeContext from "../../context/EmployeeContext";
import { EmployeeInfoContext } from "../../context/EmployeeInfoContext";

// CSS Imports
import "./NavBar.css";

function Navbar (props){
  const { logoutUser, user } = useContext(AuthContext);
  const { logoutEmployee, employee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const {employeeInfo, setEmployeeInfo} = useContext(EmployeeInfoContext);
  
  const logoutAll = () => {
    logoutUser();
    logoutEmployee();
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return(
    <>
    <nav>
      <a href="index.html"><svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg></a>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          <li><a href="/">Home</a></li>
          <li><a href="/supervisor">Supervisor</a></li>
          <li><a href="/admin">Admin</a></li>
          <li>{user ? (
            <a className="logout" onClick={logoutAll}>Logout</a>
          ) : (
            <a onClick={() => navigate("/login")}>Login</a>
          )}</li>   
          <li><a><NewRequest employeeinfo={{employeeInfo}}/></a></li>        
        </ul>
      </div>
      <div id="mobile" onClick={handleClick}>
      <i id="bar"
      className={clicked ?
      "fas fa-times" : "fas fa-bars"}></i>
      </div>
    </nav>
    </>
  )
}

export default Navbar;

// const Navbar = () => {
//   const { logoutUser, user } = useContext(AuthContext);
//   const { logoutEmployee, employee } = useContext(EmployeeContext);
//   const navigate = useNavigate();

//   const logoutAll = () => {
//       logoutUser();
//       logoutEmployee();
//   };


//   return (
//     <nav>
//       <div className="navbar">
//         <a href="/">Home</a>  
//         <a href="/newtimeoffrequest">New Request</a>
//         <div className="dropdown">
//           <button className="dropbtn">Tools
//             <i className="fa fa-caret-down"></i>
//           </button>
//           <div className="dropdown-content">
//             <a href="/supervisor">Supervisor</a>
//             <a href="/admin">Admin</a>
//             <a href="#">Link 3</a>
//           </div>
//         </div>
//         <div>
//           {user ? (
//             <a className="logout" onClick={logoutAll}>Logout</a>
//           ) : (
//             <a onClick={() => navigate("/login")}>Login</a>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;