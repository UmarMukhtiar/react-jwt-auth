import "./App.css";
import StudentsPage from "./components/students";
import SectionPage from "./components/sections";
import SignupPage from "./pages/signupPage";
import LoginPage from "./pages/loginPage";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/api/login" element={<LoginPage />} />
          <Route exact path="/api/signup" element={<SignupPage />} />
          <Route path="/api/home" element={<Home />}>
            <Route  path="/api/home/students" element={<StudentsPage />} />
            <Route  path="/api/home/sections" element={<SectionPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
