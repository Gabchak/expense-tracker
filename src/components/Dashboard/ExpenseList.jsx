import { useState } from 'react'
import * as XLSX from 'xlsx'
import ExpenseItem from './ExpenseItem'

function ExpenseList({ expenses, deleteExpense, currency, selectedMonth, t }) {
  const [filter, setFilter] = useState(t.all)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('date-desc')

  const categories = [t.all, ...t.categories]

  const filtered = expenses
    .filter(e => e.date.startsWith(selectedMonth))
    .filter(e => filter === t.all || e.category === filter)
    .filter(e => e.comment.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'date-desc') return new Date(b.date) - new Date(a.date)
      if (sort === 'date-asc') return new Date(a.date) - new Date(b.date)
      if (sort === 'amount-desc') return Number(b.amount) - Number(a.amount)
      if (sort === 'amount-asc') return Number(a.amount) - Number(b.amount)
      return 0
    })

  const exportToExcel = () => {
    const data = filtered.map(e => ({
      [t.date]: e.date,
      [t.category]: e.category,
      [t.comment]: e.comment,
      [t.amount]: `${e.amount} ${currency}`,
    }))
    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, t.expenseList)
    XLSX.writeFile(wb, 'expenses.xlsx')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{t.expenseList}</h2>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          📊 {t.exportExcel}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <option value="date-desc">{t.dateDesc}</option>
          <option value="date-asc">{t.dateAsc}</option>
          <option value="amount-desc">{t.amountDesc}</option>
          <option value="amount-asc">{t.amountAsc}</option>
        </select>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🫙</div>
            <p className="text-gray-400 font-medium">{t.noExpenses}</p>
          </div>
        ) : (
          filtered.map(expense => (
            <ExpenseItem key={expense.id} expense={expense} deleteExpense={deleteExpense} currency={currency} />
          ))
        )}
      </div>
    </div>
  )
}

export default ExpenseList