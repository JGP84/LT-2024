import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const Main = () => {
 
  const { loading, historyData, currentIdVideo } = useHistory();
  const [title, setTitle] = useState(null);
  const [channel, setChannel] = useState(null);


  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading && Array.isArray(historyData) && historyData.length > 0) {
      const indexCurrent = historyData.findIndex( video => video.id === currentIdVideo )

      const title = historyData[indexCurrent].title;
      setTitle(title)
     
      const channel = historyData[indexCurrent].channel;
      setChannel(channel)
    }
  }, [loading, historyData, currentIdVideo]);


  return (
    <div className="row customStyle">

      *** Main ***

      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h1>{ title }</h1>
          <h2>{ channel }</h2>
         
          <iframe name="myiframe" id="myiframe" width="600" height="450" frameBorder="0" allowFullScreen></iframe>

          
        </>
      )}
    </div>
  );
};
