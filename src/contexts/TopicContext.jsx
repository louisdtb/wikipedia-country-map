import { createContext, useContext, useState } from "react";

const TopicContext = createContext({
  topic: "history",
  setTopic: () => null,
});

export const TopicProvider = ({ children }) => {
  const [topic, setTopic] = useState("history");

  return (
    <TopicContext.Provider value={{ topic, setTopic }}>
      {children}
    </TopicContext.Provider>
  );
};

export const useTopic = () => useContext(TopicContext);
