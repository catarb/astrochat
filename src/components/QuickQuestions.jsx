function QuickQuestions({ onAsk }) {
  const questions = [
    "¿En qué galaxia estás?",
    "¿A qué distancia estás?",
    "¿Qué tipo de objeto sos?",
    "¿Cuándo explotaste?",
  ];

  return (
    <div className="quick-questions">
      {questions.map((question) => (
        <button
          key={question}
          type="button"
          className="quick-question-btn"
          onClick={() => onAsk(question)}
        >
          {question}
        </button>
      ))}
    </div>
  );
}

export default QuickQuestions;