import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Home } from './pages/Home.jsx'
import {StudentLogin} from './pages/StudentLogin.jsx'
import { TeacherLogin } from './pages/TeacherLogin.jsx'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { StudentMain } from './pages/StudentMain.jsx'
import { TeacherMain } from './pages/TeacherMain.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>

    <Routes>

     <Route path="/" element={<Home/>}/>
     <Route path="/loginTeacher"  element={<TeacherLogin/>}/>
     <Route path="/loginStudent" element={<StudentLogin/>}/>

     <Route path="/studentMain" element={<StudentMain/>}/>
     <Route path="/teacherMain" element={<TeacherMain/>}/>

    </Routes>
  
  </BrowserRouter>

)
