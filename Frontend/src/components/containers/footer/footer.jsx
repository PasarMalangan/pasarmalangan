import image from "../../../image";
export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
      <article className="flex justify-between items-center border-b-2 border-black px-10 py-5">
        <nav className="flex flex-col gap-2 text-xl">
          <h3 className="font-bold">UMKM Malang</h3>
          <ul className="flex flex-col gap-2 text-xl">
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Tentang Kami</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Karir</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Blog</a>
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col gap-2 text-xl">
          <h3 className="font-bold">Layanan Kami</h3>
          <ul className="flex flex-col gap-2 text-xl">
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Marketplace</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Edukasi UMKM</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Komunitas</a>
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col gap-2 text-xl">
          <h3 className="font-bold">Bantuan dan Panduan</h3>
          <ul className="flex flex-col gap-2 text-xl">
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Tentang Kami</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Karir</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a href="">Blog</a>
            </li>
          </ul>
        </nav>
        <nav className="flex flex-col gap-2 text-xl">
          <h3 className="font-bold">Ikuti Kami</h3>
          <ul className="flex flex-col gap-2 text-xl">
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a className="flex gap-x-2" href=""><img src={image.icon_facebook} alt="" />Facebook</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a className="flex gap-x-2" href=""><img src={image.icon_instagram} alt="" />Instagram</a>
            </li>
            <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
              <a className="flex gap-x-2" href=""><img src={image.icon_X} alt="" />X</a>
            </li>
          </ul>
        </nav>
        <img className="w-[20%]" src={image.logo_footer} alt="logofooter" />
      </article>
      <p className="font-semibold pl-10 py-5">
        © UMKM Malang 2024. Hak Cipta Dilindungi
      </p>
    </footer>
  );
}
