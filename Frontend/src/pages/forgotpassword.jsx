import { useState } from "react";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";
const apiroutes = import.meta.env.VITE_API_BASE_URL;
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${apiroutes}/auth/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Gagal mengirim email reset password.");
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
        <h2 className="text-2xl font-bold mb-4">Lupa Password</h2>
        <form
          className="w-full max-w-md bg-white p-6 shadow rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? "Mengirim..." : "Kirim Email Reset"}
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
