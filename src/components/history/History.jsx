// History.js
import { useEffect } from "react";
import { useHistory } from "../../HistoryContext";
import DraggableList from "./draggableList/DraggableList";
import { dummyData } from "./../../data/mock.js";
import { storeData } from "../../utils";

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
    // Load data from localStorage on component mount
    const cachedData = localStorage.getItem("cachedData");
    if (cachedData) {
      setHistoryData(JSON.parse(cachedData));
    } else {
      setHistoryData(dummyData);
      setLoading(false);
    }

    // Load currentIdVideo from localStorage on component mount
    const cachedCurrentIdVideo = localStorage.getItem("currentIdVideo");
    if (cachedCurrentIdVideo) {
      setCurrentIdVideo(JSON.parse(cachedCurrentIdVideo));
      setLoading(false);
    } else {
      setCurrentIdVideo(dummyData[0].id);
      setLoading(false);
    }
  }, [setHistoryData, setCurrentIdVideo, setLoading]);

  const handleRemoveItem = (id) => {
    if (historyData.length === 1) {
      clearHistory();
      return;
    }

    const updatedData = historyData.filter((item) => item.id !== id);
    const currentIdVideo = updatedData[0].id;

    setHistoryData(updatedData);
    setCurrentIdVideo(currentIdVideo);

    storeData("cachedData", updatedData);
    storeData("currentIdVideo", currentIdVideo);
  };

  return (
    <div className="col-md-2   text-center p-3 border-end border-black">
      {loading ? (
        <>{/*  <h5>Loading...</h5> */}</>
      ) : (
        <>
          <button
            className="btn btn-outline-danger mb-4"
            onClick={clearHistory}
          >
            Clear History
          </button>

          <DraggableList items={historyData} onRemoveItem={handleRemoveItem} />
        </>
      )}
    </div>
  );
};
