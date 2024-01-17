import { useState, useEffect } from "react";

import { useHistory } from "../HistoryContext";

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const { loading, historyData, enteredId } = useHistory();

  //const ID_VIDEO = enteredId;

  useEffect(() => {
    // Update tasks whenever chapters change
    if (!loading) {
      setTasks(historyData[0].chapters);
    }
  }, [historyData, loading]);

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
                //[ngClass]="{ 'custom-checked': task.checked }"
                type="checkbox"
                value="5"
                id={task.id}
                //(change)="handleChecked(task.id)"
              />
              <a
                href={`https://www.youtube-nocookie.com/embed/Mc13Z2gboEk?start=${task.timeSeconds}&end=4&rel=0`}
                target="myiframe"
                id={`anchor${task.id}`}
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
