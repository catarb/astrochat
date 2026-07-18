function MessageItem({ message }) {
  const isUser = message.role === "user";
  const messageTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      <div className={`message-bubble ${isUser ? "user" : "bot"}`}>
        <span>{message.content}</span>
        <span className="message-time">{messageTime}</span>
      </div>
    </div>
  );
}

export default MessageItem;
