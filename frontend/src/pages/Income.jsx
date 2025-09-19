import React, { useState, useEffect } from 'react'
import api from '../utils/api.jsx'
import DateFilter from '../components/DateFilter.jsx'

const Income = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({  //used in the form 
    title: "",
    amount: "",
    category: "General",
    date: "",
    description: "",

  })

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchIncomes = async () => {
      setLoading(true);
      try {
        const query = [];
        if (month) query.push(`month=${month}`);
        if (year) query.push(`year=${year}`);
        const queryString = query.length ? `?${query.join("&")}` : "";

        const res = await api.get(`/v1/income/all${queryString}`);
        setIncomes(res.data.data || []);
      } catch (error) {
        console.error("Error fetching incomes:", error);
        setIncomes([]);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    
    fetchIncomes(); //show list 
  }, [month, year]); // <-- Refetch whenever month or year changes

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleAddIncome = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post(
      "/v1/income/create",
      formData
    );

    // refresh incomes list after adding
    fetchIncomes();

    // reset form & close modal
    setFormData({
      title: "",
      amount: "",
      category: "General",
      date: "",
      description: "",
    });
    setShowForm(false);
  } catch (error) {
    console.error("Error adding income:", error.response?.data || error.message);
  }
};


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Income</h1>

      {/* --- Date Filter Component --- */}
      <DateFilter
        defaultMonth={month}
        defaultYear={year}
        onChange={({ month, year }) => {
          setMonth(month);
          setYear(year);
        }}
      />
      {/*Create Income or Add Income*/}
      <button
        onClick={() => setShowForm(true)}
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
      >
        + Add Income
      </button>


      {/* --- Income Table --- */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3">Date</th>
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
            ) : incomes.length > 0 ? (
              incomes.map((income) => (
                <tr key={income._id} className="border-b">
                  <td className="px-6 py-3">
                    {new Date(income.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{income.title || "N/A"}</td>
                  <td className="px-6 py-3 text-emerald-600 font-semibold">
                    ₹{income.amount}
                  </td>
                  <td className="px-6 py-3">
                    <button className="px-3 m-1 py-1 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 m-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No income records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showForm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-lg font-bold mb-4">Add Income</h2>
      <form
        onSubmit={handleAddIncome}
        className="space-y-3"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
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

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  )
}

export default Income
