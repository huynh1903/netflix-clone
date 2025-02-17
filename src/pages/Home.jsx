import {
  fetchCartoon,
  fetchFeature,
  fetchNewMovies,
  fetchSeries,
  fetchTvShows,
} from "@/api";
import Card from "@/components/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

//phim mới cập nhật
const NewMovies = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch dữ liệu trước khi render component
    queryClient.prefetchQuery({
      queryKey: ["new"],
      queryFn: () => fetchNewMovies(12),
    });
  }, [queryClient]);

  const { data, isPending, error } = useQuery({
    queryKey: ["new"],
    queryFn: () => fetchNewMovies(12),
  });

  if (isPending) return null; // Không hiển thị gì khi đang load

  if (error) return <p className="text-red-500">Lỗi: {error.message}</p>;

  return (
    <section className="py-4">
      <h1 className="py-3 text-2xl text-orange-500 uppercase font-medium">
        Phim mới cập nhật
      </h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {data.items.map((movie) => (
            <CarouselItem className="md:basis-1/4" key={movie.slug}>
              <Card slug={movie.slug} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};




const FeatureMovies = () => {
  const fetchData = async () => {
    const data = await fetchFeature(12);
    return data;
  };

  
  const { data, isPending, error } = useQuery({
    queryKey: ["feature"],
    queryFn: fetchData,
  });

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
        {data.data.items.map((movie) => (
          <div key={movie._id} className="first:row-span-2 first:col-span-2">
            <Card slug={movie.slug} />
          </div>
        ))}
      </div>
    </section>
  );
};

const SeriesMovies = () => {
  const fetchData = async () => {
    const data = await fetchSeries(12);
    return data;
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["series"],
    queryFn: fetchData,
  });

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
            <Card slug={movie.slug} />
          </div>
        ))}
      </div>
    </section>
  );
};

const TVShows = () => {
  const fetchData = async () => {
    const data = await fetchTvShows(12);
    return data;
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["tv-shows"],
    queryFn: fetchData,
  });

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
            <Card slug={movie.slug} />
          </div>
        ))}
      </div>
    </section>
  );
};

const CartoonMovies = () => {
  const fetchData = async () => {
    const data = await fetchCartoon(12);
    return data;
  };
  const { data, isPending, error } = useQuery({
    queryKey: ["cartoon"],
    queryFn: fetchData,
  });

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
            <Card slug={movie.slug} />
          </div>
        ))}
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <NewMovies />
      <FeatureMovies />
      <SeriesMovies />
      <TVShows />
      <CartoonMovies />
    </>
  );
};

export default HomePage;
