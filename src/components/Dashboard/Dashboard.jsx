import StatsCards from './StatsCards'
import Chart from './Chart'

function Dashboard({ expenses, currency, selectedMonth, t }) {
  return (
    <div className="space-y-6">
      <StatsCards expenses={expenses} currency={currency} selectedMonth={selectedMonth} t={t} />
      <Chart expenses={expenses} currency={currency} selectedMonth={selectedMonth} t={t} />
    </div>
  )
}

export default Dashboard