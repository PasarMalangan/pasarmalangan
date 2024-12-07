import { Link } from "react-router-dom";
import image from "../../../image";
export default function NavAuth(props) {
  return (
    <header className="w-full bg-blue-500 px-10 py-2">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-x-5 w-max">
          <Link className="w-1/2" to={"/"}>
            <img src={image.logo_header} alt="iconhome" />
          </Link>
          <p className="text-white font-bold text-2xl">{props.typeform}</p>
        </div>
        <Link
          className="text-white text-xl hover:text-slate-300 transition-colors duration-300"
          to={"/helpsupport"}
        >
          Butuh Bantuan?
        </Link>
      </nav>
    </header>
  );
}
