//General Imports
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

//Component Imports
import Navbar from "../../components/NavBar/NavBar";
import { formatDate } from "@fullcalendar/core";

// Context Imports
import { EmployeeInfoContext } from '../../context/EmployeeInfoContext';

//Hooks Imports
import useAuth from '../../hooks/useAuth';

const NewTimeOffRequestPage = (props) => {
    // setting up hooks a good place to start
    const [user, token] = useAuth ()
    const navigate = useNavigate ()
    const [approved, setApproved] = useState(false) 
    let approveStatus; 
    if (approved === false)
        {approveStatus = "No"}
    else
        {approveStatus = "Yes"};  
    const {employee, setEmployee} = useContext(EmployeeInfoContext);
    const {employeeId} = useContext(EmployeeInfoContext);
    const [comment, setComment] = useState('')
    const [requestId, setRequestId] = useState(null)
    const [formValues, setFormValues] = useState(
        {
        date_requested: '',
        hours_requested: '',
        approved: approved, 
    });

    const handleRequestSubmit = (event) => {
    event.preventDefault();

    axios.post(`http://127.0.0.1:8000/api/pto_requests/new/`, formValues, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
        setRequestId(response.data.id);
        navigate("/")
        // await handleUpdateBalance(updatedPtoBalance);  
        const commentValues = {
            employee: employeeId,
            pto_request: response.data.id,
            text: comment, 
        };
        console.log(commentValues)
        return axios.post('http://127.0.0.1:8000/api/comments/changes/', commentValues);
        // props.getAllComments()
        })
        .then(response => {
            //handle success
            console.log(response);
        })
        .catch(error => {
            //handle error
            console.error(error);
        });
    };

    const handleChange = (event) => {
        setFormValues(
            {
            employee_id: employeeId,
            ...formValues,
            [event.target.name]: event.target.value,
        });
        };

    return ( 
        <div><Navbar />
            <div className='req-column1'>
                <div className='request-table'>{employeeId? 
                (<div>
                    <h3>New Request</h3>
                    <form onSubmit={handleRequestSubmit}>
                        <div className='newEntry'>
                        <label><b>Date Requested Off: </b></label>
                        <input type="date" name="date_requested" value={formValues.date_requested} onChange={handleChange}/>
                        </div>
                        <div className='newEntry'>
                        <label><b>Hours Requested: </b></label>
                        <input type="number" name="hours_requested" value={formValues.hours_requested} onChange={handleChange}/>
                        </div>                        
                        {/* <div className='newEntry'>
                        <label><b>Approved: </b> </label>
                        {approveStatus}
                        </div> */}
                        <div className='newEntry'>
                        <label><b>Comments: </b></label>
                        <input type="text" name="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
                        </div>
                        <div className='submit-new-request'>
                            <button type='submit'>Submit</button>
                            {/* <button onClick={handleCommentSubmit}>Submit Comment</button> */}
                        </div>
                    </form>
                </div>):(<div>NO DATA AVAILABLE</div>)}
            </div>
            </div>
            <div className='req-column2'>
                <div className='info'>
                    <div className='newEntry'>
                    <label><b>Employee Number: </b></label>
                    {props.employeeData.employee_number}
                    </div>
                    <div className='newEntry'>
                    <label><b>Employee Name: </b></label>
                    {props.employeeData.employee_first_name + " " + props.employeeData.employee_last_name}
                    </div>
                    <div className='newEntry'>
                    <label><b>Department:</b> </label>
                    {props.employeeData.department}
                    </div>
                    <div className='newEntry'>
                    <label><b>Supervisor Name: </b></label>
                    {props.employeeData.supervisor_number}
                    </div>
                    <div className='newEntry'>
                    <label><b>Hire Date: </b></label>
                    {formatDate(props.employeeData.hire_date)}
                    </div>
                    <div className='newEntry'>
                    <label><b>PTO Balance:</b> </label>
                    {props.employeeData.pto_balance}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NewTimeOffRequestPage;