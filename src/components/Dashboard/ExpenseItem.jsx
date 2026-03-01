function ExpenseItem({ expense, deleteExpense, currency }) {
  return (
    <div className="animate-fadeIn flex justify-between items-center bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="text-sm text-gray-500 dark:text-gray-400">{expense.date}</div>
      <div className="text-sm font-medium text-gray-800 dark:text-white">{expense.category}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{expense.comment}</div>
      <div className="text-sm font-bold text-indigo-500">{expense.amount} {currency}</div>
      <button
        onClick={() => deleteExpense(expense.id)}
        className="text-red-400 hover:text-red-600 hover:scale-110 transition-all duration-200 text-lg"
      >
        ✕
      </button>
    </div>
  )
}

export default ExpenseItem