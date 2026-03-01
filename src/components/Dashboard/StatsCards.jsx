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
    { label: t.totalMonth, value: `${totalMonth} ${currency}` },
    { label: t.totalToday, value: `${totalToday} ${currency}` },
    { label: t.transactions, value: totalCount },
    { label: t.maxExpense, value: `${maxExpense} ${currency}` },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-500 dark:text-gray-400">{card.label}</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white mt-1">{card.value}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards