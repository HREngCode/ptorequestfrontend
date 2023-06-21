//General Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

//Component Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//Hooks Imports
import useAuth from '../../hooks/useAuth';

//Utility Imports
import "../../App.css"

function EditUser(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    // setting up hooks a good place to start
    const [user, token] = useAuth ();
    const navigate = useNavigate ();
    const [employeeId, setEmployeeId] = useState(props.employee.id);
    const [employeeNumber, setEmployeeNumber] = useState(props.employee.employee_number);
    const [employeeName, setEmployeeName] = useState(props.employee.employee_first_name);
    const [employeeLastName, setEmployeeLastName] = useState(props.employee.employee_last_name);
    const [department, setDepartment] = useState(props.employee.department);
    const [supervisorNumber, setSupervisorNumber] = useState(props.employee.supervisor_number);
    const [userId, setUserId] = useState(props.employee.user.id);
    const [hireDate, setHireDate] = useState(props.employee.hire_date);
    const [ptoBalance, setPtoBalance] = useState(props.employee.pto_balance);
    const [active, setActive] = useState(props.employee.active);
    const [isSupervisor, setIsSupervisor] = useState(props.employee.isSupervisor);
    const [isAdmin, setIsAdmin] = useState(props.employee.isAdmin);
    let userActive;
    let superActive;
    let adminActive;
  
      const updateEmployeeInfo = async (changeEmployeeInfo) => {
          try 
          {
              let response = await axios.put(`http://127.0.0.1:8000/api/employees/${employeeId}/`, changeEmployeeInfo, {
                  headers: {
                      Authorization: 'Bearer ' + token
                  }
              }) 
              navigate("/")
          }        
          catch (error) 
          {
              console.log(error.message)
          }
      }   
  
      function handleSubmit(event){
          event.preventDefault();
          let changeEmployeeInfo = {
              id: employeeId,
              employee_number: employeeNumber,
              employee_first_name: employeeName,
              employee_last_name: employeeLastName,
              department: department,
              supervisor_number: supervisorNumber,
              user_id: userId,
              hire_date: hireDate,
              pto_balance: ptoBalance,
              active: active,
              isSupervisor: isSupervisor,
              isAdmin: isAdmin   
          };
          updateEmployeeInfo(changeEmployeeInfo)
      } 

      if (active === false)
      {userActive = "No"}
      else
      {userActive = "Yes"}; 

      if (isSupervisor === false)
      {superActive = "No"}
      else
      {superActive = "Yes"}; 

      if (isAdmin === false)
      {adminActive = "No"}
      else
      {adminActive = "Yes"}; 
  
      const makeActive = {
          active: true,
      };
      
      const handleActive = async () => {
         await axios.patch(`http://127.0.0.1:8000/api/employees/pto_balance/${employeeId}/`, makeActive)
         navigate("/")
        };
  
      const makeInactive = {
          active: false,
      };
      
      const handleInactive = async () => {
         await axios.patch(`http://127.0.0.1:8000/api/employees/pto_balance/${employeeId}/`, makeInactive)
         navigate("/")
        };
      
      const handleDelete = async () => {
         await axios.delete(`http://127.0.0.1:8000/api/employees/${employeeId}/`)
         navigate("/")
        };

  return (
    <>
      <button onClick={handleShow}>Edit</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* <form id='editmodal' className="w-full max-w-sm"> */}
        <div className='request-table'>
                  <form onSubmit={handleSubmit}>
                  {/* <form> */}
                    {/* <div className='newEntry'>
                    <label>Employee Id: </label>
                    <input type="number" value={employeeId} onChange={(event) => setEmployeeId(event.target.value)}/>
                    </div> */}
                    <div className='input-row'>
                    <label><b>Employee Number: </b> </label>
                    <input value={employeeNumber} onChange={(event) => setEmployeeNumber(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Employee First Name: </b> </label>
                    <input value={employeeName} onChange={(event) => setEmployeeName(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Employee Last Name: </b> </label>
                    <input value={employeeLastName} onChange={(event) => setEmployeeLastName(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Department:</b> </label>
                    <input value={department} onChange={(event) => setDepartment(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Supervisor Number: </b> </label>
                    <input value={supervisorNumber} onChange={(event) => setSupervisorNumber(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Hire Date: </b> </label>
                    <input type="date" value={hireDate} onChange={(event) => setHireDate(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>PTO Balance: </b> </label>
                    <input type="number" value={ptoBalance} onChange={(event) => setPtoBalance(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Active: </b> </label>
                    <input type="boolean" value={userActive} onChange={(event) => setActive(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Supervisor: </b> </label>
                    <input type="boolean" value={superActive} onChange={(event) => setIsSupervisor(event.target.value)}/>
                    </div>
                    <div className='input-row'>
                    <label><b>Admin:</b></label>
                    <input type="boolean" value={adminActive} onChange={(event) => setIsAdmin(event.target.value)}/>
                    </div>
                    <div>{isAdmin?
                    (<div className='admin-buttons'>
                        <div>
                        <button type='submit'>Update</button>
                        </div>
                    </div>):(<div><h3>YOU ARE NOT AUTHORIZED TO MAKE CHANGES</h3></div>)}
                    </div>
                </form>
                <div>{props.employee.isAdmin?
                (<div className='admin-buttons-center' >
                        <div>
                        <button onClick={handleActive}>Active</button>
                        </div>
                        <div>
                        <button onClick={handleInactive}>Inactive</button>
                        </div>
                        <div>
                        <button onClick={handleDelete}>Delete</button>
                        </div>
                </div>):(<div><h3>RETURN TO THE PREVIOUS PAGE</h3></div>)}
            </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button form="editmodal">Update</button> */}
          {/* <Button variant="primary">Update</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;