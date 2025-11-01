import React, { useEffect, useState } from 'react'
import api from '../utils/api.jsx'
import DateFilter from '../components/DateFilter.jsx'
import { formToJSON } from 'axios';

const Expense = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null)

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "General",
    date: "",
  })


  const [expenses, setExpense] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchExpenses = async () => {
    setLoading(true);   // that that loading... can be displayed while the  data is being fetched
    try {
      const query = []
      if (month) query.push(`month=${month}`);
      if (year) query.push(`year=${year}`)
      const queryString = query.length ? `?${query.join("&")}` : "";

      const res = await api.get(`/v1/expense/all${queryString}`)
      setExpense(res.data.data || [])
    } catch (error) {
      console.error("Error fetching expense", error)
      setExpense([])
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [month, year])

  const handleChange = (e) => {  // called in input of form
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditClick = (expense) => {
    setIsEditing(true)
    setCurrentId(expense._id)
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split("T")[0]
    })
    setShowForm(true);
  }

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/v1/expense/${currentId}/update`, formData)
      fetchExpenses();
      resetForm();
    } catch (error) {
      console.log("Error updating income :", error.response?.data || error.message)

    }
  }
  //Delete expense
  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the expense ?")
    if (!confirmDelete) return;

    try {
      await api.delete(`/v1/expense/${id}/delete`)
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting income :", error.response?.data || error.message);
    }
  }

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/v1/expense/create", formData
      )
      fetchExpenses();
      resetForm();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data || error.message);
    }
  }

  //Reset Form (called inside handleUpdateExpense)
  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "General",
      date: "",
    });
    setIsEditing(false)
    setCurrentId(null)
    setShowForm(false)
  }

  return (
    <div className="p-4 space-y-6 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800">Expense</h1>

      {/* Date Filter Component */}
      <DateFilter
        defaultMonth={month}
        defaultYear={year}
        onChange={({ month, year }) => {
          setMonth(month)
          setYear(year)
        }}
      />

      {/* Create Expense  */}
      <button
        onClick={() => { setShowForm(true) }}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        +Expense

      </button>

      {/* --- Expense Table --- */}
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-6 py-3">Source</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense._id} className="border-b">
                  <td className="px-6 py-3">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{expense.title || "N/A"}</td>
                  <td className="px-6 py-3 text-emerald-600 font-semibold">{expense.amount}</td>
                  <td className="px-4 py-2 flex flex-wrap gap-2">
                    <button onClick={() => { handleEditClick(expense) }}
                      className="px-3 m-1 py-1 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600">
                      Edit
                    </button>
                    <button
                      onClick={() => { handleDeleteExpense(expense._id) }}
                      className="px-3 py-1 m-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No expense  records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* --- Modal Form (Add / Edit) --- */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Edit Expense" : "Add Expense"}
            </h2>
            <form onSubmit={isEditing ? handleUpdateExpense : handleAddExpense}
              className="space-y-3">

              <input
                type='text'
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className='w-full p-2 border rounded'
                required
              />

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-2 border rounded"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option>General</option>
                <option>Salary</option>
                <option>Business</option>
                <option>Investment</option>
                <option>Other</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                  {isEditing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>

      )}

    </div>
  )
}
export default Expense