//General Imports
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

//Component Imports
// import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import RequestDetailUser from '../RequestDetailUser/RequestDetailUser';
import RequestDetailSup from '../RequestDetailSup/RequestDetailSup';
import EventModal from '../EventModal/EventModal';

//Context Imports


// Utility Imports
import { formatDate } from "@fullcalendar/core";
import { createEventId } from './event-utils'
import { Calendar } from '@fullcalendar/core';
import TestModal from '../TestModal/TestModal';

const FullCal = (props)=> {

  const navigate = useNavigate();
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // const [numberEvents, setNumberEvents] = useState(0)

  useEffect(() => {
    handleEvents()
  },[props.ptoRequests]);

  let ptoRequestsExist
  if (props.ptoRequests.length > 0){
    ptoRequestsExist = true
  }
  else {
    ptoRequestsExist = false
  }

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
    console.log(weekendsVisible)
  }
    
  // const handleDateSelect = (selectInfo) => {
  //   let title = prompt('Please enter a new title for your event')
  //   let calendarApi = selectInfo.view.calendar

  //   calendarApi.unselect() // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay
  //     })
  //   }
  // }

  const ptoApprove = {
    approved: true,
  };

  const handleApprovalToggle = async (ptoRequest) => {
    await axios.patch(`http://127.0.0.1:8000/api/pto_requests/approval/${ptoRequest.id}/`, ptoApprove)
    alert(`You have approved the request for ${ptoRequest.id} `)
   };

  const handleEventClick = ({event}) => {
    // Access the custom event ID from the event object
    // const eventId = eventInfo.event.extendedProps.requestid;
    setSelectedEvent(event);
    // setModalOpen(true)
    // if(props.employeeInfo.isSupervisor == true){
    //   navigate(`/timeoffrequestsup/${eventId}`);
    //   }
    // else{
    //   navigate(`/timeoffrequest/${eventId}`);
    //   };
    // Do something with the event ID
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  function handleEvents(){
    let events = props.ptoRequests.map(function (event){
      return {
        title: event.employee.employee_first_name,
        department: event.employee.department,
        start: event.date_requested,
        end: event.date_requested,
        requestid: event.id,
        }
      }
    )
    setCurrentEvents(events)
  }

  const handleClick = () => {
    // console.log(ptoRequest.id)
    // if(props.employeeInfo.isSupervisor == true){
    //   navigate(`/timeoffrequestsup/${ptoRequest.id}`);
    //   }
    // else{
      <RequestDetailUser/>
      // navigate(`/timeoffrequest/${ptoRequest.id}`);
      // };
  };

  
  
  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={currentEvents}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          // select={handleDateSelect}
          // eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </div>
      {/* <RequestDetailUser event={selectedEvent} /> */}
        <div className='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          >
          </input>
          Show Weekends
        </label>
        <div className='requests'>
        <div>Active Requests</div>
          {ptoRequestsExist?
                (<div>
                {props.ptoRequests &&
                props.ptoRequests.map((ptoRequest) => (
                <div className='request-detail' key={ptoRequest.id}>
                  <b>Date Requested:</b>{" " + formatDate(ptoRequest.date_requested)}
                  <div>
                  <b>Hours Requested:</b> {" " + ptoRequest.hours_requested}
                  </div>
                  <div>{ptoRequest.approved?
                  (<div>
                    <b>Approved:</b> {" Yes"}
                  </div>) :(<div>                    
                    <b>Approved:</b> {" No"}</div>)
              }</div>
              <div>
                {props.employeeInfo.isSupervisor?
                (<div>
                  <RequestDetailSup ptoRequest={ptoRequest}/> 
                  <button onClick={() => handleApprovalToggle(ptoRequest)}>Approve</button>
                </div>):
                (<div>
                  <RequestDetailUser ptoRequest={ptoRequest}/>
                </div>)}
                </div>
              </div>
              ))}
              </div>):(<div>NO DATA AVAILABLE</div>)}
          </div>
      </div>
    </div>
  )

}
export default FullCal

