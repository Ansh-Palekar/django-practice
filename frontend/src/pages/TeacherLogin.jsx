import { useState } from "react";
import styles from "../css/TeacherLogin.module.css";
import {useNavigate} from 'react-router'
import axios, { Axios } from "axios";

export const TeacherLogin=()=>{
    const navigate=useNavigate()
    const [gmail,setGmail]=useState("")
    const [password,setPassword]=useState("")
    const handleGmail = (e) => setGmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
    const handleSubmit=async()=>{
        
        const response=await axios.post("http://15.206.143.199:8000/loginTeacher/",{
                    "gmail":gmail,
                    "password":password            
        })  
        if(response.data.message=="SuccessFull")
        {
            localStorage.setItem("teacher_name",response.data.name)

            navigate("/teacherMain") 
        }
        else{
            console.log("Problem in Teacher Login")
        }
    }

    return(
         <div className={styles.container}>
            
            <form>

                 <div className={styles.formBox}>

                    <h3>This is Teacher Login</h3>

                    <input
                        type="text"
                        onChange={handleGmail}
                        className={styles.input}
                    />
                    <input
                        type="text"
                        onChange={handlePassword}
                        className={styles.input}
                    />

                    <button type="button" onClick={handleSubmit} className={styles.button}>Submit</button>
                </div>

            </form>
        </div>
    )
}

