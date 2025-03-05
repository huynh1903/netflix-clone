import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CarouselMovies from "@/components/Carousel";
import useFetch from "@/hooks/useFetch";




const FeatureMovies = () => {
  const {data, isPending, error} = useFetch(`https://phimapi.com/v1/api/danh-sach/phim-le?limit=${12}`)

  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h1 className="py-3 text-2xl text-orange-500 uppercase font-medium">
          Phim lẻ
        </h1>
        <div>
          <Link to="list/phim-le">
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
      <div className="py-3 flex flex-col md:grid grid-cols-5 grid-rows-3 gap-4">
        {data.data.items.map((movie) => 
        (
          <div key={movie._id} className="first:row-span-2 first:col-span-2">
            <Card data={movie} />
          </div>
        )
        )}
      </div>
    </section>
  );
};

const SeriesMovies = () => {
  const {data, isPending, error} = useFetch(`https://phimapi.com/v1/api/danh-sach/phim-bo?limit=${12}`)

  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h1 className="py-3 text-2xl text-orange-500 uppercase font-medium">
          Phim bộ
        </h1>
        <div>
          <Link to="/list/phim-bo">
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
      <div className="py-3 flex flex-col md:grid grid-cols-5 grid-rows-3 gap-4">
        {data.data.items.map((movie) => (
          <div key={movie._id} className="first:row-span-2 first:col-span-2">
            <Card data={movie}/>
          </div>
        ))}
      </div>
    </section>
  );
};

const TVShows = () => {
  const {data, isPending, error} = useFetch(`https://phimapi.com/v1/api/danh-sach/tv-shows?limit=${12}`)
  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h1 className="py-3 text-2xl text-orange-500 uppercase font-medium">
          TV Shows
        </h1>
        <div>
          <Link to="/list/tv-shows">
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
      <div className="py-3 flex flex-col md:grid grid-cols-5 grid-rows-3 gap-4">
        {data.data.items.map((movie) => (
          <div key={movie._id} className="first:row-span-2 first:col-span-2">
            <Card data={movie}/>
          </div>
        ))}
      </div>
    </section>
  );
};

const CartoonMovies = () => {
  const {data, isPending, error} = useFetch(`https://phimapi.com/v1/api/danh-sach/hoat-hinh?limit=${12}`)

  if (isPending) return;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-4">
      <div className="flex justify-between items-center">
        <h1 className="py-3 text-2xl text-orange-500 uppercase font-medium">
          Phim hoạt hình
        </h1>
        <div>
          <Link to="/list/cartoon">
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
      <div className="py-3 flex flex-col md:grid grid-cols-5 grid-rows-3 gap-4">
        {data.data.items.map((movie) => (
          <div key={movie._id} className="first:row-span-2 first:col-span-2">
            <Card data={movie}/>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <CarouselMovies />
      <FeatureMovies />
      <SeriesMovies />
      <TVShows />
      <CartoonMovies />
    </>
  );
};

export default HomePage;
