import { useState } from "react";
import useApi from "../hooks/useApi";
import { useHistory } from "../HistoryContext";
import { getYoutubeVideoId, addTimeEndProperty, storeData } from "../utils";

export const PasteUrl = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { data } = useApi(getYoutubeVideoId(youtubeUrl));

  const {
    setLoading,
    addToHistory,
    historyData,
    setCurrentIdVideo,
  } = useHistory();

  const handleClick = () => {
    if (!youtubeUrl.trim()) {
      return;
    }

    const videoId = getYoutubeVideoId(youtubeUrl);

    // Check if the video already exists in the history
    const videoExistsInHistory = historyData.some(video => video.id === videoId);
  
    if (videoExistsInHistory) {
      console.log("Video already exists in history");
      return;
    }
    
    const videoAdd = {
      title: data?.title,
      id: videoId,
      channel: data?.channel,
      urlThumbnail: data?.urlThumbnail,
      durationVideo: data?.durationVideo,
      chapters: data?.chapters ? addTimeEndProperty(data.chapters) : [],
    };

    addToHistory(videoAdd);
    setCurrentIdVideo(videoId);

    setLoading(false);
    setYoutubeUrl("");

    storeData("cachedData", [...historyData, videoAdd]);
    storeData("currentIdVideo", videoId);
  };

  const handleChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  return (
    <div className="row customStyle p-3">
      <div className="input-group">
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