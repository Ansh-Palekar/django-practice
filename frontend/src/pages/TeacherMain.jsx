import axios from "axios";
import { useEffect, useState } from "react";

export function TeacherMain() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [classTeacherData,setCt]=useState([])
  const [eventTeacherData,setEt]=useState([])

  useEffect(() => {
    const teacher_name=localStorage.getItem("teacher_name")
    const fetchForClassTeacher=async()=>{
          const res=await axios.get(`http://localhost:8000/fetchForClassTeacher/?teacher_name=${teacher_name}`)
          print(res.data)
          setCt(res.data.student_list)
    }

    const fetchForEventTeacher=async()=>{
        const res=await axios.get(`http://localhost:8000/fetchForEventTeacher/?teacher_name=${teacher_name}`)
        setEt(res.data.student_list)
    }

    fetchForClassTeacher()
    fetchForEventTeacher()

    console.log(classTeacherData)
  }, [])


  const markAttendance=async(student_name)=>{
      const res=await axios.post(`http://localhost:8000/markAttendance/`,{student_name:student_name})
      if(res.data.success === true){
        return true
      }
      return false
  }

  const approveAttendance=async(student_name)=>{
      const res=await axios.post(`http://localhost:8000/approveAttendance/`,{student_name:student_name})
      if(res.data.success === true){
        return true
      }
      return false
  }


  const deleteRow=async(student_name)=>{
      const res=markAttendance(student_name)
      if(res){
        setCt(prev => prev.filter(i => i !== student_name));
      }
  }

  const deleteRow1=async(student_name)=>{
      const res=approveAttendance(student_name)
      if(res){
        setEt(prev => prev.filter(i => i !== student_name));
      }
  }

  return (
    <div className="container">
      {/* DROPDOWN 1 */}
      <div className="dropdownWrapper">
        <button
          className="dropdownButton"
          onClick={() => setOpen1(!open1)}
        >
          Fetch For Class Teacher
        </button>

        {open1 && (
          <div className="dropdownList">
            <table className="table">
              <tbody>
                {classTeacherData.map((item,index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <button className="approveButton" onClick={()=>deleteRow(item)}>Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DROPDOWN 2 */}
      <div className="dropdownWrapper">
        <button
          className="dropdownButton"
          onClick={() => setOpen2(!open2)}
        >
          Fetch For Event Teacher
        </button>

        {open2 && (
          <div className="dropdownList">
            <table className="table">
              <tbody>
                {eventTeacherData.map((item,index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <button className="approveButton" onClick={()=>deleteRow1(item)}>Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
