import React, {useState, useEffect} from 'react';

// styles
import styles from './singleCourse.module.css';

// components
import AdminNavbar from "../../components/navbar/navbar";
import {BoxContainer} from "../../components/boxContainer/boxContainer";
import {MainHeading} from "../../components/headings/mainHeading/mainHeading";
import {ImageHolder} from "../../components/imageHolder/imageHolder";

const SingleCourse = props => {
    const [course, setCourse] = useState({
        name:'',
        id: '',
        created: '',
        image: '',
        subject: '',
        subjectId: '',
        status: '',
        statusId: '',
    });

    useEffect(() => {
        setCourse({
            ...course,
            name: 'New Course',
            subject: 'N/a',
            status: 'N/a',
        })
    }, []);

    return (
        <div>
            <AdminNavbar/>
            <div className="container margin-top-15">
                <BoxContainer className={styles.nameRow}>
                    <div className={styles.image}>
                        <ImageHolder image={course.image}/>
                    </div>
                    <div className={styles.name}>
                        <MainHeading>{course.name}</MainHeading>
                    </div>
                </BoxContainer>
            </div>
        </div>
    )
}

export default SingleCourse;