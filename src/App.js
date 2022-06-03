import "./App.css";
import StudentsPage from "./components/students";
import SectionPage from "./components/sections";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./services/ProtectedRoutes";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/api/login" element={<LoginPage />} />
          <Route exact path="/api/signup" element={<SignupPage />} />
          <Route path="/api/home/test" element={<Navigate to='/api/home/students' replace={true}/>}/>
          <Route path="/api/home/" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } >
            <Route path="students" element={<StudentsPage />} />
            <Route path="sections" element={<SectionPage />} />
          </Route>
          <Route path="*" element={<Navigate to='/api/login'/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
