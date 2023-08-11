import React from 'react';
import './../styles/SubjectInput.css';


function SubjectInput({ subjects, onSubjectChange, onAddSubject, onRemoveSubject }) {
    return ( <
        div className = "subject-input-container" >
        <
        label htmlFor = "subject" > Subjects: < /label> {
            subjects.map((subject, index) => ( <
                div className = "subject-input-row"
                key = { index } >
                <
                input type = "text"
                id = { `subject-${index}` }
                value = { subject }
                onChange = {
                    (e) => onSubjectChange(index, e.target.value) }
                /> {
                    subjects.length > 1 && ( <
                        button type = "button"
                        className = "remove-button"
                        onClick = {
                            () => onRemoveSubject(index) } >
                        Remove <
                        /button>
                    )
                } <
                /div>
            ))
        } <
        button type = "button"
        className = "add-button"
        onClick = { onAddSubject } >
        Add Subject <
        /button> <
        /div>
    );
}

export default SubjectInput;