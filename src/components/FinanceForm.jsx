import React from "react";
import { toast } from "react-toastify";  // Import the toast function
import useFinance from "../hooks/useFinanceForm"; // Import the custom hook
import { ToastContainer } from "react-toastify"; // Import ToastContainer for rendering toasts

const FinanceForm = () => {
  const {
    financeData,
    months,
    handleInputChange,
    handleAddRow,
    handleSaveRow,
    handleDeleteRow,
    error,
  } = useFinance(); // Use the custom hook

  const handleSave = (index) => {
    const currentMonth = financeData[index].month;
    
    // Check if the month already exists in the table (excluding the current row)
    const isMonthDuplicate = financeData.some((row, idx) => row.month === currentMonth && idx !== index);
    
    if (isMonthDuplicate) {
      toast.warn("Month already exists! Please select a different month.");  // Show warning toast
      return;
    }

    handleSaveRow(index);
    toast.success("Row saved successfully!");  // Show success toast on save
  };

  const handleDelete = (index) => {
    handleDeleteRow(index);
    toast.error("Row deleted successfully!");  // Show error toast on delete
  };

  const handleAdd = () => {
    handleAddRow();
    toast.info("New row added!");  // Show info toast on add
  };

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
                <button className="btn btn-success btn-sm me-2" onClick={() => handleSave(index)}>
                  Save
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" style={{ width: "150px" }} onClick={handleAdd}>
        Add Row
      </button>
      {/* {message && <p className="mt-3 text-center text-muted">{message}</p>} */}
      
      {/* Add ToastContainer to render toasts */}
      <ToastContainer />
    </div>
  );
};

export default FinanceForm;
