import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [form, setForm] = useState({
    amount: "",
    type: "EXPENSE",
    category: "",
    description: "",
    date: "",
  });

  useEffect(() => {
    fetch("https://finance-tracker-w2fi.onrender.com/api/transactions/summary/1")
      .then((res) => res.json())
      .then((data) => setSummary(data));
  }, []);

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [summary.income, summary.expense],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Expenses",
        data: [500, 700, 300, 900],
        backgroundColor: "blue",
      },
    ],
  };

  const handleSubmit = () => {
    fetch("https://finance-tracker-w2fi.onrender.com/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        user: { id: 1 },
      }),
    }).then(() => window.location.reload());
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        background: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "900px" }}>
        <h2>Finance Dashboard</h2>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div style={cardStyle}>
            <h3>Income</h3>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ₹ {summary.income}
            </p>
          </div>

          <div style={cardStyle}>
            <h3>Expense</h3>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ₹ {summary.expense}
            </p>
          </div>

          <div style={cardStyle}>
            <h3>Balance</h3>
            <p
              style={{
                color: summary.balance < 0 ? "red" : "blue",
                fontWeight: "bold",
              }}
            >
              ₹ {summary.balance}
            </p>
          </div>
        </div>

        {/* Pie Chart */}
        <h3 style={{ marginTop: "30px" }}>Analytics</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "300px" }}>
            <Pie data={pieData} />
          </div>
        </div>

        {/* Bar Chart */}
        <h3 style={{ marginTop: "30px" }}>Monthly Expenses</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "500px" }}>
            <Bar data={barData} />
          </div>
        </div>

        {/* Form */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginTop: "30px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Add Transaction</h3>

          <input
            placeholder="Amount"
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
          />
          <br />

          <select
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option>EXPENSE</option>
            <option>INCOME</option>
          </select>
          <br />

          <input
            placeholder="Category"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />
          <br />

          <input
            placeholder="Description"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <br />

          <input
            type="date"
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
          />
          <br />

          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  width: "30%",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

export default Dashboard;