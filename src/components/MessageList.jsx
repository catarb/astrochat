import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
      <div ref={bottomRef} />
    </>
  );
}

export default MessageList;