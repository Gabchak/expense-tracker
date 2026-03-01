import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

function Chart({ expenses, selectedMonth, t }) {
  const daysInMonth = new Date(
    selectedMonth.split('-')[0],
    selectedMonth.split('-')[1],
    0
  ).getDate()

  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const day = String(i + 1).padStart(2, '0')
    const date = `${selectedMonth}-${day}`
    return {
      date: `${i + 1}`,
      сума: expenses
        .filter(e => e.date === date)
        .reduce((sum, e) => sum + Number(e.amount), 0)
    }
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 {t.chart}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="сума" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart