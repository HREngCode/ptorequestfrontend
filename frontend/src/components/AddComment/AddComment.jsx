// General Imports
// import React, { useContext, useState } from 'react';
// import axios from 'axios'

// Context Imports
// import { RequestInfoContext } from '../../context/RequestInfoContext';
// import { EmployeeInfoContext } from '../../context/EmployeeInfoContext';

// Component Imports
// import AddRequest from '../AddRequest/AddRequest';

// const AddComment = (props) => {

//     const [comment, setComment] = useState('')
//     const {employee, setEmployee} = useContext(EmployeeInfoContext);
//     const {request, setRequest} = useContext(RequestInfoContext);

//     async function AddComment(newComment){
//         const response = await axios.post('http://127.0.0.1:8000/api/comments/changes/', newComment);
//         console.log(response.data)
//         props.getAllComments()
//     }

//     function handleSubmit(event){
//         event.preventDefault();
//         let newComment = {
//             employee_id: employee.id,
//             pto_request_id: "1",
//             text: comment,    
//         };
//         AddComment(newComment)
//     } 

//     return ( 
//         <div>
//         <form className='addData' onSubmit={handleSubmit}>
//             <div className='newEntry'>
//             <label><b>Comments: </b></label>
//             <input type="text" value={comment} onChange={(event) => setComment(event.target.value)}/>
//             </div>
//             <div className='addSongButton' >
//             <button type='submit'>Add Comment</button>
//             </div>
//         </form>
//     </div>

//      );
// }
 
// export default AddComment;