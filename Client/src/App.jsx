import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Applications } from "./pages/Applications.jsx";
import { ApplyJob } from "./pages/ApplyJob.jsx";
import RecrutersLogin from "./components/RecrutersLogin.jsx";
import { useContext } from "react";
import { AppContext } from "./context/AppContext.jsx";

function App() {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <div>
      {showRecruiterLogin && <RecrutersLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
}

export default App;
