import { useState } from "react";
import styles from "../css/StudentMain.module.css";
import axios from "axios";

export const StudentMain=()=>{    
    const [prn,setPrn]=useState("")
    const [division,setDivision]=useState("")
    const [event,setEvent]=useState("")
    const [certificate,setCertificate]=useState(null)
    
    const handlePrn = (e) => setPrn(e.target.value);
    const handleDivision = (e) => setDivision(e.target.value);
    const handleEvent=(e)=>setEvent(e.target.value)

    const handleImage = (e) => {
        setCertificate(e.target.files[0]);
    };

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append("prn", prn);
        formData.append("division", division);
        formData.append("event", event);
        formData.append("certificate", certificate);

           try {
            const response = await axios.post(
                "http://127.0.0.1:8000/submitForm/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        setPrn("");
        setDivision("");
        setEvent("");
        setCertificate(null);

        e.target.reset()
    }
    
    return(
         <div className={styles.container}>
            <form>
                <input type="text" onChange={handlePrn} placeholder="Enter PRN"/>
                <input type="text" onChange={handleDivision} placeholder="Enter Division"/>
                <input type="text" onChange={handleEvent} placeholder="Enter Event Name"/>
                <input type="file" onChange={handleImage} placeholder="Enter Certificate"/>
                <button onClick={handleSubmit} type="submit">Submit</button>
            </form>
        </div>
    )
}

