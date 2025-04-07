import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import PreviousUploads from "./pages/PreviousUploads"; // or correct path

<Route path="/previous-uploads" element={<PreviousUploads />} />


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default App;
