import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const Main = () => {
  const { loading, historyData, currentIdVideo } = useHistory();
  const [title, setTitle] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading && Array.isArray(historyData) && historyData.length > 0) {
      const indexCurrent = historyData.findIndex(
        (video) => video.id === currentIdVideo
      );

      if (indexCurrent !== -1 && historyData[indexCurrent]) {
        const title = historyData[indexCurrent].title;
        setTitle(title);

        const channel = historyData[indexCurrent].channel;
        setChannel(channel);
      } else {
        setTitle(null); // Reset title if it is not available
        setChannel(null); // Reset channel if it is not available
      }
    }
  }, [loading, historyData, currentIdVideo]);


  return (
    <>
      <div className="row customStyle p-3">
        {loading ? (
        <>
          {/* <h5>Loading...</h5> */}
          <h5>Please, paste a youtube url for create a learning list.</h5> 
        </>
      ) : (
        <>
          <h2 className="mb-3">{title}</h2>

          <iframe
            className="img-container"
            name="myiframe"
            id="myiframe"
            width="450"
            height="350"
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <h3 className="mt-3">{channel}</h3>
        </>
      )}
      </div>

      
    </>
  );
};
