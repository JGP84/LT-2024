import { useState } from "react";
import useApi from "../hooks/useApi";
import { useHistory } from "../HistoryContext";

export const PasteUrl = () => {

  const [enteredId, setEnteredId] = useState("");

  const { title, channel, urlThumbnail, durationVideo, chapters } = useApi(enteredId);

  const { setLoading, addToHistory } = useHistory();

  const handleClick = () => {
    addToHistory({
      title: title,
      id: enteredId,
      channel: channel,
      urlThumbnail: urlThumbnail,
      durationVideo: durationVideo,
      chapters: chapters,
    });

    setLoading(false);
    setEnteredId("");
  };

  const handleChange = (e) => {
    setEnteredId(e.target.value);
  };

  return (
    <div className="row customStyle">
      *** PasteUrl ***
      <div className="input-group m-3 px-5">
        <input
          type="text"
          className="form-control"
          placeholder="Paste your url"
          value={enteredId}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="button" onClick={handleClick}>
          Create a learning list
        </button>
      </div>
    </div>
  );
};
