import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoursesIndex from "./Courses/Index"
import CoursesShow from "./Courses/Show"
import CoursesCreate from "./Courses/Create";
import CoursesEdit from "./Courses/Edit";
import LecturersCreate from "./Lecturers/Create";
import LecturersEdit from "./Lecturers/Edit";
import LecturersIndex from "./Lecturers/Index";
import LecturersShow from "./Lecturers/Show";
import EnrolmentsIndex from "./Enrolments/Index";
import EnrolmentsShow from "./Enrolments/Show";
import EnrolmentsCreate from "./Enrolments/Create";
import EnrolmentsEdit from "./Enrolments/Edit";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
function App ()  {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthenticated(true)
    }
  }, [])

  const onAuthenticated = (auth, token) => {
    setAuthenticated(auth);

    if (auth) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };
  return (
    <Router>
      <Navbar authenticated={authenticated} onAuthenticated={onAuthenticated}/>
      <br/>
      <Routes>
        <Route path="/" element={<Home authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/courses" element={<CoursesIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/courses/:id" element={<CoursesShow authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/courses/:id/edit" element={<CoursesEdit authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/courses/create" element={<CoursesCreate authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/lecturers" element={<LecturersIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/lecturers/:id" element={<LecturersShow authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/lecturers/:id/edit" element={<LecturersEdit authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/Lecturers/create" element={<LecturersCreate authenticated={authenticated} onAuthenticated={onAuthenticated}/>}/> 
        <Route path="/enrolments" element={<EnrolmentsIndex authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/enrolments/:id" element={<EnrolmentsShow authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/enrolments/create" element={<EnrolmentsCreate authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
        <Route path="/enrolments/:id/edit" element={<EnrolmentsEdit authenticated={authenticated} onAuthenticated={onAuthenticated}/>} />
      </Routes>
    </Router>
  );
};

export default App;
