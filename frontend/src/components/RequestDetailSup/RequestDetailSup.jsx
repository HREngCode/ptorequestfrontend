//General Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"

//Component Imports
import { formatDate } from "@fullcalendar/core";
import Modal from 'react-bootstrap/Modal';

// Context Imports


//Hooks Imports
import useAuth from '../../hooks/useAuth';

//Utility Imports
import "../../App.css"

const RequestDetailSup = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ptoRequestId, setptoRequestId] = useState();
    const [user, token] = useAuth ();
    const navigate = useNavigate ();
    const [ptoRequest, setPtoRequest] = useState({});
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState('');
    const [dateRequested, setDateRequested] = useState();
    const [hoursRequested, setHoursRequested] = useState('');
    const [requesterName, setRequesterName] = useState('');
    const [ptoBalance, setPtoBalance] = useState('')
    const [approved, setApproved] = useState('');
    const [empty, setEmpty] = useState();
    let approveStatus;

    useEffect(() => {
        setDateRequested(props.ptoRequest.date_requested)
        setHoursRequested(props.ptoRequest.hours_requested)
        setRequesterName(props.ptoRequest.employee.employee_first_name + " " + props.ptoRequest.employee.employee_last_name)
        setPtoBalance(props.ptoRequest.employee.pto_balance)
        setApproved(props.ptoRequest.approved)
        fetchComments();
    }, [token, user]);  


    const fetchComments = async () => {
        try {
            let response2 = await axios.get(
                `http://127.0.0.1:8000/api/comments/request/${props.ptoRequest.id}/`
            )
            if (response2.data == "null" || response2.data == ""){
                setEmpty(true)
            }
            else {
            setEmpty(false)
            setComments(response2.data)
            }
            // setApproved(response.data.approved)
        } catch (error) {
            console.log(error)
        }
    };

    const addNewComment = async (newComment) => {
        try 
        {
        await axios.post('http://127.0.0.1:8000/api/comments/changes/', newComment);
        fetchComments();
        }
        catch (error) 
        {
            console.log(error.message)
        }
    };

    const handleAddComment = (event) => {
        event.preventDefault();
        let newComment = {
            employee: props.ptoRequest.employee.id,
            pto_request: event.id,
            text: addComment,
        };
        addNewComment(newComment);
        setAddComment(""); 
    }

    const updateTimeOffRequest = async (changeTimeOffRequest) => {
        try 
        {
            await axios.put(`http://127.0.0.1:8000/api/pto_requests/update/${props.ptoRequest.id}/`, changeTimeOffRequest, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if(props.ptoRequest.employee.isSupervisor === true) {
                navigate("/supervisor")
            }
            else if(props.ptoRequest.employee.isAdmin === true){
                navigate("/admin")
            }
            else {
                navigate("/")
            }
            
            
        } 
        catch (error) 
        {
            console.log(error.message)
        }
    }    

    function handleSubmit(event){
        event.preventDefault();
        let changeTimeOffRequest = {
            employee_id: props.ptoRequest.employee.id,
            date_requested: dateRequested,
            hours_requested: hoursRequested, 
        };
        updateTimeOffRequest(changeTimeOffRequest)
    } 

    const ptoApprove = {
        approved: true,
    };

    if (approved === false)
    {approveStatus = "No"}
    else
    {approveStatus = "Yes"}; 

    const handleApprovalToggle = async () => {
        await axios.patch(`http://127.0.0.1:8000/api/pto_requests/approval/${ptoRequestId}/`, ptoApprove)
        alert(`You have approved the request for ${props.ptoRequest.id} `)
        navigate("/supervisor")
       };
 
     const handleDelete = async () => {
         await axios.delete(`http://127.0.0.1:8000/api/pto_requests/${props.ptoRequest.id}/`)
         navigate("/supervisor")
        };

    return (

        <>
        <button onClick={handleShow}>Detail</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='w-100 text-center'>Info For Request No. {props.ptoRequest.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        <div className='request-container'>
        <div className='req-column1'>
            <div className='request-table'>
                <form onSubmit={handleSubmit}>
                    <div className='newEntry'>
                    <label><b>Employee Name: </b></label>
                    {requesterName}
                    </div>
                    <div className='newEntry'>
                    <label><b>Date Requested Off: </b></label>
                    <input type="date" value={dateRequested} onChange={(event) => setDateRequested(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>Hours Requested: </b></label>
                    <input type="number" value={hoursRequested} onChange={(event) => setHoursRequested(event.target.value)}/>
                    </div>
                    <div className='newEntry'>
                    <label><b>PTO Balance: </b></label>
                    {ptoBalance}
                    </div>
                    <div className='newEntry'>
                    <label><b>Approved: </b></label>
                    {approveStatus}
                    </div>
                    <div>
                        <div className='admin-buttons-center' >
                            <div>
                            <button type='submit'>Update</button>
                            <button onClick={handleApprovalToggle}>Approve</button>
                            </div>
                        </div>           
                    </div>
                </form>
            </div>
            </div>
            <div className="req-column2">
                <div className='comments-table'>
                    {empty?
                    (<div>NO DATA AVAILABLE</div>):
                    (<div> 
                        {comments &&
                        comments.map((comment) => (
                            <div key={comment.id}>
                                {/* <ul><b>Request Number:</b>{" " + props.ptoRequest.id}</ul> */}
                                <ul><b>User:</b>{" " + comment.employee_id}</ul>
                                <ul><b>Comment:</b> {" " + comment.text}</ul>
                            </div>
                            ))}
                    </div>)}
                </div>
                <div>
                    <button onClick={handleAddComment}>Add Comment</button>
                    <input type="text" name="text" value={addComment} onChange={(event) => setAddComment(event.target.value)}/> 
                </div>
            </div>        
            <div>
            <button onClick={handleDelete}>Delete Request</button>
            </div>
        </div>

        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RequestDetailSup;
