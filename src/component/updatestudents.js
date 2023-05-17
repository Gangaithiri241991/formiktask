import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../base/base';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function UpdateStudents({students, setStudents}) {
    const {id} = useParams();
     const editStudent = students[id]
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const history = useHistory();

    useEffect(()=>{
       setName(editStudent.name)
     setBatch(editStudent.batch)
       setGender(editStudent.gender)
      setQualification(editStudent.qualification)
    }, [editStudent])

    async function updateStudent (){
         const updatedObject = {
            name : name,
            batch : batch,
            gender: gender,
            qualification :qualification
         }
     const response = await fetch(`https://6427aa3446fd35eb7c437e60.mockapi.io/students/${editStudent.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         students[id] = updatedObject
         setStudents([...students])
         history.push("/students")
     }
    }

  return (
    <Base
    title={"Edit a Student"}
    description={"Edit Students data here"}
    >
    <div className="text-area">

<TextField id="filled-basic" 
fullWidth sx={{m:1}}
label="Name" 
variant="filled"
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}


/>
<TextField id="filled-basic" 
fullWidth sx={{m:1}}
label="Batch" 
variant="filled"
type="text"
value={batch}
onChange={(e)=>setBatch(e.target.value)}


/>
    
    <TextField id="filled-basic" 
fullWidth sx={{m:1}}
label="Gender" 
variant="filled"
type="text"
value={gender}
onChange={(e)=>setGender(e.target.value)}


/>
    
    <TextField id="filled-basic" 
fullWidth sx={{m:1}}
label="Qualification" 
variant="filled"
type="text"
value={qualification}
onChange={(e)=>setQualification(e.target.value)}


/>
    


    <Button variant="contained"
    onClick={updateStudent}
    >update students</Button>
    
</div>
</Base>
  )
}

export default UpdateStudents