import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

// styles
import styles from './courses.module.css';

// actions
import {fetchCourseList} from "../../store/actions/courseActions";
import {logError} from "../../store/actions/logActions";

// components
import AdminNavbar from "../../components/navbar/navbar";
import {CircleAddButton} from "../../components/buttons/circleAddButton/circleAddButton";
import {MainHeading} from "../../components/headings/mainHeading/mainHeading";

const Courses = props => {
    // local
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function prepare() {
            try {
                const list = await fetchCourseList();
                setCourses(list);
            } catch(e) {
                logError(e.message)
            }
        }
        prepare();
    }, []);
    return (
        <div>
            <AdminNavbar/>
            <div className="container">
                <div className={styles.headingRow}>
                    <MainHeading>Courses</MainHeading>
                    <Link to='/admin/course/new'>
                        <CircleAddButton/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Courses;