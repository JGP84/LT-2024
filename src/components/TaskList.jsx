import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";
import { storeData } from "../utils";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const { loading, historyData, setHistoryData, currentIdVideo } = useHistory();

  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading && historyData.length > 0) {
      const currentVideo = historyData.find(
        (video) => video.id === currentIdVideo
      );
      if (currentVideo && currentVideo.chapters) {
        setTasks(currentVideo.chapters);
      } else {
        setTasks([]); // Reset tasks if chapters are not available
      }
    }
  }, [loading, historyData, currentIdVideo]);

  const handleCheckboxChange = (taskId) => {
    const updatedHistoryData = historyData.map((video) => {
      if (video.id === currentIdVideo) {
        const updatedChapters = video.chapters.map((chapter) => {
          if (chapter.id === taskId) {
            return { ...chapter, checked: !chapter.checked };
          }
          return chapter;
        });
        return { ...video, chapters: updatedChapters };
      }
      return video;
    });

    setHistoryData(updatedHistoryData);
    storeData("cachedData", updatedHistoryData);
  };

  useEffect(() => {
    // Simulate a click on the label of the first unchecked task (checked: false)
    const firstUncheckedTask = tasks.find((task) => !task.checked);

    if (firstUncheckedTask) {
      const labelElement = document.getElementById(
        `label${firstUncheckedTask.id}`
      );
      if (labelElement) {
        labelElement.click();
      }
    }
  }, [tasks]);

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

  return (
    <div className="col-md-3   p-3 border-start border-black">
      {loading ? (
        <>{/* <h5>Loading...</h5> */}</>
      ) : (
        <>
          <h3 className="mb-3">Learning Tasks:</h3>
          {tasks.map((task) => (
            <div className="form-check" key={task.id}>
              <input
                className={
                  task.checked
                    ? "form-check-input checked-input-style"
                    : "form-check-input"
                }
                type="checkbox"
                value="5"
                checked={task.checked}
                onChange={() => handleCheckboxChange(task.id)}
                id={task.id}
              />

              <a
                href={`https://www.youtube-nocookie.com/embed/${currentIdVideo}?start=${task.timeSeconds}&end=${task.timeEnd}&rel=0`}
                target="myiframe"
                id={`anchor${task.id}$`}
              >
                <div
                  className={selectedTask === task.id ? "task-container" : ""}
                  id={`div${task.id}`}
                >
                  <label
                    className={task.checked ? "checked-label-style" : ""}
                    id={`label${task.id}`}
                    onClick={() => handleTaskClick(task.id)}
                  >
                    {task.title}
                  </label>
                </div>
              </a>
              <hr></hr>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
