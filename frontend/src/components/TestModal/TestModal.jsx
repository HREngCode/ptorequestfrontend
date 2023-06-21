//General Imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom"

//Component Imports
import { formatDate } from "@fullcalendar/core";
import Modal from 'react-bootstrap/Modal';

// Context Imports


//Hooks Imports
import useAuth from '../../hooks/useAuth';

//Utility Imports
import "../../App.css"

const TestModal = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return ( 
        <>
        <button onClick={handleShow}>Test</button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='w-100 text-center'>This Is A Test for {props.ptoRequest.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-body'>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
     );
}
export default TestModal;