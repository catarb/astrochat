function MessageInput({ value, onChange, onSend, disabled = false }) {
  async function handleSubmit(e) {
    e.preventDefault();

    if (value.trim() === "") return;

    try {
      await onSend(value);
    } catch {
      // El flujo superior restaura el borrador y muestra el error.
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
