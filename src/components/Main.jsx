import { useHistory } from "../HistoryContext";

export const Main = () => {
 
  const { loading, historyData } = useHistory();
  return (
    <div className="row customStyle">

      *** Main ***

      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h3>{ historyData.title }</h3>
          <h5>{ historyData.channel }</h5>
          <iframe name="myiframe" id="myiframe" width="600" height="350" frameBorder="0" allowFullScreen></iframe>
        </>
      )}
    </div>
  );
};
