import { useState, useEffect } from 'react'
import Header from './components/Dashboard/Header'
import Dashboard from './components/Dashboard/Dashboard'
import ExpenseForm from './components/Dashboard/ExpenseForm'
import ExpenseList from './components/Dashboard/ExpenseList'
import Footer from './components/Dashboard/Footer'
import PinLock from './components/Dashboard/PinLock'
import { translations } from './i18n'

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [currency, setCurrency] = useState('₴')
  const [lang, setLang] = useState('ua')
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return new Date().toISOString().slice(0, 7)
  })
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
  })

  const t = translations[lang]

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    setExpenses([{ ...expense, id: Date.now() }, ...expenses])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id))
  }

  if (!unlocked) {
    return <PinLock onUnlock={() => setUnlocked(true)} t={t} />
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currency={currency}
          setCurrency={setCurrency}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          lang={lang}
          setLang={setLang}
          t={t}
        />
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
          <Dashboard expenses={expenses} currency={currency} selectedMonth={selectedMonth} t={t} />
          <ExpenseForm addExpense={addExpense} currency={currency} t={t} />
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} currency={currency} selectedMonth={selectedMonth} t={t} />
        </main>
        <Footer t={t} />
      </div>
    </div>
  )
}

export default App