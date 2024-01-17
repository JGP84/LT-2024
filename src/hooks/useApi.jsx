import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { getChapters } from "../utils";






const useApi = (ID_VIDEO) => {


  const API_KEY = "AIzaSyBLOPd668u0VOleB5v3BLtCanpmj8VMV3s";
  //const ID_VIDEO = "Mc13Z2gboEk";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [title, setTitle] = useState(null);
  const [channel, setChannel] = useState(null);
  const [durationVideo, setDurationVideo] = useState(null);
  const [urlThumbnail, setUrlThumbnail] = useState(null);

  const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${ID_VIDEO}&key=${API_KEY}`
  //const urlMock = "http://localhost:3001/items";
  

  useEffect(() => {

    const URL = urlYoutube;

    
    const fetchData = async () => {
      try {
        // Verificar si los datos ya están en caché
        const cachedData = localStorage.getItem("cachedData");
        if (cachedData) {
          
            setData(JSON.parse(cachedData));
            setChapters(getChapters(uuid, JSON.parse(cachedData)))
            setTitle(JSON.parse(cachedData).items[0].snippet.title);
            setChannel(JSON.parse(cachedData).items[0].snippet.channelTitle);
            setDurationVideo(JSON.parse(cachedData).items[0].contentDetails.duration);
            setUrlThumbnail(
              JSON.parse(cachedData).items[0].snippet.thumbnails.medium.url
            );

            setLoading(false);
         
        } else {
          // Realizar la solicitud a la API si los datos no están en caché
          const response = await fetch(URL);
          const result = await response.json();

          setData(result);
          if (result) {
            setChapters(getChapters(uuid, result));

            setTitle(result.items[0].snippet.title);
            setChannel(result.items[0].snippet.channelTitle);
            setDurationVideo(result.items[0].contentDetails.duration);
            setUrlThumbnail(result.items[0].snippet.thumbnails.medium.url);
            setLoading(false);
          }

          // Almacenar los datos en caché
          localStorage.setItem("cachedData", JSON.stringify(result));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [urlYoutube]);

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

// videos?part=snippet&part=contentDetails&id=Mc13Z2gboEk

// https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=Mc13Z2gboEk&key=AIzaSyBLOPd668u0VOleB5v3BLtCanpmj8VMV3s
