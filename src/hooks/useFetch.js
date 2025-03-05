import { useQuery } from "@tanstack/react-query";

const useFetch = (url) => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("network response not ok");
        }
        const resData = response.json();
        return resData
      } catch (error) {
        console.log(error);
        
      }
    };

    return useQuery({
        queryKey: [url],
        queryFn: fetchData
    })
  
};

export default useFetch;
