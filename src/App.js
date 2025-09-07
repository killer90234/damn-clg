import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import CertificateGenerator from './certificate-generator';
import VerifyCertificate from "./verify-certificate";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-indigo-700 text-white flex justify-between">
        <Link to="/" className="font-bold">🎓 Certificate Generator</Link>
        <Link to="/verify" className="hover:underline">Verify Certificate</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CertificateGenerator />} />
        <Route path="/verify" element={<VerifyCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
