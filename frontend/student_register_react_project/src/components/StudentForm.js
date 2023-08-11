import React, { useState } from 'react';
import SubjectInput from './SubjectInput';
import DocumentInput from './DocumentInput';
import './../styles/StudentForm.css';
import { Constant } from '../common/Constants';
import { Link } from 'react-router-dom';





function StudentForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subjects, setSubjects] = useState(['']);
    const [documents, setDocuments] = useState([{ image: null, file: null }]);
    const [successMessage, setSuccessMessage] = useState('');
    const [mydata, setData] = useState([]);


    const handleSubjectChange = (index, value) => {
        const newSubjects = [...subjects];
        newSubjects[index] = value;
        setSubjects(newSubjects);
    };
    const handleAddSubject = () => {
        setSubjects([...subjects, '']);
    };

    const handleRemoveSubject = (index) => {
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
    };

    const handleImageChange = (index, imageFile) => {
        const newDocuments = [...documents];
        newDocuments[index].image = imageFile;
        setDocuments(newDocuments);
    };

    const handleFileChange = (index, file) => {
        const newDocuments = [...documents];
        newDocuments[index].file = file;
        setDocuments(newDocuments);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        subjects.forEach((subject) => formData.append('subjects[]', subject));

        // Append each document data with separate 'image' and 'file' fields
        documents.forEach((document, index) => {
            formData.append(`documents[${index}][image]`, document.image);
            formData.append(`documents[${index}][file]`, document.file);
        });


        try {
            const response = await fetch(Constant.register_student, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    // Other headers if needed
                },
            });

            if (response.ok) {
                console.log('Request successful');
                const data = await response.json();
                console.log('RESPONE', data);
                setSuccessMessage('Student registered successfully!');
                setData(data.response);


            } else {
                if (response.status === 422) {
                    const errorData = await response.json();
                    console.error('Request failed with validation errors', errorData);
                } else {
                    console.error('Request failed with status:', response.status);
                }
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };
    return ( <
        form className = "student-form"
        onSubmit = { handleSubmit } >
        <
        h2 > Student Registration Form < /h2>   {
        successMessage && ( <
            div className = "success-container" >
            <
            p className = "success-message" > { successMessage } <
            /p>  <
            Link to = { `/profile/${mydata.id}` }
            className = "view-profile-button" >
            View Profile <
            /Link> < /
            div >
        )
    }

    <
    label htmlFor = "name" > Name: < /label> <
    input type = "text"
    id = "name"
    value = { name }
    onChange = {
        (e) => setName(e.target.value)
    }
    required /
        >

        <
        label htmlFor = "email" > Email: < /label> <
    input type = "email"
    id = "email"
    value = { email }
    onChange = {
        (e) => setEmail(e.target.value)
    }
    required /
        >

        <
        label htmlFor = "phone" > Phone: < /label> <
    input type = "tel"
    id = "phone"
    value = { phone }
    onChange = {
        (e) => setPhone(e.target.value)
    }
    required /
        >

        <
        SubjectInput subjects = { subjects }
    onSubjectChange = { handleSubjectChange }
    onAddSubject = { handleAddSubject }
    onRemoveSubject = { handleRemoveSubject }
    />

    <
    DocumentInput documents = { documents }
    onImageChange = { handleImageChange }
    onFileChange = { handleFileChange }
    />

    <
    button type = "submit"
    className = "submit-button" > Submit < /button> 

    <
    /

    form >
);
}

export default StudentForm;