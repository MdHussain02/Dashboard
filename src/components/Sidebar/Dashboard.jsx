import React from 'react';
import FinanceChart from '../Charts/FinanceChart';
import FinancePieChart from '../Charts/FinancePieChart';
import YearlyIncomeBarChart from '../Charts/YearlyIncomeBarChart';

function Dashboard() {
  return (
    <div className="container">
      {/* Row for all charts */}
      <div className="row gy-4">
        {/* FinanceChart: Large size */}
        <div className="col-lg-9 col-md-12">
          <FinanceChart />
        </div>
        {/* FinancePieChart: Small size */}
        <div className="col-lg-3 col-md-6">
          <FinancePieChart />
        </div>
        {/* YearlyIncomeBarChart: Medium size */}
        <div className="col-lg-7 col-md-6">
          <YearlyIncomeBarChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
