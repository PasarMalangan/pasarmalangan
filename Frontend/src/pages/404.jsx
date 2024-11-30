import { useRouteError, Link } from "react-router-dom";
import image from "../image";
export default function ErrorPage() {
  const error = useRouteError();
  return (
    <main className="bg-gradient-to-r from-slate-300 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="w-11/12 md:w-9/12 bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <img className="mx-auto w-[20%] h-[20%]" src={image.errorLogo} alt="errlogo" />
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-9xl font-bold text-red-400">{error.status}</h1>
          <h1 className="text-6xl font-medium py-8">
            Oops! {error.statusText}
          </h1>
          <p className="text-2xl pb-8 px-12 font-medium">
            Kembali ke beranda atau hubungi kami untuk bantuan dan dukungan yuk!
            :D
          </p>
          <div className="flex justify-center space-x-4">
            <Link to={"/"} className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md">
              HOME
            </Link>
            <Link to={"/helpsupport"} className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
