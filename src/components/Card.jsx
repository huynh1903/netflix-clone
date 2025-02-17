import { fetchMovieDetail } from "@/api";
import { useEffect, useState } from "react";
import { FaRegCirclePlay } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Card = ({slug}) => {
  const [dataMovie, setDataMovie] = useState();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetchMovieDetail(slug);
        setDataMovie(response);
      } catch(error) {
        console.log("loi khong lay duoc data o card " + error);
    }}
    fetchMovie();
  }, [slug]);
  

  if (!dataMovie)
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );

  return (
    <>
      <Link to={`/info/${slug}`}>
      <div className="w-full h-full rounded overflow-hidden">
        <div className="relative w-full h-full group hover:cursor-pointer ease-linear duration-150">
          <LazyLoadImage
            width="100%"
            height="100%"
            className="w-full h-full group-hover:scale-125 transition-transform ease-in-out duration-500"
            src={dataMovie.movie.thumb_url}
            alt={dataMovie.movie.slug}
            effect="blur"
          />
          <div className="absolute z-20 top-0 left-0 px-2 py-1 bg-gradient-to-r from-orange-600 to-blue-500 rounded">
            <span className="text-sm font-medium text-slate-50">{dataMovie.movie.lang}</span>
          </div>
          <div className="absolute w-full min-h-8 bg-slate-900/70 bottom-0 left-0 flex justify-center items-center">
            <span className="text-slate-50 text-sm">{dataMovie.movie.name}</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <FaRegCirclePlay className="text-5xl text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"/>
          </div>
        </div>
      </div>
      </Link>
    </>
  );
};

export default Card;
