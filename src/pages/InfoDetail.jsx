import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Card from "@/components/Card";
import { fetchNewMovies } from "@/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewMovies = () => {
  const fetchData = async () => {
    const data = await fetchNewMovies(12);
    return data;
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["new" ],
    queryFn: fetchData,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="py-4 pb-8">
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

const InfoDetailPage = () => {
  const { infoId } = useParams();

  const fetchData = async () => {
    const response = await fetch(`https://phimapi.com/phim/${infoId}`);
    const data = await response.json();
    return data;
  };

  const { data, isPending, error, } = useQuery({
    queryKey: ["detail", infoId],
    queryFn: fetchData,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  let embed = null;
  if (data.movie.trailer_url !== "") {
    embed = data.movie.trailer_url.replace("watch?v=", "embed/");
  }

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-around">
        <div className="w-10/12 md:w-3/12 flex justify-center relative">
          <LazyLoadImage
            className="w-full min-w-52 rounded"
            src={data.movie.poster_url}
            alt={data.movie.slug}
            effect="blur"
          />
          <div className="absolute left-0 bottom-4 w-full flex justify-center items-center gap-3">
            <Link to={`../../play/${data.movie.slug}`}>
              <Button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:cursor-pointer ease-in duration-150">Xem phim</Button>
            </Link>
            {embed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:cursor-pointer ease-in duration-150">Trailer</Button>
                </DialogTrigger>
                <DialogContent className="w-[370px] md:w-[560px] md:h-[370px]">
                  {/* <DialogHeader>
                  <DialogTitle>Trailer</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader> */}
                  <div className="flex items-center">
                    <div className="grid flex-1 gap-2">
                      <iframe
                        src={embed}
                        title="YouTube video player"
                        width="100%"
                        height="315"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        frameborder="0"
                      ></iframe>
                    </div>
                  </div>
                  {/* <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter> */}
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="w-full md:w-7/12">
          <h2 className="text-slate-100 font-semibold text-2xl py-3 text-center md:text-left">
            {data.movie.name}
          </h2>
          <p className="text-slate-100 font-medium text-lg text-center md:text-left">
            {data.movie.origin_name}
          </p>
          <ul className="grid grid-cols-2 grid-rows-3 gap-2 pt-4">
            <li>
              <p className=" text-slate-100">
                Năm phát hành: {data.movie.year}
              </p>
            </li>
            <li>
              <p className=" text-slate-100">Thời gian: {data.movie.time}</p>
            </li>
            <li>
              <p className=" text-slate-100">
                Chất lượng: {data.movie.quality}
              </p>
            </li>
            <li>
              {data.movie.episode_total === "1" && (
                <p className=" text-slate-100">
                  Số tập: {data.movie.episode_current}
                </p>
              )}
              {!data.movie.episode_total === "1" &&
                data.movie.status === "completed" && (
                  <p className=" text-slate-100">
                    Số tập: {data.movie.episode_current}
                  </p>
                )}
              {!data.movie.episode_total === "1" &&
                !data.movie.status === "completed" && (
                  <p className=" text-slate-100">
                    Số tập: {data.movie.episode_current}/{data.movie.total}
                  </p>
                )}
            </li>
            <li className="col-span-2">
              <p className=" text-slate-100">
                Quốc gia: {data.movie.country.map((c) => c.name + ", ")}
              </p>
            </li>
            <li className="col-span-2">
              <p className=" text-slate-100">
                Thể loại: {data.movie.category.map((c) => c.name + ", ")}
              </p>
            </li>
            <li className="col-span-2">
              <p className=" text-slate-100">
                Diễn viên: {data.movie.actor.map((a) => a + ", ")}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-slate-800 rounded my-6">
        <h3 className="text-orange-500 text-xl font-medium">Nội dung</h3>
        <div className="mt-2">
          <p className="text-slate-100">{data.movie.content}</p>
        </div>
      </div>
      <div>
        <h3 className="text-orange-500 text-xl font-medium">
          Có thể bạn sẽ thích
        </h3>
        <div>
          <NewMovies />
        </div>
      </div>
    </div>
  );
};

export default InfoDetailPage;
