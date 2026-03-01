import { useState } from 'react'

function ExpenseForm({ addExpense, currency, t }) {
  const [form, setForm] = useState({
    amount: '',
    category: t.categories[0],
    date: new Date().toISOString().split('T')[0],
    comment: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount) return
    addExpense(form)
    setForm({
      amount: '',
      category: t.categories[0],
      date: new Date().toISOString().split('T')[0],
      comment: '',
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t.addExpense}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="number"
          name="amount"
          placeholder={t.amount}
          value={form.amount}
          onChange={handleChange}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {t.categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <input
          type="text"
          name="comment"
          placeholder={t.comment}
          value={form.comment}
          onChange={handleChange}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
        />
        <button
          type="submit"
          className="col-span-2 md:col-span-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl py-2 transition-colors"
        >
          {t.add}
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm