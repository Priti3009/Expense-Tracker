import { useState } from "react";

const DateFilter = ({ onChange, defaultMonth, defaultYear }) => {
  const now = new Date();
  const currentMonth = defaultMonth || String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = defaultYear || now.getFullYear();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const handleChange = (type, value) => {
    let newMonth = month;
    let newYear = year;

    if (type === "month") {
      setMonth(value);
      newMonth = value;
    }
    if (type === "year") {
      setYear(value);
      newYear = value;
    }

    onChange({ month: newMonth, year: newYear }); // send latest values
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      {/* Month Selector */}
      <select
        value={month}
        onChange={(e) => handleChange("month", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Months</option>
        {[
          "01","02","03","04","05","06",
          "07","08","09","10","11","12"
        ].map((m, idx) => (
          <option key={m} value={m}>
            {new Date(0, idx).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>

      {/* Year Selector */}
      <select
        value={year}
        onChange={(e) => handleChange("year", e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Years</option>
        {[2023, 2024, 2025, 2026].map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
