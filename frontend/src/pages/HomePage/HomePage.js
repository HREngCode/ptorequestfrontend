// General Imports
import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "../../App.css";
import axios from "axios";
import {useNavigate } from 'react-router-dom';

// Component Imports
import Navbar from "../../components/NavBar/NavBar";
import FullCal from "../../components/FullCalendar/FullCal"
import NewRequest from "../../components/NewRequest/NewRequest"

// Context Imports
import {EmployeeInfoContext} from "../../context/EmployeeInfoContext";

// Utility Imports
import { formatDate } from "@fullcalendar/core";

const HomePage = (props) => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token, employee] = useAuth();
  const navigate = useNavigate();
  const [ptoRequests, setPtoRequests] = useState([]);
  const {employeeInfo, setEmployeeInfo} = useContext(EmployeeInfoContext);
  const {employeeId, setEmployeeId} = useContext(EmployeeInfoContext);

  const fetchPtoRequestByEmployee = async () => {//add async before parenthensis ahead of the arrow function
    if(employeeId){
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/pto_requests/employee/${employeeId}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        });
        setPtoRequests(response.data);
        } 
        catch (error) 
        {
          console.log(error.response);
        } 
        setEmployeeId('')    
    };
  } 

  useEffect(() => {

    fetchPtoRequestByEmployee();
    
  }, [user, employeeId, token]);

  let ptoRequestsExist
  if (ptoRequests.length > 0){
    ptoRequestsExist = true
  }
  else {
    ptoRequestsExist = false
  }

  // const handleClick = (ptoRequest) => {
  //   navigate(`/timeoffrequest/${ptoRequest.id}`);
  // };

  // console.log(ptoRequests)

  return (
    <div><Navbar employeeinfo={{employeeInfo}}/>
      <div >
        {/* <div className="column1"> */}
          <div className="title-homepage">
            <h1>Welcome {employeeInfo.employee_first_name + " " + employeeInfo.employee_last_name} To Your HomePage!</h1>
            <div>
              <div className="calendar">
                <FullCal ptoRequests={ptoRequests} employeeInfo={employeeInfo}/>
              </div>
            </div>
          </div>
        {/* </div> */}
        {/* <div className="column2"> 
          <div className="act_req_title"><b><h3>Active Requests</h3></b></div>
              <div className="active_requests"> 
              <div>{ptoRequestsExist?
                (<div>
                {ptoRequests &&
                ptoRequests.map((ptoRequest) => (
                <div key={ptoRequest.id}>
                  <ul><b>Date Requested:</b>{" " + formatDate(ptoRequest.date_requested)}</ul>
                  <ul><b>Hours Requested:</b> {" " + ptoRequest.hours_requested}</ul>
                  <div>{ptoRequest.approved?
                  (<div>
                    <ul><b>Approved:</b> {" Yes"}</ul>
                  </div>) :(<div>                    
                    <ul><b>Approved:</b> {" No"}</ul></div>)
              }</div>
                <button onClick={() => handleClick(ptoRequest)}>Detail</button>
              </div>
              ))}
              </div>):(<div>NO DATA AVAILABLE</div>)}
          </div>
            </div>
          </div> */}
      </div>
    </div>
  );
};

export default HomePage;
