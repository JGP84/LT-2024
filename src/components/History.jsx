import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const History = () => {
  const [urlThumbnail, seturlThumbnail] = useState([]);

  const { loading, historyData, clearHistory } = useHistory();
  

  useEffect(() => {
    // Update urlThumbnail whenever historyData change
    if (!loading) {
      seturlThumbnail(historyData[0].urlThumbnail);
    }
  }, [historyData, loading]);

  const handleClearHistory = () => {
    clearHistory();
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

        <button onClick={handleClearHistory}>Clear History</button>

          <img
            className="w-75"
            src={urlThumbnail}
            alt="Descripción de la imagen"
          />

         
        </>
      )}
    </div>
  );
};
