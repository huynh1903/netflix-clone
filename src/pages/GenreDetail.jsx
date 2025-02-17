import { fetchGenre } from "@/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/Card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";


const GenreDetailPage = () => {
  const { genreId } = useParams();
  const [items, setItems] = useState();
  const [title, setTitle] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchGenre(genreId);
      setItems(response.data.items);
      setTitle(response.data.titlePage);
    };
    getData();
  }, [genreId]);

  let content;

  if (!items) {
    content = <p className="text-slate-100">Loading...</p>;
  }

  if (items) {
    let startIndex;
    let endIndex;
    if (!pageIndex) {
      startIndex = 1;
      endIndex = 12;
    }
    startIndex = pageIndex * 12;
    endIndex = pageIndex * 12 + 12;
    content = items.slice(startIndex, endIndex).map((item) => (
      <div className="w-full md:w-[22vw]" key={item._id}>
        <Card slug={item.slug} />
      </div>
    ));

    return (
      <div>
        <div className="flex justify-between items-center py-6">
          <div>
            <h2 className="uppercase text-orange-600 font-medium text-2xl">
              {title}
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">{content}</div>
        <div className="pt-8">
          <Pagination>
            <PaginationContent>
              {pageIndex > 0 && (
                <PaginationItem className="hover:cursor-pointer ease-in duration-150 bg-slate-800 rounded -p-2 text-slate-100">
                  <PaginationPrevious
                    onClick={() => {
                      setPageIndex(pageIndex - 1);
                    }}
                  />
                </PaginationItem>
              )}
              <PaginationItem
                className={`${
                  pageIndex === 0
                    ? "text-slate-800 bg-slate-100"
                    : "text-slate-100 bg-slate-800"
                } font-medium hover:cursor-pointer ease-in duration-150 rounded -p-2 `}
              >
                <PaginationLink
                  onClick={() => {
                    setPageIndex(0);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
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
              {pageIndex < 3 && (
                <PaginationItem className="hover:cursor-pointer ease-in duration-150 bg-slate-800 rounded -p-2 text-slate-100">
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
  }
};

export default GenreDetailPage;
