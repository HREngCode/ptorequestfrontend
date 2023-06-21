import React from 'react';

const EventModal = ({ event, closeModal }) => {
  return (
    <div className="event-modal" >
      <h2>{event.title}</h2>
      <p>{event.start.toLocaleString()}</p>
      <p>{event.description}</p>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default EventModal;