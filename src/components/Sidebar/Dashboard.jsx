import React from 'react'
import FinanceChart from '../Charts/FinanceChart'
import FinancePieChart from '../Charts/FinancePieChart'

function Dashboard() {
  return (
    <div className='d-flex'>
      <FinanceChart/>
      <FinancePieChart/>
    </div>
  )
}
export default Dashboard