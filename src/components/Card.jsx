function Card({ className, children }) {
  return (
    <div className="w-full sm:w-card">
      <h1 className="mb-3 text-4xl font-bold text-center uppercase sm:text-left text-gray">
        Country Quiz
      </h1>

      <div className={`${className} bg-white rounded-xl`}>{children}</div>
    </div>
  )
}

export default Card
