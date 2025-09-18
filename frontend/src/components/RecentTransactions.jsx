import React from "react";

const RecentTransactions=({transactions})=>{
    return(
         <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Transactions</h2>
        <div className="divide-y">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((tx, i) => (
              <div key={i} className="py-2 flex justify-between">
                <span>{tx.title || "No description"}</span>
                <span
                  className={tx.type === "income" ? "text-emerald-600" : "text-red-500"}
                >
                  {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No recent transactions</p>
          )}
        </div>
      </div>
    )
}

export default RecentTransactions
