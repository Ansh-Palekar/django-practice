import { useState } from "react";
import styles from "../css/StudentLogin.module.css";
import {useNavigate} from 'react-router'
import axios,{Axios} from 'axios'

export const StudentLogin=()=>{
    const navigate=useNavigate()
    const [gmail,setGmail]=useState("")
    const [password,setPassword]=useState("")

    const handleGmail = (e) => setGmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit=async()=>{
        try{
            const response=await axios.post("http://127.0.0.1:8000/loginStud/",
                {
                    "gmail":gmail,
                    "password":password
                }
            )
            console.log(response.data.message)

            if(response.data.message=="SuccessFull"){
                navigate("/studentMain")
            }
            else{
                console.log("Incorrect Credentials")
            }   


        } 
        catch(error)
        {
            console.log(error)
        }

    }


    return(
          <div className={styles.container}>
            <form>
                <h3 className={styles.title}>This is Student Login</h3>
                <div className={styles.formBox}>
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

