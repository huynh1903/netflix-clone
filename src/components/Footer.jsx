import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-slate-950 flex flex-col justify-center items-center py-6">
      <div className="w-11/12 flex flex-col md:flex-row justify-between items-center md:gap-6">
        <div className="w-20 md:w-24">
          <img className="w-full h-full" src={logo} alt="logo" />
        </div>
        <div>
          <p className="text-slate-100">
            Netflix - Trang web xem phim trực tuyến miễn phí chất lượng cao với
            giao diện trực quan, tốc độ tải trang nhanh, cùng kho phim với hơn
            20.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem
            lại phút giây giải trí tuyệt vời cho bạn.
          </p>
        </div>
      </div>
      <br />
      <div className="text-slate-300 text-sm">© 2024 Solohzy. All rights reserved.</div>
    </div>
  );
};

export default Footer;
