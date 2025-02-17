import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div>
        <NavLink
          to="/"
          className="text-slate-100 font-medium text-sm lg:text-base hover:text-orange-500 transition ease-in duration-150 p-2"
        >
          Trang Chủ
        </NavLink>
      </div>

      <div>
        <NavLink
          to="list/phim-le"
          className="text-slate-100 font-medium text-sm lg:text-base hover:text-orange-500 transition ease-in duration-150 p-2"
        >
          Phim Lẻ
        </NavLink>
      </div>

      <div>
        <NavLink
          to="list/phim-bo"
          className="text-slate-100 font-medium text-sm lg:text-base hover:text-orange-500 transition ease-in duration-150 p-2"
        >
          Phim Bộ
        </NavLink>
      </div>

      <div>
        <NavLink
          to="list/tv-shows"
          className="text-slate-100 font-medium text-sm lg:text-base hover:text-orange-500 transition ease-in duration-150 p-2"
        >
          TV Shows
        </NavLink>
      </div>

      <div>
        <NavLink
          to="list/hoat-hinh"
          className="text-slate-100 font-medium text-sm lg:text-base hover:text-orange-500 transition ease-in duration-150 p-2"
        >
          Hoạt Hình
        </NavLink>
      </div>

      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Thể Loại</MenubarTrigger>
            <MenubarContent className="justify-start px-2">
              <MenubarItem>
                <Link to="genre/hanh-dong">Hành Động</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/co-trang">Cổ Trang</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/chien-tranh">Chiến Tranh</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/vien-tuong">Viễn Tưởng</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/kinh-di">Kinh Dị</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/tai-lieu">Tài Liệu</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/bi-an">Bí Ẩn</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/phim-18">Phim 18+</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/tinh-cam">Tình Cảm</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/tam-ly">Tâm Lý</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/the-thao">Thể Thao</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/phieu-luu">Phiêu Lưu</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/am-nhac">Âm Nhạc</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/gia-dinh">Gia Đình</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/hoc-duong">Học Đường</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/hai-huoc">Hài Hước</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/hinh-su">Hình Sự</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/vo-thuat">Võ Thuật</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/khoa-hoc">Khoa Học</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/than-thoai">Thần Thoại</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/chinh-kich">Chính Kịch</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="genre/kinh-dien">Kinh Điển</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Quốc Gia</MenubarTrigger>
            <MenubarContent className="justify-start px-2">
              <MenubarItem>
                <Link to="country/trung-quoc">Trung Quốc</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/han-quoc">Hàn Quốc</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/nhat-ban">Nhật Bản</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/thai-lan">Thái Lan</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/au-my">Âu Mỹ</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/dai-loan">Đài Loan</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/hong-kong">Hồng Kông</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/an-do">Ấn Độ</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/anh">Anh</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/phap">Pháp</Link>
              </MenubarItem>
              <MenubarItem>
                <Link to="country/viet-nam">Việt Nam</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </>
  );
};

export default Navigation;
