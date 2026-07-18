import { useState } from "react";

function MessageInput({ onSend, disabled = false }) {
  const [input, setInput] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (input.trim() === "") return;

    try {
      const sentMessage = await onSend(input);

      if (sentMessage) setInput("");
    } catch {
      // El input se conserva para que el usuario pueda reintentar.
    }
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
        disabled={disabled}
      />

      <button
        type="submit"
        className="send-button"
        aria-label="Enviar mensaje"
        disabled={disabled}
      >
        ➤
      </button>
    </form>
  );
}

export default MessageInput;
