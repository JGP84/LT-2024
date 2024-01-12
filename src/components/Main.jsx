import useApi from "../hooks/useApi";

export const Main = () => {
  const { loading, title, channel /*data,  durationVideo */ } = useApi();

  return (
    <div className="row customStyle">

      *** Main ***

      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <h5>{channel}</h5>
          <iframe name="myiframe" id="myiframe" width="600" height="350" frameBorder="0" allowfullscreen></iframe>
        </>
      )}
    </div>
  );
};
