// History.js
import { useEffect } from "react";
import { useHistory } from "../../HistoryContext";
import DraggableList from "./draggableList/DraggableList";
import { dummyData } from "./../../data/mock.js";

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
      // Dummy data for testing purposes
      setHistoryData(dummyData);
      setLoading(false);
    }

    // Load currentIdVideo from localStorage on component mount

    const cachedCurrentIdVideo = localStorage.getItem("currentIdVideo");
    if (cachedCurrentIdVideo) {
      setCurrentIdVideo(JSON.parse(cachedCurrentIdVideo));
      setLoading(false);
    } else {
      // Dummy data for testing purposes
      setCurrentIdVideo(dummyData[0].id);
      setLoading(false);
    }
  }, [setHistoryData, setCurrentIdVideo, setLoading]);

  const handleClearHistory = () => {
    clearHistory();
  };

  const handleRemoveItem = (id) => {
    if (historyData.length === 1) {
      clearHistory();
      return;
    }
    // Remove the item with the specified id from historyData
    const updatedData = historyData.filter((item) => item.id !== id);
    const currentIdVideo = updatedData[0].id;

    setHistoryData(updatedData);
    setCurrentIdVideo(currentIdVideo);

    // Save the updated data to localStorage
    localStorage.setItem("cachedData", JSON.stringify(updatedData));
    localStorage.setItem("currentIdVideo", JSON.stringify(currentIdVideo));
  };

  return (
    <div className="col-md-2  customStyle text-center p-3 border-end border-black">
      {loading ? (
        <>{/*  <h5>Loading...</h5> */}</>
      ) : (
        <>
          <button
            className="btn btn-outline-danger mb-4"
            onClick={handleClearHistory}
          >
            Clear History
          </button>

          <DraggableList items={historyData} onRemoveItem={handleRemoveItem} />
        </>
      )}
    </div>
  );
};
