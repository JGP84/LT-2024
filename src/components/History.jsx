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
  }, [setHistoryData, setCurrentIdVideo, setLoading ]);

  const handleClearHistory = () => {
    clearHistory();
  };

  const handleClick = (id) => {
    
    setCurrentIdVideo(id);
    localStorage.setItem("currentIdVideo", JSON.stringify(id));
  };

  return (
    <div className="col-md-2  customStyle text-center">
      *** History ***
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <button
            className="btn btn-outline-danger my-3"
            onClick={handleClearHistory}
          >
            Clear History
          </button>

          {historyData.map((item, index) => (
            <button
              key={index}
              className=" mt-3"
              onClick={() => handleClick(item.id)}
            >
              <img 
              className="w-100" 
              src={item.urlThumbnail} 
              alt="Thumbnail" 
              />

            </button>
          ))}
        </>
      )}
    </div>
  );
};
