import { useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const History = () => {
  const {
    loading,
    historyData,
    setHistoryData,
    clearHistory,
    setLoading,
    setCurrentIdVideo,
    setSimulateClick,
  } = useHistory();

  useEffect(() => {
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setHistoryData(JSON.parse(cachedData));
      //setLoading(false);
    }

    const cachedCurrentIdVideo = localStorage.getItem("currentIdVideo");
    if (cachedCurrentIdVideo) {
      setCurrentIdVideo(JSON.parse(cachedCurrentIdVideo));
      setLoading(false);
    }
  }, [setHistoryData, setCurrentIdVideo, setLoading]);

  const handleClearHistory = () => {
    clearHistory();
  };

  const handleClick = (id) => {
    setCurrentIdVideo(id);
    localStorage.setItem("currentIdVideo", JSON.stringify(id));

    setSimulateClick(true);
  };

  return (
    <div className="col-md-2  customStyle text-center p-3 border-end border-black">
      {loading ? (
        <>
          <h5>Loading...</h5>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-danger"
            onClick={handleClearHistory}
          >
            Clear History
          </button>

          {historyData.map((item, index) => (
            <button
              key={index}
              className=" mt-3 img-container"
              onClick={() => handleClick(item.id)}
            >
              <img className="w-100 " src={item.urlThumbnail} alt="Thumbnail" />
            </button>
          ))}
        </>
      )}
    </div>
  );
};
