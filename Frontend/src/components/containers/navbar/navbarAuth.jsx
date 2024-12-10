import { Link } from "react-router-dom";
import image from "../../../image";
export default function NavAuth(props) {
  return (
    <header className="w-full bg-blue-500 px-5 md:px-10 h-full py-2 sticky top-0 left-0 z-50">
      <nav className="grid grid-cols-2 md:flex items-center justify-between">
        <div className="flex items-center gap-x-5 w-full sm:w-auto">
          <Link to="/" className="hidden md:block">
            <img src={image.logo_header} alt="iconhome" />
          </Link>
          <Link to="/" className="flex items-center md:hidden text-white hover:text-slate-300 duration-300 ease-out">
            <ion-icon size="large" name="arrow-back-outline"></ion-icon>
          </Link>
          <p className="text-white font-bold text-2xl sm:text-xl">
            {props.typeform}
          </p>
        </div>
        <Link
          className="text-white text-end text-xl hover:text-slate-300 transition-colors duration-300 sm:mt-0"
          to={"/helpsupport"}
        >
          Butuh Bantuan?
        </Link>
      </nav>
    </header>
  );
}
