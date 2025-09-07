import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export default function VerifyCertificate() {
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
  if (!verifyId.trim()) {
    setVerifyResult("Please enter a Certificate ID ❗");
    return;
  }

  try {
    const q = query(
      collection(db, "certificates"),
      where("id", "==", verifyId.trim().toUpperCase()) // match uppercase
    );
    const querySnapshot = await getDocs(q);

    console.log("Snapshot size:", querySnapshot.size); // debug

    if (!querySnapshot.empty) {
      const cert = querySnapshot.docs[0].data();
      setVerifyResult(cert);
    } else {
      setVerifyResult("Invalid ID ❌");
    }
  } catch (error) {
    console.error("Error verifying certificate:", error);
    setVerifyResult("Something went wrong ⚠️");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          🔍 Verify Certificate
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
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition-transform ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105"
          }`}
        >
          {loading ? "Verifying..." : "Verify"}
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
                <p>🆔 ID: {verifyResult.id}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
