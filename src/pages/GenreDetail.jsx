import Card from "@/components/Card";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useParams } from "react-router-dom";
import useFetch from "@/hooks/useFetch";

const GenreDetailPage = () => {
  const { genreId } = useParams();
  const [items, setItems] = useState();
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [listCurrentPage, setListCurrentPage] = useState([0, 1, 2, 3, 4, 5]);
  const [title, setTitle] = useState("");;

  const { data } = useFetch(
    `https://phimapi.com/v1/api/the-loai/${genreId}?page=${currentPage}&limit=${24}`
  );

  useEffect(() => {
    if (data?.status === "success") {
      setItems(data.data.items);
      setTitle(data.data.titlePage);
      setTotalPages(data.data.params.pagination.totalPages);
    }
  }, [data]);

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
    paginationHandler(currentPage - 1)
  }

  const PaginationNextHandler = () => {
    paginationHandler(currentPage + 1)
  }

  

  return (
    <div>
      <div className="md:flex justify-between items-center py-6">
        <div>
          <h2 className="uppercase text-orange-600 font-medium text-2xl">
            {title}
          </h2>
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
              <PaginationPrevious className="py-2 px-4 bg-orange-600 text-white font-medium rounded hover:cursor-pointer" onClick={PaginationPreviousHandler}/>
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
              <PaginationNext className="py-2 px-4 bg-orange-600 text-white font-medium rounded hover:cursor-pointer" onClick={PaginationNextHandler}/>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default GenreDetailPage;
