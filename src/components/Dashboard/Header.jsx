function Header({ darkMode, setDarkMode, currency, setCurrency, selectedMonth, setSelectedMonth, lang, setLang, t }) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 flex flex-wrap justify-between items-center gap-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">💸 {t.title}</h1>
      <div className="flex items-center gap-4 flex-wrap">
        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
        />
        <div className="flex gap-1">
          {['ua', 'ru', 'en'].map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                lang === l
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {['₴', '$', '€'].map(c => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currency === c
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-2xl hover:scale-110 transition-transform"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header