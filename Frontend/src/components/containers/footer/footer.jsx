import image from "../../../image";
export default function Footer() {
  return (
<footer className="w-full bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100">
  <article className="grid grid-cols-2 md:flex md:flex-row justify-between items-center border-b-2 border-black px-5 md:px-10 py-5 gap-5 md:gap-10">
    <nav className="hidden md:flex flex-col gap-2 text-xl">
      <h3 className="font-bold text-center md:text-start">UMKM Malang</h3>
      <ul className="flex flex-col gap-2 text-lg text-center md:text-start">
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
      <h3 className="font-bold text-center md:text-start">Layanan Kami</h3>
      <ul className="flex flex-col gap-2 text-lg text-center md:text-start">
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
      <h3 className="font-bold text-center md:text-start">Bantuan dan Panduan</h3>
      <ul className="flex flex-col gap-2 text-lg text-center md:text-start">
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a href="">FAQ</a>
        </li>
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a href="">Hubungi Kami</a>
        </li>
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a href="">Panduan</a>
        </li>
      </ul>
    </nav>
    <nav className="hidden md:flex flex-col gap-2 text-xl">
      <h3 className="font-bold text-center">Ikuti Kami</h3>
      <ul className="flex flex-col gap-2 text-lg items-center md:items-start">
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a className="flex items-center gap-x-2" href="">
            <img src={image.icon_facebook} alt="Facebook" className="w-6 h-6" /> Facebook
          </a>
        </li>
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a className="flex items-center gap-x-2" href="">
            <img src={image.icon_instagram} alt="Instagram" className="w-6 h-6" /> Instagram
          </a>
        </li>
        <li className="hover:text-slate-50 transition-colors duration-300 ease-in-out">
          <a className="flex items-center gap-x-2" href="">
            <img src={image.icon_X} alt="X" className="w-6 h-6" /> X
          </a>
        </li>
      </ul>
    </nav>
    <img className="md:w-1/5 mx-auto md:mx-0 col-span-2" src={image.logo_footer} alt="Logo Footer" />
  </article>
  <p className="text-center font-semibold py-5">
    © UMKM Malang 2024. Hak Cipta Dilindungi
  </p>
</footer>

  );
}
