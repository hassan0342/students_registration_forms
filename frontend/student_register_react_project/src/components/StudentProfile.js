import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Constant } from '../common/Constants';
import './../styles/StudentForm.css';


function StudentProfile() {
    const { id } = useParams();
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const headers = {
                    Accept: 'application/json',
                };

                const response = await fetch(`${Constant.studentprofile}/${id}`, {
                    method: 'GET',
                    headers: headers,
                });

                const data = await response.json();
                setStudentData(data.response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!studentData) {
        return <p > Loading... < /p>;
    }

    return ( <
        div className = "student-profile" >
        <
        h2 > Student Profile < /h2> <
        p > Name: { studentData.name } < /p> <
        p > Email: { studentData.email } < /p> <
        p > Phone: { studentData.phone } < /p>

        { /* Display subjects */ } <
        h3 > Subjects: < /h3> <
        ul > {
            studentData.subjects.map(subject => ( <
                li key = { subject.id } > { subject.name } < /li>
            ))
        } <
        /ul>

        { /* Display documents */ } <
        h3 > Documents: < /h3> <
        ul > {
            studentData.documents.map(document => ( <
                li key = { document.id } >
                <
                a href = { document.file }
                target = "_blank"
                rel = "noopener noreferrer" > { document.image } <
                /a> < /
                li >
            ))
        } <
        /ul>

        { /* Other information */ } <
        button > Edit Profile < /button> < /
        div >
    );
}

export default StudentProfile;