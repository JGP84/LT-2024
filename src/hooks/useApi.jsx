import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { getChapters, storeData } from "../utils";

const useApi = (ID_VIDEO) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ID_VIDEO === null) {
      return;
    }

    const fetchData = async () => {
      try {
        
        const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${ID_VIDEO}&key=${apiKey}`;
        const response = await fetch(urlYoutube);
        const result = await response.json();

        if (result && result.items && result.items[0]) {
          const videoData = {
            data: result,
            chapters: getChapters(uuid, result),
            title: result.items[0].snippet.title,
            channel: result.items[0].snippet.channelTitle,
            durationVideo: result.items[0].contentDetails.duration,
            urlThumbnail: result.items[0].snippet.thumbnails.medium.url,
          };

          setData(videoData);
          
          storeData("cachedData", videoData);

          setLoading(false);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [ID_VIDEO, apiKey]);

  return {
    loading,
    data,
    error,
  };
};

export default useApi;