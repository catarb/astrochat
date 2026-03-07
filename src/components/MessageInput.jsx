import { useState } from "react";

function MessageInput({ onSend }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    onSend(input);
    setInput("");
  }

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <button type="button" className="icon-button" aria-label="Adjuntar">
        +
      </button>

      <input
        type="text"
        placeholder="Escribí un mensaje"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="message-input"
      />

      <button type="submit" className="send-button" aria-label="Enviar mensaje">
        ➤
      </button>
    </form>
  );
}

export default MessageInput;