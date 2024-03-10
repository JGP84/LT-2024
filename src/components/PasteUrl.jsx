import { useState } from "react";
import useApi from "../hooks/useApi";
import { useHistory } from "../HistoryContext";
import { getYoutubeVideoId, addTimeEndProperty, storeData } from "../utils";

export const PasteUrl = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const { title, channel, urlThumbnail, durationVideo, chapters } = useApi(
    getYoutubeVideoId(youtubeUrl)
  );

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
    const videoAdd = {
      title: title,
      id: videoId,
      channel: channel,
      urlThumbnail: urlThumbnail,
      durationVideo: durationVideo,
      chapters: chapters ? addTimeEndProperty(chapters) : [],
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