// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import api from "../utils/api";

const Dashboard = () => {
  // State for month/year filter (dummy for now)
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const {user}=useAuth();
  const [totalIncome,setTotalIncome]=useState();
  const [totalExpense,setTotalExpense]=useState();
  const [totalSavings,setTotalSavings]=useState()

  useEffect(()=>{
    const getDashboardSummary=async()=>{
      try {
        const query=[]
        if(month) query.push(`month=${month}`);
        if(year) query.push(`year=${year}`);
        const queryString=query.length? `?${query.join("&")}`:"";    

        const res=await api.get(`/v1/dashboard${queryString}`);    //v1/dashboard?month=09&year=2025
        const data=res.data.data;

        setTotalIncome(data.totalIncome || 0)   
        setTotalExpense(data.totalExpense || 0)
        setTotalSavings(data.savings ||0)  
        
        console.log("Dashboard Summary: ",data)
      } catch (error) {
        console.log("Cannot fetch dashboard summary",error)
        setTotalIncome(0)
        setTotalExpense(0);
        setTotalSavings(0);
      }
    }
    getDashboardSummary()
  },[month,year]);     //Refetch whenever month/year changes

  return (
    <div className="p-6 space-y-6">
      {/* --- Page Title --- */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* --- Month/Year Selector --- */}
        <div className="flex gap-3">
          {/* Month Selector */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          {/* Year Selector */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select Year</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            {/* TODO: Dynamically generate years if needed */}
          </select>
        </div>
      </div>

      {/* --- Summary Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-600">Total Income</h2>
          <p className="mt-2 text-2xl font-bold text-emerald-600">₹{totalIncome}</p>
          {/* TODO: Fetch filtered income */}
        </div>

        {/* Expense Card */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-600">Total Expense</h2>
          <p className="mt-2 text-2xl font-bold text-red-500">₹{totalExpense}</p>
          {/* TODO: Fetch filtered expense */}
        </div>

        {/* Savings Card */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-600">Total Savings</h2>
          <p className="mt-2 text-2xl font-bold text-blue-500">₹{totalSavings}</p>
          {/* TODO: Calculate savings = income - expense */}
        </div>
      </div>

      {/* --- Recent Transactions Section --- */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h2>
        <div className="divide-y">
          {/* TODO: Map through transactions for selected month/year */}
          <p className="text-gray-400">No recent transactions</p>
        </div>
      </div>

      {/* --- Chart / Graph Section --- */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Spending Overview
        </h2>
        {/* TODO: Insert chart here (Recharts / Chart.js) */}
        <div className="h-48 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
