import { useState, useEffect } from "react";

//const API_KEY = "AIzaSyBLOPd668u0VOleB5v3BLtCanpmj8VMV3s";

//const ID_VIDEO = "nu_pCVPKzTk";

const useApi3 = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);
  const [channel, setChannel] = useState(null);
  const [durationVideo, setDurationVideo] = useState(null);

  //const urlYoutube = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${ID_VIDEO}&key=${API_KEY}`
  const urlMock = "http://localhost:3001";
  const URL = urlMock;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificar si los datos ya están en caché
        const cachedData = localStorage.getItem("cachedData");
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
        } else {
          // Realizar la solicitud a la API si los datos no están en caché
          const response = await fetch(URL);
          const result = await response.json();

          setData(result);
          setTitle(result.items[0].snippet.title);
          setChannel(result.items[0].snippet.channelTitle);
          setDurationVideo(result.items[0].contentDetails.duration);

          setLoading(false);

          // Almacenar los datos en caché
          localStorage.setItem("cachedData", JSON.stringify(result));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data, title, channel, durationVideo };
};
export default useApi3;

// videos?part=snippet&part=contentDetails&id=Mc13Z2gboEk

// https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=Mc13Z2gboEk&key='AIzaSyBLOPd668u0VOleB5v3BLtCanpmj8VMV3s'