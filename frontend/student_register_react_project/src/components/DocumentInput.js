import React from 'react';
import './../styles/DocumentInput.css';

function DocumentInput({ documents, onImageChange, onFileChange }) {
    const handleImageChange = (index, event) => {
        const imageFile = event.target.files[0];
        onImageChange(index, imageFile);
    };

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        onFileChange(index, file);
    };

    return ( <
            div className = "document-input" >
            <
            label className = "document-label" > Documents: < /label> {
                documents.map((document, index) => ( <
                        div className = "document-row"
                        key = { index } >
                        <
                        label className = "document-sublabel" > Image: < /label> <
                        input type = "file"
                        accept = ".jpg, .jpeg, .png"
                        onChange = {
                            (e) => handleImageChange(index, e) }
                        /> <
                        label className = "document-sublabel" > File(PDF / DOC): < /label> <
                        input type = "file"
                        accept = ".pdf, .doc, .docx"
                        onChange = {
                            (e) => handleFileChange(index, e) }
                        /> {
                            document.image && < p > Selected Image: { document.image.name } < /p>} {
                                document.file && < p > Selected File: { document.file.name } < /p>} <
                                    /div>
                            ))
                    } <
                    /div>
                );
            }

            export default DocumentInput;