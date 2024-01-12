/* import { useState } from "react"; */
import useApi from "../hooks/useApi";


export const TaskList = () => {
  const { loading, chapters /*data,  durationVideo */ } = useApi();
  console.log(
    /* 'durationVideo', durationVideo, */ /* "data",
    data,
    "chapters",
    chapters */
  );

  

  return (
    <>
      <div className="col-md-4  customStyle">
        {loading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            TaskList
            <h2>Learning Tasks:</h2>
           
             <ul>
              {chapters.map((chapter) => (
                <li key={chapter.id}>{chapter.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
