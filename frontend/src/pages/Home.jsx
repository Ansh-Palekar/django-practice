import styles from "../css/Home.module.css";
import {useNavigate} from 'react-router'


export const Home=()=>{
    const navigate=useNavigate()

    const redirectStudent=()=>{
        navigate('/loginStudent')
    }

    const redirectTeacher=()=>{
        navigate('/loginTeacher')
    }

    return(
         <div className={styles.container}>
            <button className={styles.button} onClick={redirectTeacher}>Teacher Page A Different Change</button>
            <button className={styles.button} onClick={redirectStudent}>Student Page</button>
        </div>
    )
}