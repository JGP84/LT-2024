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

      const title = historyData[indexCurrent].title;
      setTitle(title);

      const channel = historyData[indexCurrent].channel;
      setChannel(channel);
    }
  }, [loading, historyData, currentIdVideo]);

  const finalSpaceCharacters = [
    {
      id: "gary",
      name: "Gary Goodspeed",
      thumb: "/images/gary.png",
    },
    {
      id: "cato",
      name: "Little Cato",
      thumb: "/images/cato.png",
    },
    {
      id: "kvn",
      name: "KVN",
      thumb: "/images/kvn.png",
    },
    {
      id: "mooncake",
      name: "Mooncake",
      thumb: "/images/mooncake.png",
    },
    {
      id: "quinn",
      name: "Quinn Ergon",
      thumb: "/images/quinn.png",
    },
  ];

  return (
    <>
      <div className="row customStyle p-3">
        {loading ? (
        <>
          <h5>Loading...</h5>
        </>
      ) : (
        <>
          <h2 className="mb-3">{title}</h2>

          <iframe
            className="img-container"
            name="myiframe"
            id="myiframe"
            width="600"
            height="450"
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
