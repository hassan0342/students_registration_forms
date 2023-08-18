import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Constant } from '../common/Constants';
import './../styles/Profile.css';

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
                console.log('RESPONSE student', data);
                setStudentData(data.response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    if (!studentData) {
        return <p > Loading... < /p>;
    }

    const renderSubjects = () => ( <
        ul className = "subjects-list" > {
            studentData.subjects.map(subject => ( <
                li key = { subject.id }
                className = "subject-item" > { subject.name } <
                /li>
            ))
        } <
        /ul>
    );



    // 

    const renderDocuments = () => ( <
        div className = "documents-section" >





        <
        div className = "documents-list" > {
            studentData.documents.map(document => ( <
                div key = { document.id }
                className = "document-item" >
                <
                div className = "document-content immersive" >
                <
                div className = "file-container" >
                <
                div className = "file-heading" > Document File < /div> <
                div className = "document-image" >
                <
                img src = { document.image }
                alt = { `Document ${document.id}` }
                /> < /
                div > <
                div className = "document-label" > Document { document.id } < /div> <
                div className = "view-file-button" >
                <
                a className = "document-link"
                href = { document.file }
                target = "_blank"
                rel = "noopener noreferrer" >
                View File <
                /a> < /
                div > <
                /div> < /
                div > <
                /div>
            ))
        } <
        /div> < /
        div >
    );


    // 
    return ( <
        div className = "student-profile" >
        <
        h2 className = "profile-heading engaging" > Student Profile < /h2>

        <
        div className = "profile-details" >
        <
        div className = "profile-field" >
        <
        label className = "profile-label engaging" > Full Name: < /label> <
        p className = "profile-value" > { studentData.name } < /p> < /
        div > <
        div className = "profile-field" >
        <
        label className = "profile-label engaging" > Email Address: < /label> <
        p className = "profile-value" > { studentData.email } < /p> < /
        div > <
        div className = "profile-field" >
        <
        label className = "profile-label engaging" > Phone Number: < /label> <
        p className = "profile-value" > { studentData.phone } < /p> < /
        div > <
        /div>

        <
        div className = "subjects-section" >
        <
        h3 className = "section-heading vibrant" > Subjects < /h3> { renderSubjects() } < /
        div >

        <
        div className = "documents-section" >
        <
        h3 className = "section-heading vibrant" > Documents < /h3> { renderDocuments() } < /
        div >

        <
        button className = "edit-profile-button interactive" > Edit Profile < /button> < /
        div >
    );
}

export default StudentProfile;