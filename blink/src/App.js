
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

