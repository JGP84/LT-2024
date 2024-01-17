import  { createContext, useContext, useState } from "react";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);

  const [historyData, setHistoryData] = useState([]);



 

  const addToHistory = (newItem) => {
    setHistoryData((prevHistory) => [...prevHistory, newItem]);
  };

  const clearHistory = () => {
    setLoading(true)
    setHistoryData([])
    localStorage.removeItem("cachedData")
  };

  return (
    <HistoryContext.Provider value={{ loading, setLoading ,historyData, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {

  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
};
