import { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/containers/footer/footer";
import Navbar from "../components/containers/navbar/navbar";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function ResetPassword() {
  const { token } = useParams(); // Ambil token dari URL
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    if (newPassword.length < 8) {
      setMessage("Password harus terdiri dari minimal 8 karakter!");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await fetch(`${apiroutes}/auth/resetpassword/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password berhasil diatur ulang. Silakan login.");
      } else {
        setMessage(data.message || "Gagal mengatur ulang password.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="px-2 flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Atur Ulang Password</h2>
        <form
          className="w-full max-w-md bg-white p-6 shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password Baru
            </label>
            <input
              type="password"
              value={newPassword}
              name="newPassword"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Mengatur..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </main>
      <Footer />
    </>
  );
}
