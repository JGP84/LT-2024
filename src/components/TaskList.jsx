import { useState, useEffect } from "react";
import { useHistory } from "../HistoryContext";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const { loading, historyData, setHistoryData, currentIdVideo } = useHistory();

  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading && Array.isArray(historyData) && historyData.length > 0) {
      const indexCurrent = historyData.findIndex(
        (video) => video.id === currentIdVideo
      );
      const tasksCurrentVideo = historyData[indexCurrent].chapters;
      setTasks(tasksCurrentVideo);
    }
  }, [loading, historyData, tasks, currentIdVideo]);

  const handleCheckboxChange = (taskId) => {
    const updatedHistoryData = [...historyData]; // Create a copy of the array

    const indexCurrent = updatedHistoryData.findIndex(
      (video) => video.id === currentIdVideo
    );

    if (indexCurrent !== -1) {
      const tasksCurrentVideo = updatedHistoryData[indexCurrent].chapters;

      const indexTask = tasksCurrentVideo.findIndex(
        (task) => task.id === taskId
      );

      if (indexTask !== -1) {
        // Create a copy of the task to update its checked property
        const updatedTask = {
          ...tasksCurrentVideo[indexTask],
          checked: !tasksCurrentVideo[indexTask].checked,
        };

        // Update the array with the new task
        tasksCurrentVideo[indexTask] = updatedTask;

        // Update the video object with the modified chapters array
        updatedHistoryData[indexCurrent].chapters = tasksCurrentVideo;

        // Set the state with the updated data
        setHistoryData(updatedHistoryData);
      }
    }
    localStorage.setItem("cachedData", JSON.stringify(updatedHistoryData));
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
  }, [tasks]); // Will run whenever the list of tasks changes

  const handleTaskClick = (taskId) => {
    setSelectedTask(taskId);
  };

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
                href={`https://www.youtube-nocookie.com/embed/${currentIdVideo}?start=${task.timeSeconds}&end=4&rel=0`}
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
            </div>
          ))}
        </>
      )}
    </div>
  );
};
