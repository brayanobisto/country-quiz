function QuestionOption({ className, onClick, question, option }) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <span className="text-2xl font-medium">{option.letter}</span>
      {option.name}
      {question.isAnswered && option.isCorrect && (
        <span className="ml-auto text-white material-symbols-outlined">
          check_circle
        </span>
      )}
      {question.isAnswered && option.isSelected && !option.isCorrect && (
        <span className="ml-auto text-white material-symbols-outlined">
          cancel
        </span>
      )}
    </button>
  )
}

export default QuestionOption
