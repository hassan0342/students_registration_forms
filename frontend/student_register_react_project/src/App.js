import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentProfile from './components/StudentProfile';
import EditStudentProfile from './components/EditStudentProfile';

function App() {
    return ( <
        Router >

        <
        Routes >

        <
        Route Component = { StudentForm }
        path = '/' > < /Route> <
        Route Component = { StudentProfile }
        path = '/profile/:id' > < /Route> <
        Route Component = { EditStudentProfile }
        path = '/edit/:id' > < /Route> <
        /Routes> <
        /Router>
    );
}

export default App;