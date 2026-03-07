function MessageItem({ message }) {
  const isUser = message.sender === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      <div className={`message-bubble ${isUser ? "user" : "bot"}`}>
        {message.typing ? <TypingDots /> : message.text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="typing-dots">
      <span className="typing-dot dot-1"></span>
      <span className="typing-dot dot-2"></span>
      <span className="typing-dot dot-3"></span>
    </div>
  );
}

export default MessageItem;