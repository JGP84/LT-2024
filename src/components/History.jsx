import useApi from "../hooks/useApi";

export const History = () => {

  const { loading, urlThumbnail } = useApi();


  return (
    <div className="col-md-2  customStyle text-center">
    
    *** History ***
     
    {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
        
      
     
          <img className="w-75" src={urlThumbnail} alt="Descripción de la imagen" />
        </>
      )}


    
    
    </div>
  )
}
