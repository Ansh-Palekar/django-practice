import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../css/TeacherMain.module.css";

export function TeacherMain() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [classTeacherData, setCt] = useState([]);
  const [eventTeacherData, setEt] = useState([]);

  useEffect(() => {
    const teacher_name = localStorage.getItem("teacher_name");

    const fetchForClassTeacher = async () => {
      const res = await axios.get(
        `http://my-load-balancer-730870181.ap-south-1.elb.amazonaws.com/fetchForClassTeacher/?teacher_name=${teacher_name}`
      );
      console.log(res.data);
      setCt(res.data.student_list);
    };

    const fetchForEventTeacher = async () => {
      const res = await axios.get(
        `http://my-load-balancer-730870181.ap-south-1.elb.amazonaws.com/fetchForEventTeacher/?teacher_name=${teacher_name}`
      );
      setEt(res.data.student_list);
    };

    fetchForClassTeacher();
    fetchForEventTeacher();
  }, []);

  const markAttendance = async (student_name) => {
    const res = await axios.post(
      `http://my-load-balancer-730870181.ap-south-1.elb.amazonaws.com/markAttendance/`,
      { student_name }
    );
    return res.data.success === true;
  };

  const approveAttendance = async (student_name) => {
    const res = await axios.post(
      `http://my-load-balancer-730870181.ap-south-1.elb.amazonaws.com/approveAttendance/`,
      { student_name }
    );
    return res.data.success === true;
  };

  const deleteRow = async (student_name) => {
    const res = await markAttendance(student_name);
    if (res) {
      setCt((prev) => prev.filter((i) => i !== student_name));
    }
  };

  const deleteRow1 = async (student_name) => {
    const res = await approveAttendance(student_name);
    if (res) {
      setEt((prev) => prev.filter((i) => i !== student_name));
    }
  };

  return (
    <div className={styles.container}>
      
      {/* CLASS TEACHER DROPDOWN */}
      <div className={styles.dropdownWrapper}>
        <button
          className={styles.dropdownButton}
          onClick={() => setOpen1(!open1)}
        >
          Fetch For Class Teacher
        </button>

        {open1 && (
          <div className={styles.dropdownList}>
            <table className={styles.table}>
              <tbody>
                {classTeacherData.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <button
                        className={styles.approveButton}
                        onClick={() => deleteRow(item)}
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EVENT TEACHER DROPDOWN */}
      <div className={styles.dropdownWrapper}>
        <button
          className={styles.dropdownButton}
          onClick={() => setOpen2(!open2)}
        >
          Fetch For Event Teacher
        </button>

        {open2 && (
          <div className={styles.dropdownList}>
            <table className={styles.table}>
              <tbody>
                {eventTeacherData.map((item, index) => (
                  <tr key={index}>
                    <td>{item}</td>
                    <td>
                      <button
                        className={styles.approveButton}
                        onClick={() => deleteRow1(item)}
                      >
                        Approve
                      </button>
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
