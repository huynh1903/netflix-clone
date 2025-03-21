import { useParams } from "react-router-dom";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import CarouselMovies from "@/components/Carousel";
import useFetch from "@/hooks/useFetch";


const HLSPlayer = ({ src, width = "100%", height = "100%" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      console.log("HLS is supported");
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("HLS manifest parsed");
        video.play();
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS error", event, data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("HLS natively supported");
      video.src = src;
      video.play();
    } else {
      console.error("HLS is not supported in this browser.");
    }
  }, [src]);

  return <video ref={videoRef} controls style={{ width, height }}></video>;
};



const PlayDetailPage = () => {
  const { playId } = useParams();
  const [episode, setEpisode] = useState(0);

  const{data, isPending, error} = useFetch(`https://phimapi.com/phim/${playId}`)

  if (isPending) return "Loading...";

  if (error) return `An error has occurred: ${error.message}`;

  const videoSrc = data.episodes[0]?.server_data[episode]?.link_m3u8;

  return (
    <div>
      <div className="flex justify-center">
        {videoSrc ? (
          <HLSPlayer src={videoSrc} width="90vw" height="90vh" />
        ) : (
          <p>No video available</p>
        )}
      </div>
      <div className="flex justify-center p-1">
        <h3 className="text-slate-100">{data.episodes[0]?.server_data[episode]?.filename}</h3>
      </div>
      <div className="flex justify-center mt-3">
        <div className="w-[80vw] bg-slate-800 rounded px-4 py-2">
          <h3 className="text-lg font-medium text-slate-100">Danh sách tập</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.episodes[0]?.server_data.map((el, index) => (
              <button
                className="px-2 py-1 font-medium rounded bg-orange-600 text-slate-100 hover:cursor-pointer ease-in duration-150 text-sm"
                key={index}
                onClick={()=>setEpisode(index)}
              >
                {el.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-6">
        <h3 className="text-xl text-orange-600 font-medium uppercase">Có thể bạn muốn xem</h3>
        <CarouselMovies />
      </div>
    </div>
  );
};

export default PlayDetailPage;
