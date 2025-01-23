import React from "react";
import useFinance from "../hooks/useFinance"; // Import the custom hook

const FinanceForm = () => {
  const {
    financeData,
    message,
    months,
    handleInputChange,
    handleAddRow,
    handleSaveRow,
    handleDeleteRow,
    error,
  } = useFinance(); // Use the custom hook

  if (error) {
    return <p>Error loading data.</p>;
  }

  if (!financeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5">
      <h2 className="text-center mb-4">Finance Table</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Month</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Savings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {financeData.map((row, index) => (
            <tr key={index}>
              <td>
                {/* Month selection dropdown */}
                <select
                  className="form-control"
                  value={row.month}
                  onChange={(e) => handleInputChange(index, "month", e.target.value)}
                  disabled={!row.isNew} // Disable month selection if the row is not new
                >
                  <option value="">Select Month</option>
                  {months.map((month, i) => (
                    <option key={i} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={row.income}
                  onChange={(e) => handleInputChange(index, "income", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={row.expenses}
                  onChange={(e) => handleInputChange(index, "expenses", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={row.savings}
                  onChange={(e) => handleInputChange(index, "savings", e.target.value)}
                />
              </td>
              <td>
                <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveRow(index)}>
                  Save
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRow(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary " style={{width:"150px"}} onClick={handleAddRow}>
        Add Row
      </button>
      {message && <p className="mt-3 text-center text-muted">{message}</p>}
    </div>
  );
};

export default FinanceForm;
