import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/containers/navbar/navbar";
import Footer from "../components/containers/footer/footer";

const HelpAndSupport = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center bg-gray-50">
        <section className="flex flex-col w-full max-w-4xl mt-10 px-5">
          <article className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-3">
              <details className="border p-4 rounded shadow-sm bg-white">
                <summary className="font-semibold text-gray-700 cursor-pointer">
                  Bagaimana cara memperbarui profil saya?
                </summary>
                <p className="mt-2 text-gray-600">
                  Untuk memperbarui profil Anda, navigasikan ke halaman profil
                  dari dashboard dan pilih navigasi "Pengaturan Akun".
                </p>
              </details>
              <details className="border p-4 rounded shadow-sm bg-white">
                <summary className="font-semibold text-gray-700 cursor-pointer">
                  Apa yang harus saya lakukan jika saya lupa kata sandi saya?
                </summary>
                <p className="mt-2 text-gray-600">
                  Klik tautan "Lupa Kata Sandi" di halaman login dan ikuti
                  instruksi untuk mengatur ulang kata sandi Anda.
                </p>
              </details>
              <details className="border p-4 rounded shadow-sm bg-white">
                <summary className="font-semibold text-gray-700 cursor-pointer">
                  Bagaimana cara menghubungi dukungan pelanggan?
                </summary>
                <p className="mt-2 text-gray-600">
                  Anda dapat menghubungi dukungan pelanggan dengan mengirim
                  email kepada kami di pasarmalangan@gmail.com atau hubungi hotline
                  kami di 123-456-7890.
                </p>
              </details>
            </div>
          </article>

          <article className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
            <form className="mt-4 space-y-4 bg-white p-6 rounded shadow-sm">
              <div>
                <label
                  htmlFor="name"
                  className="block font-semibold text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-2 border rounded mt-1 resize-none"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </form>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HelpAndSupport;
