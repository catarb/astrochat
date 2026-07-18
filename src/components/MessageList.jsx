import { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";

function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {(Array.isArray(messages) ? messages : []).map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} />
    </>
  );
}

export default MessageList;
