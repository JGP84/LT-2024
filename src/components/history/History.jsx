// History.js
import { useEffect } from "react";
import { useHistory } from "../../HistoryContext";
import DraggableList from "./draggableList/DraggableList";

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

  const handleRemoveItem = (id) => {
    // Remove the item with the specified id from historyData
    const updatedData = historyData.filter((item) => item.id !== id);
    setHistoryData(updatedData);

    // Save the updated data to localStorage
    localStorage.setItem("cachedData", JSON.stringify(updatedData));
  };

  return (
    <div className="col-md-2  customStyle text-center p-3 border-end border-black">
      {loading ? (
        <>
         {/*  <h5>Loading...</h5> */}
        </>
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
