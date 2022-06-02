import "./App.css";
import NavBar from "./components/NavBar/navbar";
import StudentsPage from "./pages/Students/students";
import SectionPage from "./pages/Students/sections";
import SignupPage from "./pages/Students/signupPage";
import LoginPage from "./pages/Students/loginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="api/students" element={<StudentsPage />} />
          <Route exact path="/api/sections" element={<SectionPage />} />
          <Route exact path="/api/login" element={<LoginPage />} />
          <Route exact path="/api/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
