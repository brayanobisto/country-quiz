import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

function QuestionOption({ className, onClick, question, option }) {
  const controls = useAnimation()

  useEffect(() => {
    if (option.isSelected && !question.isCorrectlyAnswered) {
      console.log('Entro al useEffect')
      controls.start({
        x: [null, -5, 5, 0],
        transition: {
          duration: 0.1,
          repeat: 5,
          ease: 'easeIn',
        },
      })
    }
  }, [question.isCorrectlyAnswered])

  return (
    <motion.button
      animate={controls}
      onClick={onClick}
      type="button"
      className={className}
    >
      <div className="flex gap-x-11">
        <span className="text-2xl font-medium">{option.letter}</span>
        {option.name}
      </div>
      {question.isAnswered && option.isCorrect && (
        <span className="text-white material-symbols-outlined">
          check_circle
        </span>
      )}
      {question.isAnswered && option.isSelected && !option.isCorrect && (
        <span className="text-white material-symbols-outlined">cancel</span>
      )}
    </motion.button>
  )
}

export default QuestionOption
