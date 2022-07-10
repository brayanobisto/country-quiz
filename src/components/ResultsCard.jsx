import { useSelector, useDispatch } from 'react-redux'
import { resetQuiz } from '../redux/slices/global'

import Card from './Card'
import ResultCardIlustration from './ResultCardIlustration'

function ResultsCard() {
  const score = useSelector(state => state.score)
  const dispatch = useDispatch()

  return (
    <Card className="py-12 pb-8">
      <div className="flex flex-col items-center">
        <ResultCardIlustration className="mb-20" />
        <h1 className="mb-4 text-5xl font-bold text-center text-blue-200">
          Results
        </h1>
        <p className="mb-20 text-blue-200 ">
          You got{' '}
          <span className="text-4xl font-bold text-green-100">{score}</span>{' '}
          correct answers
        </p>
        <button
          onClick={() => dispatch(resetQuiz())}
          type="button"
          className="px-16 py-4 text-lg font-semibold text-blue-200 border-2 border-blue-200 rounded-xl"
        >
          Try again
        </button>
      </div>
    </Card>
  )
}

export default ResultsCard
