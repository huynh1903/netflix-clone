import Card from "@/components/Card";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
import { fetchGenre } from "@/api";

const fetchData = async (listId) => {
  const response = await fetch(
    `https://phimapi.com/v1/api/danh-sach/${listId}?limit=${60}`
  );
  const data = await response.json();
  return data;
};

const ListDetailPage = () => {
  const { listId } = useParams();
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [filtered, setFiltered] = useState({
    genre: "",
    country: "",
    year: "",
  });
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(listId);
      setTitle(data.data.titlePage);
      setItems(data.data.items);
      setFilteredItems(data.items);
    };
    getData();
    setPageIndex(0);
  }, [listId]);

  useEffect(() => {
    if (!items.length) return;

    if (Object.values(filtered).every((value) => !value)) {
      setFilteredItems(items);
    } else {
      const filteredList = items.filter(
        (item) =>
          (!filtered.genre ||
            item.category?.some((g) => g.slug === filtered.genre)) &&
          (!filtered.country ||
            item.country?.some((c) => c.slug === filtered.country)) &&
          (!filtered.year || item.year?.toString() === filtered.year)
      );

      setFilteredItems(filteredList);
    }
  }, [filtered, items]);

  const handleFilterChange = (type, value) => {
    setFiltered((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  let content;

  if (!items) {
    content = <p className="text-slate-100">Loading...</p>;
  }
  
  const totalPage = Math.ceil(filteredItems?.length/12)
  if(pageIndex >= totalPage) {
   () => setPageIndex(totalPage)
  }
  if (filteredItems) {
    let startIndex;
    let endIndex;
    if (!pageIndex) {
      startIndex = 1;
      endIndex = 12;
    }
    startIndex = pageIndex * 12;
    endIndex = startIndex + 12;
    content = filteredItems.slice(startIndex, endIndex).map((item) => (
      <div className="w-full md:w-[22vw]" key={item._id}>
        <Card slug={item.slug} />
      </div>
    ));

  }


  

  return (
    <div>
      <div className="md:flex justify-between items-center py-6">
        <div>
          <h2 className="uppercase text-orange-600 font-medium text-2xl">
            {title}
          </h2>
        </div>
        <div className="w-full mt-6 md:mt-0 md:w-6/12 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Select onValueChange={(value) => handleFilterChange("genre", value)}>
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
      <div className="flex flex-wrap gap-3">{content}</div>
      <div className="mt-4 md:pt-8">
        <Pagination>
          <PaginationContent>
            {pageIndex > 0 && (
              <PaginationItem
                className={`${
                  filteredItems?.length / 12 >= 2 ? "inline-block" : "hidden"
                } hover:cursor-pointer ease-in duration-150 bg-slate-800 rounded -p-2 text-slate-100`}
              >
                <PaginationPrevious
                  onClick={() => {
                    setPageIndex(pageIndex - 1);
                  }}
                />
              </PaginationItem>
            )}
            {filteredItems?.length  > 0  && (
              <PaginationItem
                className={`${
                  pageIndex === 0
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-100 bg-slate-800"
                } 
                font-medium hover:cursor-pointer ease-in duration-150 rounded -p-2 `}
              >
                <PaginationLink
                  onClick={() => {
                    setPageIndex(0);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {filteredItems?.length > 12 && (
              <PaginationItem
                className={`${
                  pageIndex === 1
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-100 bg-slate-800"
                } font-medium hover:cursor-pointer ease-in duration-150 rounded -p-2 `}
              >
                <PaginationLink
                  onClick={() => {
                    setPageIndex(1);
                  }}
                >
                  2
                </PaginationLink>
              </PaginationItem>
            )}
            {filteredItems?.length > 24 && (
              <PaginationItem
                className={`${
                  pageIndex === 2
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-100 bg-slate-800"
                } font-medium hover:cursor-pointer ease-in duration-150 rounded -p-2 `}
              >
                <PaginationLink
                  onClick={() => {
                    setPageIndex(2);
                  }}
                >
                  3
                </PaginationLink>
              </PaginationItem>
            )}
            {filteredItems?.length > 36 && (
              <PaginationItem
                className={`${
                  pageIndex === 3
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-100 bg-slate-800"
                } font-medium hover:cursor-pointer ease-in duration-150 rounded -p-2 `}
              >
                <PaginationLink
                  onClick={() => {
                    setPageIndex(3);
                  }}
                >
                  4
                </PaginationLink>
              </PaginationItem>
            )}
            {(pageIndex < totalPage) && (
              <PaginationItem
                className={`${
                  filteredItems?.length / 12 >= 2 ? "inline-block" : "hidden"
                } hover:cursor-pointer ease-in duration-150 bg-slate-800 rounded -p-2 text-slate-100`}
              >
                <PaginationNext
                  onClick={() => {
                    setPageIndex(pageIndex + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ListDetailPage;
