import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const Main = () => {
  const { loading, setLoading, historyData, currentIdVideo } = useHistory();
  const [videoData, setVideoData] = useState({ title: null, channel: null });

  const loadData = () => {
    const cachedData = localStorage.getItem("cachedData");

    if (cachedData === "[]") {
      setLoading(true);
    }

    if (!loading && historyData.length > 0) {
      const indexCurrent = historyData.findIndex(
        (video) => video.id === currentIdVideo
      );

      if (indexCurrent !== -1 && historyData[indexCurrent]) {
        setVideoData({
          title: historyData[indexCurrent].title,
          channel: historyData[indexCurrent].channel,
        });
      } else {
        setVideoData({ title: null, channel: null }); // Reset title and channel if they are not available
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadData, [loading, historyData, currentIdVideo]);

  return (
    <>
      <div className="row  p-3">
        {loading ? (
          <>
            {/* <h5>Loading...</h5> */}
            <h5>Please, paste a youtube url for create a learning list.</h5>
          </>
        ) : (
          <>
            <h2 className="mb-3">{videoData.title}</h2>

            <iframe
              className="img-container"
              name="myiframe"
              id="myiframe"
              width="450"
              height="350"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <h2 className="mt-3">{videoData.channel}</h2>
          </>
        )}
      </div>
    </>
  );
};