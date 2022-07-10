import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCountries } from './redux/slices/global'
import QuestionCard from './components/QuestionCard'
import ResultsCard from './components/ResultsCard'

function App() {
  const isLoading = useSelector(state => state.isLoading)
  const isGameOver = useSelector(state => state.isGameOver)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCountries())
  }, [])

  if (isLoading) {
    return (
      <div className="text-5xl font-bold text-center text-gray animate-pulse">
        Loading...
      </div>
    )
  }

  return <>{isGameOver ? <ResultsCard /> : <QuestionCard />}</>
}

export default App
