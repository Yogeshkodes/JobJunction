import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Applications } from "./pages/Applications.jsx";
import { ApplyJob } from "./pages/ApplyJob.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </>
  );
}

export default App;
