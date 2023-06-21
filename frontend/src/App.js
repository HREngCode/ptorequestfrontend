//3. Wrap App
//4. Import and use (destructure) any context you feel necessary
// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useContext, useEffect, useState } from 'react';
import useAuth from "./hooks/useAuth";
import axios from "axios";

// Pages Imports
import SupervisorPage from "./pages/SupervisorPage/SupervisorPage";
import NewTimeOffRequestPage from "./pages/NewTimeOffRequestPage/NewTimeOffRequestPage";
import TimeOffRequestDataPage from "./pages/TimeOffRequestDataPage/TimeOffRequestDataPage";
import TimeOffRequestDataSupPage from "./pages/TimeOffRequestDataSupPage/TimeOffRequestDataSupPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmployeeProfilePage from "./pages/EmployeeProfilePage/EmployeeProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import RegisterEePage from "./pages/RegisterEePage/RegisterEePage";
import AdminPage from "./pages/AdminPage/AdminPage";

// Component Imports
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Context Imports
import { EmployeeInfoContext } from "./context/EmployeeInfoContext";
import AuthContext from "./context/AuthContext";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [user, token] = useAuth();
  const { logoutUser } = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState('');
  const {employeeInfo, setEmployeeInfo} = useContext(EmployeeInfoContext);
  const {employeeId, setEmployeeId} = useContext(EmployeeInfoContext);

  
  //Event Listener To LogOut Employee when closing 
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Perform logout action here (e.g., API call, clearing session, etc.)
      // Replace the following line with your actual logout logic
      logoutUser();
      console.log('Logging out...');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  useEffect(() => {
    if(user)
    {
    const fetchEmployeeInfo = async () => {
      try {
      //Gets employee information from the user id
      let response = await axios.get(`http://127.0.0.1:8000/api/employees/user/${user.id}/`, {
        headers: {
        Authorization: "Bearer " + token,
        },
      });
      // console.log(user.id)
      setEmployeeData(response.data);
      setEmployeeInfo(response.data);
      setEmployeeId(response.data.id);
      } catch (error) {
        console.log(error.message);
      }   
    };
    fetchEmployeeInfo();
    }


    // const fetchPtoRequestInfo = async () => {
    //   try {
    //   let response3 = await axios.get(`http://127.0.0.1:8000/api/employees/user/${user.id}/`, {
    //     headers: {
    //     Authorization: "Bearer " + token,
    //     },
    //   });
    //   setPtoRequestData(response3.data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }    
    // };
    // fetchPtoRequestInfo();

  }, [user, token]);

  return (
      <div>
        <Header />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/registerEe" element={<RegisterEePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage employeeData={employeeData}/>
                  {/* {employee ? <HomePage /> : <Route path="/registerEe" element={<RegisterEePage />} /> } */}
                </PrivateRoute>
              }
            />
            <Route path="/newtimeoffrequest" element={<NewTimeOffRequestPage employeeData={employeeData}/>} />
            {/*Employee Profile & Time Off Request Page using a Param */}
            <Route path="/employeeprofile/:employeeId" element={<EmployeeProfilePage employeeData={employeeData}/>} />
            <Route path="/timeoffrequest/:ptoRequestId" element={<TimeOffRequestDataPage employeeData={employeeData}/>} />
            <Route path="/timeoffrequestsup/:ptoRequestId" element={<TimeOffRequestDataSupPage employeeData={employeeData}/>} />
            <Route path="/supervisor" element={<SupervisorPage employeeData={employeeData}/>} />
            <Route path="/admin" element={<AdminPage employeeData={employeeData}/>} />
          </Routes>
        <Footer />
      </div>
  ); 
}

export default App;
