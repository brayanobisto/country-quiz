import { useSelector, useDispatch } from 'react-redux'
import {
  answerQuestion,
  setGameOver,
  setQuestion,
} from '../redux/slices/global'

import Card from './Card'
import QuestionCardIlustration from './QuestionCardIlustration'
import QuestionOption from './QuestionOption'

function QuestionCard() {
  const question = useSelector(state => state.question)
  const dispatch = useDispatch()

  const handleNextQuestion = () => {
    if (!question.isCorrectlyAnswered) dispatch(setGameOver())
    else dispatch(setQuestion())
  }

  return (
    <Card
      className={`relative px-8 ${
        question.isAnswered ? 'pt-16 pb-8' : 'py-16'
      }`}
    >
      <QuestionCardIlustration className="hidden sm:block absolute right-0 -top-[4.5rem]" />
      {question.type === 'capital' ? (
        <p
          className={`text-center sm:text-left mb-8 text-2xl font-bold ${
            question.isAnswered ? 'text-blue-100' : 'text-blue-200'
          }`}
        >
          {question.text}
        </p>
      ) : (
        <>
          <img
            src={question.correctAnswer.flag}
            alt={question.correctAnswer.name}
            className="block w-20 h-auto mx-auto shadow sm:mx-0 mb-7"
          />
          <p
            className={`text-center sm:text-left mb-8 text-2xl font-bold ${
              question.isAnswered ? 'text-blue-100' : 'text-blue-200'
            }`}
          >
            Which Country does this flag belong to?
          </p>
        </>
      )}

      <div className="flex flex-col gap-y-7">
        {question.options.map((option, index) => (
          <QuestionOption
            key={index}
            className={option.className}
            onClick={() => dispatch(answerQuestion(option))}
            question={question}
            option={option}
          />
        ))}

        {question.isAnswered && (
          <button
            onClick={() => handleNextQuestion()}
            type="button"
            className="self-end px-8 py-3 font-bold text-white shadow-sm bg-yellow rounded-xl shadow-yellow"
          >
            Next
          </button>
        )}
      </div>
    </Card>
  )
}

export default QuestionCard
