import { createSlice } from '@reduxjs/toolkit'
import { generateQuestion } from '../../../utils'

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isLoading: true,
    countries: [],
    question: {
      type: '',
      text: '',
      options: [],
      correctAnswer: {},
      isAnswered: false,
      isCorrectlyAnswered: true,
    },
    score: 0,
    isGameOver: false,
  },
  reducers: {
    startLoading: state => {
      state.isLoading = true
    },
    endLoading: state => {
      state.isLoading = false
    },
    setCountries: (state, action) => {
      state.countries = action.payload
      state.isLoading = false
    },
    setQuestion: state => {
      state.question = generateQuestion(state.countries)
    },
    answerQuestion: (state, action) => {
      const { isCorrect, letter } = action.payload

      if (state.question.isAnswered) return

      state.question.isAnswered = true
      if (isCorrect) state.score++
      if (!isCorrect) state.question.isCorrectlyAnswered = false

      state.question.options.forEach(option => {
        option.isCorrect && (option.className = 'answer correct')
        !option.isCorrect &&
          option.letter === letter &&
          (option.className = 'answer incorrect')
        option.isSelected = option.letter === letter
      })
    },
    setGameOver: state => {
      state.isGameOver = true
    },
    resetQuiz: state => {
      state.isGameOver = false
      state.score = 0
      state.question = generateQuestion(state.countries)
    },
  },
})

export const {
  setCountries,
  setQuestion,
  answerQuestion,
  setGameOver,
  resetQuiz,
} = globalSlice.actions
