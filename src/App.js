import { Switch,Route } from 'react-router-dom';
import './App.css';
import Base from './base/base';
import Students from './component/students';
import AddStudents from './component/AddStudents';
import UpdateStudents from './component/updatestudents';
import data from './Data/data';
import { useEffect, useState } from 'react';
import Nopage from './component/Nopage';
import DashBoard from './component/DashBoard';
import { Redirect } from 'react-router-dom';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const getStudents = async () =>{
        const response = await fetch("https://6427aa3446fd35eb7c437e60.mockapi.io/students/", {
          method:"GET",
        }); 
        const data = await response.json();
        if(data){
          setStudents(data)
        }
    }
    getStudents();
  }, [])

  return (
    <div className="App">
       <Switch>
        {/* Exact path first page to load */}
         <Route exact path="/">
             <DashBoard/>
         </Route>

          <Route path="/students">
            <Students
            students = {students}
            setStudents ={setStudents}
            />
          </Route>

          <Route path="/details">
             <Redirect to ="/students"/>
          </Route>

         <Route path="/add">
            <AddStudents
            students = {students}
            setStudents ={setStudents}
            />
         </Route>

         <Route path="/edit/:id">
            <UpdateStudents
              students = {students}
              setStudents ={setStudents}
            />
         </Route>

          <Route path="**">
              <Nopage/>
          </Route>

       </Switch>
    </div>
  );
}

export default App;