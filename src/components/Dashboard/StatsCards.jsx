function StatsCards({ expenses, currency, selectedMonth, t }) {
  const today = new Date().toISOString().split('T')[0]

  const totalMonth = expenses
    .filter(e => e.date.startsWith(selectedMonth))
    .reduce((sum, e) => sum + Number(e.amount), 0)

  const totalToday = expenses
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + Number(e.amount), 0)

  const monthExpenses = expenses.filter(e => e.date.startsWith(selectedMonth))
  const totalCount = monthExpenses.length

  const maxExpense = monthExpenses.length
    ? Math.max(...monthExpenses.map(e => Number(e.amount)))
    : 0

  const cards = [
    { label: t.totalMonth, value: `${totalMonth} ${currency}`, icon: '📅', gradient: 'from-blue-500 to-indigo-600' },
    { label: t.totalToday, value: `${totalToday} ${currency}`, icon: '⚡', gradient: 'from-purple-500 to-pink-600' },
    { label: t.transactions, value: totalCount, icon: '🔢', gradient: 'from-green-500 to-teal-600' },
    { label: t.maxExpense, value: `${maxExpense} ${currency}`, icon: '🏆', gradient: 'from-orange-500 to-red-600' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-sm`}>
            <span className="text-lg">{card.icon}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{card.label}</div>
          <div className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{card.value}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards