import { FaRegCirclePlay } from "react-icons/fa6";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  let { lang, quality, name, slug, thumb_url, year } = data;
  thumb_url = thumb_url.replace("https://phimimg.com", "");

  return (
    <>
      <Link to={`/info/${slug}`}>
        <div className="w-full h-full rounded overflow-hidden">
          <div className="relative w-full h-full group hover:cursor-pointer ease-linear duration-150">
            <LazyLoadImage
              width="100%"
              height="100%"
              className="w-full h-full group-hover:scale-125 transition-transform ease-in-out duration-500"
              src={`https://phimimg.com/${thumb_url}`}
              alt={name}
              effect="blur"
            />
            <div className="absolute z-20 top-0 left-0 px-2 py-1 bg-gradient-to-r from-orange-600 to-blue-500 rounded">
              <span className="text-sm font-medium text-slate-50">
                {quality} | {lang}
              </span>
            </div>
            <div className="absolute w-full min-h-8 bg-slate-900/70 bottom-0 left-0 flex justify-center items-center">
              <span className="text-slate-50 text-sm">
                {name}({year})
              </span>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
              <FaRegCirclePlay className="text-5xl text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
