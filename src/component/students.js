import React, { useState } from 'react'
import Base from '../base/base'
import data from '../Data/data'
import AddStudents from './AddStudents';
import UpdateStudents from './updatestudents';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Students({students, setStudents}) {
   const history = useHistory();
    // delete functionality
    const deleteStudent = async (studId)=>{
      
      const response = await fetch(`https://6427aa3446fd35eb7c437e60.mockapi.io/students/${studId}`, {
         method:"DELETE",
      });

      const data = await response.json()
     if(data){
       const remainingStudents = 
       students.filter((stud, idx)=> stud.id !== studId)
       setStudents(remainingStudents)
     }
    }

  
  return (
    <Base 
    title={"Students Dashboard"}
    description={"The page contains all students data"}
    >

         <div className='card-container'>
            {students.map((stud, idx)=>(
 <Card sx={{ maxWidth: 200,height:200 }}key={idx}>
 
 <CardContent>
   <Typography gutterBottom variant="h5" component="div">
     {stud.name}
   </Typography>
   <Typography variant="body2" color="text.primary">
     {stud.batch}
   </Typography>
   <Typography variant="body2" color="text.primary">
     {stud.gender}
   </Typography>
   <Typography variant="body2" color="text.primary">
     {stud.qualification}
   </Typography>

 </CardContent>
 <CardActions>
   <Button size="small" onClick={()=>history.push(`/edit/${stud.id}`)}> Edit</Button>
   <Button size="small" onClick={()=>deleteStudent(stud.id)}>Delete</Button>
 </CardActions>
</Card>

              
                    
            ))}
     </div>

    </Base>
  )
}

export default Students
//crud
// read
//delete
//add
//update
// const arr = [1, 2, 3, 4, 5, 10, 15]

// function deleteFromArray(arr, num){
//   console.log(arr)
//   const removedArra = arr.filter((data, index)=>data != num)
//   console.log(removedArra)
// }

//deleteFromArray(arr, 4)