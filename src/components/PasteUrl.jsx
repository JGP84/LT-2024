import { useState } from "react";
import useApi from "../hooks/useApi";
import { useHistory } from "../HistoryContext";
import { getYoutubeVideoId, addTimeEndProperty } from "../utils";

export const PasteUrl = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { title, channel, urlThumbnail, durationVideo, chapters } = useApi(
    getYoutubeVideoId(youtubeUrl)
  );

  const {
    setLoading,
    addToHistory,
    historyData,
    currentIdVideo,
    setCurrentIdVideo,
  } = useHistory();

  const handleClick = () => {
    if (!youtubeUrl.trim()) {
      return;
    } else {
      const videoId = getYoutubeVideoId(youtubeUrl);
      const videoAdd = {
        title: title,
        id: videoId,
        channel: channel,
        urlThumbnail: urlThumbnail,
        durationVideo: durationVideo,
        chapters: addTimeEndProperty(chapters),
      };

      console.log("videoAdd", videoAdd);

      addToHistory(videoAdd);
      console.log("currentIdVideo before", currentIdVideo);
      setCurrentIdVideo(videoId);
      console.log("currentIdVideo after", currentIdVideo);

      setLoading(false);
      setYoutubeUrl("");

      // Almacenar los datos en caché
      localStorage.setItem(
        "cachedData",
        JSON.stringify([...historyData, videoAdd])
      );
      localStorage.setItem("currentIdVideo", JSON.stringify(videoId));
    }
  };

  const handleChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  return (
    <div className="row customStyle">
      <div className="input-group m-3 px-5">
        <input
          type="text"
          className="form-control"
          placeholder="Paste your url"
          value={youtubeUrl}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="button" onClick={handleClick}>
          Create a learning list
        </button>
      </div>
    </div>
  );
};
