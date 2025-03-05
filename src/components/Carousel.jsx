
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useFetch from "@/hooks/useFetch";
import Card from "./Card";

const CarouselMovies = () => {
  const { data, isPending, error } = useFetch(
    `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page=1`
  );

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
          {data.items.map((movie) => 
          (
            <CarouselItem className="md:basis-1/4" key={movie._id}>
              <Card data={movie}/>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default CarouselMovies;
