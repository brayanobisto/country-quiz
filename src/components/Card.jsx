import { motion } from 'framer-motion'

function Card({ className, children }) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeIn' }}
      initial={{ opacity: 0 }}
      className="w-full sm:w-card"
    >
      <h1 className="mb-3 text-4xl font-bold text-center uppercase sm:text-left text-gray">
        Country Quiz
      </h1>

      <div className={`${className} bg-white rounded-xl`}>{children}</div>
    </motion.div>
  )
}

export default Card
