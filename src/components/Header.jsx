import logo from "@/assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import Navigation from "./Navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const Header = () => {
  const [openInput, setOpenInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const inputRef = useRef(null)
  useOnClickOutside(inputRef, ()=> {
    setOpenInput(false)
  })

  const handleInputChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://phimapi.com/v1/api/tim-kiem?keyword=${inputValue}&limit=${16}`
          );
          const data = await response.json();
          setItems(data.data.items || []);
        } catch (error) {
          console.error("Error fetching search data:", error);
          // Optionally, set an error state and display a user-friendly message
        }
      };
      if (inputValue) {
        fetchData();
      } else {
        setItems([]);
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [inputValue]);

  return (
    <div className="w-screen h-16 bg-slate-950 fixed top-0 left-0 z-40 flex justify-center items-center">
      <div className="w-11/12 flex justify-between items-center">
        {/* Logo & Navigation */}
        <div className={`${openInput ? 'hidden opacity-0 md:flex md:opacity-100' : 'flex opacity-100 md:flex'} items-center`}>
          <Link to="/">
            <div className="w-20 md:w-24 flex mr-4">
              <img className="w-full" src={logo} alt="logo" />
            </div>
          </Link>
          <nav className="hidden md:flex">
            <Navigation />
          </nav>
        </div>

        {/* Search & Mobile Menu */}
        <div className="flex justify-between items-center">
          {/* Search Bar */}
          <Popover>
            <PopoverTrigger>
              <div ref={inputRef} className={`${openInput ? 'w-[80vw] md:w-[32vw]' : 'w-12 md:w-20'} p-2 relative flex items-center`}>
                <IoSearch
                  className="absolute z-20 left-3 md:left-4 text-slate-50 text-2xl hover:cursor-pointer ease-in duration-150"
                  onClick={() => setOpenInput(true)}
                  aria-label="Search"
                />
                <Input
                  ref={inputRef}
                  className={`${
                    openInput ? "max-w-full opacity-100" : "max-w-0 opacity-0"
                  } bg-slate-800 text-slate-50 h-full pl-9 transition-all ease-in duration-500`}
                  placeholder="Tìm kiếm theo tên phim"
                  onChange={handleInputChange}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="w-full"
            >
              <div className={`${items.length === 0 ? 'opacity-0 hidden' : 'opacity-100 block'} w-[80vw] md:w-[32vw] h-auto max-h-[80vh] md:max-h-[60vh] bg-slate-800 flex flex-col overflow-y-scroll p-4 rounded gap-4`}>
                {items.map((item) => (
                  <Link key={item._id} to={`/info/${item.slug}`}>
                    <div className="flex justify-between items-center w-full">
                      <div className="w-4/12 md:w-3/12">
                        <img
                          className="w-28 h-32 rounded"
                          src={`https://phimimg.com/${item.poster_url}`}
                          alt={item.slug}
                        />
                      </div>
                      <div className="w-7/12 md:w-8/12">
                        <p className="text-slate-50">{item.name}</p>
                        <p className="text-slate-50 text-sm">
                          {item.origin_name} - {item.year}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Mobile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="p-2 md:hidden"
                aria-label="Open mobile menu"
                tabIndex="0"
              >
                <FaBars className="text-2xl text-slate-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-950 border-none min-h-[calc(100vh_-_64px)] p-4 gap-y-6 flex flex-col">
              <Navigation />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;