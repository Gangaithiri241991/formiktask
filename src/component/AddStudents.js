import React, { useState } from 'react'
import Base from '../base/base'
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from "yup";
import {useFormik} from "formik"


export const filedValidationSchema=yup.object({
  name:yup.string().required("please fill the name"),
  batch:yup.string().required("please fill in batch")
  .min(5,"please pass a valid  batch name"),
  qualificaton:yup.string().required("please fill in valid qualification"),
  gender:yup.string().required("please specify your gender")
})


function AddStudents({students, setStudents}) {

const{handleSubmit,values,handleChange,handleBlur,errors}= useFormik({
  initialValues:{
    name:"",
    batch:"",
    qualification:"",
    gender:""
  },
  validationSchema:filedValidationSchema,
  onSubmit: (newStudentData)=>{
    console.log("onSubmit",newStudentData);
    createStudent(newStudentData);
  }
});


  const history = useHistory()
    //const [name, setName] = useState("")
    //const [batch, setBatch] = useState("")
    //const [gender, setGender] = useState("")
    //const [qualification, setQualification] = useState("")

const createStudent = async (newStudents) =>{
     //creating object from input states
    //const newStudents = {
     // name:name,
      //batch:batch,
      //qualification:qualification,
      //gender: gender,
//}

const response = await fetch("https://6427aa3446fd35eb7c437e60.mockapi.io/students", {
  method:"POST",
  body:JSON.stringify(newStudents),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setStudents([...students, data])
  history.push("/students")
}

  return (
    <Base
    title={"Add New Student"}
    description={"We can able to add new students data here"}
    >
    <div className="text-area">
<form onSubmit={handleSubmit}>
    <TextField 
    name="name"
    id="filled-basic" 
    fullWidth sx={{m:1}}
    label="Name" 
    variant="filled"
    type="name"
    onBlur={handleBlur}
    value={values.name}
    onChange={handleChange}
    
    
    />
   <div style={{color:"red"}}> {errors ? errors.name : ""}</div>
<TextField 
name="batch"

id="filled-basic" 
    fullWidth sx={{m:1}}
    label="Batch" 
    variant="filled"
    type="batch"
    onBlur={handleBlur}
    value={values.batch}
    onChange={handleChange}
    
    
    />
       <div style={{color:"red"}}>{errors ? errors.batch : ""}  </div>
        <TextField 
        
        name="gender"
        id="filled-basic" 
    fullWidth sx={{m:1}}
    label="Gender" 
    variant="filled"
    type="gender"
    onBlur={handleBlur}
    value={values.gender}
    onChange={handleChange}
    
    
    />
       <div style={{color:"red"}}> {errors ? errors.gender : ""} </div>
        <TextField 
        name="qualification"
        id="filled-basic" 
    fullWidth sx={{m:1}}
    label="Qualification" 
    variant="filled"
    type="qualification"
    onBlur={handleBlur}
    value={values.qualification}
    onChange={handleChange}
    
    
    />
       <div style={{color:"red"}}>{errors ? errors.qualification : ""} </div>


        <Button variant="contained"
          type="submit"
        >Add students</Button>
        </form>
    </div>
    </Base>
  )
}

export default AddStudents