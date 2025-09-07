import React, { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function CertificateGenerator() {
  const [name, setName] = useState("");
  const [certId, setCertId] = useState("");
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const canvasRef = useRef(null);

  const certBg = "/f.png"; // certificate background
  const course = "IT EVENT"; // default course

  // Generate random certificate ID
  const generateId = () => {
    return "CERT-" + Math.floor(100000 + Math.random() * 900000);
  };

 const generateCertificate = async () => {
    if (!name) return alert("Please enter a name first!");
    const id = generateId();
    setCertId(id);

    // Save to Firestore
    try {
      await addDoc(collection(db, "certificates"), {
        id,
        name,
        course,
        date: new Date().toLocaleDateString()
      });
      console.log("Certificate saved to Firebase!");
    } catch (err) {
      console.error("Error saving certificate:", err);
    }

    // Draw certificate on canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = certBg;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Name
      ctx.font = "bold 60px 'Times New Roman'";
      ctx.fillStyle = "#2d3748";
      ctx.textAlign = "center";
      ctx.fillText(name, img.width / 2, img.height / 2);

      // Course
      ctx.font = "bold 48px Arial";
      ctx.fillStyle = "#4a5568";
      ctx.fillText(course, img.width / 2, img.height / 2 + 120);

      // Certificate ID below course
      ctx.font = "bold 28px Arial";
      ctx.fillStyle = "#000";
      ctx.fillText(id, img.width / 2, img.height / 2 + 170);
    };
  };

  const downloadCertificate = () => {
    if (!name || !certId) return alert("Generate certificate first!");
    const link = document.createElement("a");
    link.download = `${name || "certificate"}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleVerify = () => {
    const certificates = JSON.parse(localStorage.getItem("certificates") || "[]");
    const cert = certificates.find((c) => c.id === verifyId.trim());
    if (cert) {
      setVerifyResult(cert);
    } else {
      setVerifyResult("Invalid ID ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          🎓 Create Your Certificate
        </h1>
        <p className="text-lg text-white/90 mt-3 max-w-2xl mx-auto">
          Instantly generate a personalized e-certificate with your name & a unique verification ID.
        </p>
      </div>

      {/* Generate Certificate Section */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enter Your Name
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-3 mb-6 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />

        <div className="flex space-x-4">
          <button
            onClick={generateCertificate}
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:scale-105 transition-transform"
          >
            Generate
          </button>
          <button
            onClick={downloadCertificate}
            className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-md hover:scale-105 transition-transform"
          >
            Download
          </button>
        </div>

        {certId && (
          <p className="mt-4 text-center text-sm text-gray-600">
            ✅ Certificate ID: <span className="font-mono">{certId}</span> <br />
            (Use this ID to verify your certificate)
          </p>
        )}
      </div>

      {/* Certificate Preview */}
      <div className="bg-white rounded-xl shadow-xl p-4 max-w-4xl w-full mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-3 text-center">
          Certificate Preview
        </h3>
        <canvas ref={canvasRef} className="w-full rounded-lg shadow-lg" />
      </div>

      {/* Verify Certificate Section */}
      {/* <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Verify Certificate
        </h2>

        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={verifyId}
          onChange={(e) => setVerifyId(e.target.value)}
          className="border w-full p-3 mb-6 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />

        <button
          onClick={handleVerify}
          className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-md hover:scale-105 transition-transform"
        >
          Verify
        </button>

        {verifyResult && (
          <div className="mt-6 text-center text-gray-700">
            {typeof verifyResult === "string" ? (
              <p className="text-red-500">{verifyResult}</p>
            ) : (
              <div>
                <p>✅ <b>{verifyResult.name}</b> holds this certificate</p>
                <p>📘 Course: {verifyResult.course}</p>
                <p>📅 Date: {verifyResult.date}</p>
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
}
