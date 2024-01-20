import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const { loading, historyData, currentIdVideo } = useHistory();

  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading && Array.isArray(historyData) && historyData.length > 0) {
      const indexCurrent = historyData.findIndex( video => video.id === currentIdVideo )
      const newTasks = historyData[indexCurrent].chapters;
      setTasks(newTasks);
      
    }
  }, [loading, historyData, tasks, currentIdVideo]);



  return (
    <div className="col-md-3  customStyle">
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          *** TaskList ***
          <h3>Learning Tasks:</h3>
          {tasks.map((task) => (
            <div className="form-check" key={task.id}>
            <input
                className="form-check-input"
                type="checkbox"
                value="5"
                id={task.id}
              />
              <a
                href={`https://www.youtube-nocookie.com/embed/${currentIdVideo}?start=${task.timeSeconds}&end=4&rel=0`}
                target="myiframe"
                id={`anchor${task.id}$`}
              >
                <label>{task.title}</label>
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
