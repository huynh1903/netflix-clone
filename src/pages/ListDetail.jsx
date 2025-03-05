import Card from "@/components/Card";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

const ListDetailPage = () => {
  const { listId } = useParams();
  const [items, setItems] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [listCurrentPage, setListCurrentPage] = useState([0, 1, 2, 3, 4, 5]);
  const [title, setTitle] = useState("");
  const [filtered, setFiltered] = useState({
    genre: "",
    country: "",
    year: "",
  });
  const handleFilterChange = (type, value) => {
    setFiltered((prev) => ({
      ...prev,
      [type]: value,
    }));
    paginationHandler(0);
  };

  const { data } = useFetch(
    `https://phimapi.com/v1/api/danh-sach/${listId}?page=${
      currentPage + 1
    }&category=${filtered.genre}&country=${filtered.country}&year=${
      filtered.year
    }&limit=${24}`
  );

  useEffect(() => {
    if (data?.status === "success") {
      setItems(data.data.items);
      setTitle(data.data.titlePage);
      setTotalPages(data.data.params.pagination.totalPages);
    }
  }, [data]);
  useEffect(() => {
    setFiltered({
      genre: "",
      country: "",
      year: "",
    });
    setCurrentPage(0);
    setListCurrentPage([0, 1, 2, 3, 4, 5]);
  }, [listId]);

  const paginationHandler = (element) => {
    const safePage = Math.max(0, Math.min(element, totalPages - 1));
    setCurrentPage(safePage);
    let pageList;
    if (totalPages <= 5) {
      pageList = Array.from({ length: totalPages }, (_, i) => i);
    } else if (safePage < 3) {
      pageList = [0, 1, 2, 3, 4];
    } else if (safePage >= totalPages - 3) {
      pageList = [
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      ];
    } else {
      pageList = [
        safePage - 2,
        safePage - 1,
        safePage,
        safePage + 1,
        safePage + 2,
      ];
    }
    setListCurrentPage(pageList);
  };

  const PaginationPreviousHandler = () => {
    paginationHandler(currentPage - 1);
  };

  const PaginationNextHandler = () => {
    paginationHandler(currentPage + 1);
  };

  return (
    <div>
      <div className="md:flex justify-between items-center py-6">
        <div>
          <h2 className="uppercase text-orange-600 font-medium text-2xl">
            {title}
          </h2>
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-6/12 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Select onValueChange={(value) => handleFilterChange("genre", value)} value={filtered.genre}>
            <SelectTrigger className="w-[160px] md:w-[180px] hover:cursor-pointer bg-slate-800 text-slate-100 font-medium ease-in duration-150">
              <SelectValue className="" placeholder="Thể Loại" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 scroll-smooth snap-y">
              <SelectGroup>
                <SelectLabel className="text-slate-100">Thể Loại</SelectLabel>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="hanh-dong"
                >
                  Hành Động
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="co-trang"
                >
                  Cổ Trang
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="chien-tranh"
                >
                  Chiến Tranh
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="vien-tuong"
                >
                  Viễn Tưởng
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="kinh-di"
                >
                  Kinh Dị
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="tai-lieu"
                >
                  Tài Liệu
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="bi-an"
                >
                  Bí Ẩn
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="phim-18"
                >
                  Phim 18+
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="tinh-cam"
                >
                  Tình Cảm
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="tam-ly"
                >
                  Tâm Lý
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="the-thao"
                >
                  Thể Thao
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="phieu-luu"
                >
                  Phiêu Lưu
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="am-nhac"
                >
                  Âm Nhạc
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="gia-dinh"
                >
                  Gia Đình
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="hoc-duong"
                >
                  Học Đường
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="hai-huoc"
                >
                  Hài Hước
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="hinh-su"
                >
                  Hình Sự
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="vo-thuat"
                >
                  Võ Thuật
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="khoa-hoc"
                >
                  Khoa Học
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="than-thoai"
                >
                  Thần Thoại
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="chinh-kich"
                >
                  Chính Kịch
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="kinh-dien"
                >
                  Kinh Điển
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("country", value)}
            value={filtered.country}
          >
            <SelectTrigger className="w-[160px] text-sm md:w-[180px] hover:cursor-pointer bg-slate-800 text-slate-100 font-medium ease-in duration-150">
              <SelectValue className="" placeholder="Quốc Gia" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 ">
              <SelectGroup>
                <SelectLabel className="text-slate-100">Quốc Gia</SelectLabel>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="trung-quoc"
                >
                  Trung Quốc
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="han-quoc"
                >
                  Hàn Quốc
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="nhat-ban"
                >
                  Nhật Bản
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="thai-lan"
                >
                  Thái Lan
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="au-my"
                >
                  Âu Mỹ
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="dai-loan"
                >
                  Đài Loan
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="hong-kong"
                >
                  Hồng Kông
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="an-do"
                >
                  Ấn Độ
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="anh"
                >
                  Anh
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="Pháp"
                >
                  Pháp
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="viet-nam"
                >
                  Việt Nam
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("year", value)}
            placeholder
            value={filtered.year}
          >
            <SelectTrigger className="w-[160px] text-sm md:w-[180px] hover:cursor-pointer bg-slate-800 text-slate-100 font-medium ease-in duration-150">
              <SelectValue className="" placeholder="Năm phát hành" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 ">
              <SelectGroup>
                <SelectLabel className="text-slate-100">
                  Năm phát hành
                </SelectLabel>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2025"
                >
                  2025
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2024"
                >
                  2024
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2023"
                >
                  2023
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2022"
                >
                  2022
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2021"
                >
                  2021
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2020"
                >
                  2020
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2019"
                >
                  2019
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2018"
                >
                  2018
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2017"
                >
                  2017
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2016"
                >
                  2016
                </SelectItem>
                <SelectItem
                  className="hover:cursor-pointer text-slate-100 font-medium ease-in duration-150"
                  value="2015"
                >
                  2015
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 md:grid grid-cols-4 grid-rows-6 ">
        {items?.map((item) => (
          <Card key={item._id} data={item} />
        ))}
      </div>
      <div className="mt-4 md:pt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="py-2 px-4 bg-orange-600 text-white font-medium rounded hover:cursor-pointer"
                onClick={PaginationPreviousHandler}
              />
            </PaginationItem>
            {listCurrentPage.map((element) => {
              return (
                <PaginationItem
                  key={element}
                  className="py-2 px-4 bg-orange-600 text-white font-medium rounded hover:cursor-pointer"
                  onClick={() => paginationHandler(element)}
                >
                  <button className="bg-orange-600 text-white font-medium rounded hover:cursor-pointer">
                    {element + 1}
                  </button>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                className="py-2 px-4 bg-orange-600 text-white font-medium rounded hover:cursor-pointer"
                onClick={PaginationNextHandler}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ListDetailPage;
