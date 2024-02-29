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
    if (ID_VIDEO === null) {
      /*  console.log("ID_VIDEO is null"); */
      return;
    }

    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem("cachedData");
        const cachedDataArray = cachedData ? JSON.parse(cachedData) : [];

        const videoExists = cachedDataArray.some(
          (video) => video.id === ID_VIDEO
        );

        if (videoExists) {
          console.log("Video already exists");
          return;
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
