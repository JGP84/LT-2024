/* import { useState } from "react"; */
import useApi from "../hooks/useApi";

export const TaskList = () => {
  const { loading, chapters /*data,  durationVideo */ } = useApi();

  return (
    <div className="col-md-4  customStyle">
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          *** TaskList ***
          <h3>Learning Tasks:</h3>
          {chapters.map((chapter) => (
            <div className="form-check" key={chapter.id}>
              <input
                className="form-check-input"
                //[ngClass]="{ 'custom-checked': task.checked }"
                type="checkbox"
                value="5"
                id={chapter.id}
                //(change)="handleChecked(task.id)"
              />
              <a
                href="https://www.youtube-nocookie.com/embed/Mc13Z2gboEk?start={{
                  task.timeSeconds
                }}&end=4&rel=0"
                target="myiframe"
                id="'anchor' + task.id"
              >
                <label>{chapter.title}</label>
              </a>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
