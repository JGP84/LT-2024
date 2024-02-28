import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { getChapters } from "../utils";

const useApi = (ID_VIDEO) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [title, setTitle] = useState(null);
  const [channel, setChannel] = useState(null);
  const [durationVideo, setDurationVideo] = useState(null);
  const [urlThumbnail, setUrlThumbnail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("cachedData");

        if (cachedData) {
          const cachedDataArray = JSON.parse(cachedData);

          if (
            Array.isArray(cachedDataArray) &&
            cachedDataArray.length > 0 &&
            cachedDataArray[0].id === ID_VIDEO
          ) {
            setData(cachedDataArray);
            setChapters(cachedDataArray[0].chapters);
            setTitle(cachedDataArray[0].title);
            setChannel(cachedDataArray[0].channel);
            setDurationVideo(cachedDataArray[0].durationVideo);
            setUrlThumbnail(cachedDataArray[0].urlThumbnail);

            setLoading(false);

            console.log("Data retrieved from the cache");
            return;
          }
        }

        const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${ID_VIDEO}&key=${apiKey}`;
        const response = await fetch(urlYoutube);
        const result = await response.json();

        if (result && result.items && result.items[0]) {
          setData(result);
          setChapters(getChapters(uuid, result));
          setTitle(result.items[0].snippet.title);
          setChannel(result.items[0].snippet.channelTitle);
          setDurationVideo(result.items[0].contentDetails.duration);
          setUrlThumbnail(result.items[0].snippet.thumbnails.medium.url);
          setLoading(false);
        }

        console.log("API call made");
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [ID_VIDEO, apiKey]);

  return {
    loading,
    data,
    setChapters,
    chapters,
    title,
    channel,
    durationVideo,
    urlThumbnail,
  };
};

export default useApi;