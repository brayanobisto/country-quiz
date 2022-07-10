export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getQuestionType = options => {
  return options[generateRandomNumber(0, options.length - 1)]
}

export const getQuestionOptions = countries => {
  const countriesCopy = JSON.parse(JSON.stringify(countries))
  const optionsLetters = ['A', 'B', 'C', 'D']
  const correctAnswerIndex = generateRandomNumber(0, 3)
  const options = []

  for (let i = 0; i < 4; i++) {
    const randomIndex = generateRandomNumber(0, countriesCopy.length - 1)
    const [randomCountry] = countriesCopy.splice(randomIndex, 1)

    randomCountry.letter = optionsLetters[i]
    randomCountry.isCorrect = i === correctAnswerIndex
    randomCountry.className = 'answer'
    randomCountry.isSelected = false
    options.push(randomCountry)
  }

  return [options, options[correctAnswerIndex]]
}

export const getCorrectAnswer = options => {
  return options[generateRandomNumber(0, options.length - 1)]
}

export const generateQuestion = countries => {
  const questionType = getQuestionType(['capital', 'flag'])
  const question = {}
  const [options, correctAnswer] = getQuestionOptions(countries)

  question.type = questionType
  question.options = options
  question.correctAnswer = correctAnswer
  question.isAnswered = false
  question.isCorrectlyAnswered = true
  question.text =
    questionType === 'capital'
      ? correctAnswer.capital === "Doesn't have capital"
        ? "Which country doesn't have capital?"
        : `${correctAnswer.capital} is the capital of`
      : 'Which country does this flag belong to?'

  return question
}
