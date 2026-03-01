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
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{t.expenseList}</h2>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-xl transition-colors"
        >
          {t.exportExcel}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === cat
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="date-desc">{t.dateDesc}</option>
          <option value="date-asc">{t.dateAsc}</option>
          <option value="amount-desc">{t.amountDesc}</option>
          <option value="amount-asc">{t.amountAsc}</option>
        </select>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">{t.noExpenses}</p>
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