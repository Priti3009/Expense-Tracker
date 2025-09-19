import React, { useState, useEffect } from 'react'
import api from '../utils/api.jsx'
import DateFilter from '../components/DateFilter.jsx'

const Income = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    fetchIncomes();
  }, [month, year]); // <-- Refetch whenever month or year changes

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
    </div>
  )
}

export default Income
