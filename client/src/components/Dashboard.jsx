import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionsAndBudget = async () => {
      try {
        const token = localStorage.getItem("token");
        const transactionRes = await axios.get(
          `http://localhost:5000/api/transactions?page=${page}&category=${categoryFilter}&amount=${amountFilter}&date=${dateFilter}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const budgetRes = await axios.get("http://localhost:5000/api/budget", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(transactionRes.data.transactions);
        setBudget(budgetRes.data.amount || 0);
        setTotalPages(transactionRes.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login");
      }
    };

    fetchTransactionsAndBudget();
  }, [page, categoryFilter, amountFilter, dateFilter, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <ExpenseChart transactions={transactions} budget={budget} />

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Filter by Amount"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      <div className="transactions">
        {transactions.map((t) => (
          <div key={t._id} className="transaction">
            <p>Type: {t.type}</p>
            <p>Amount: ${t.amount}</p>
            <p>Category: {t.category}</p>
            <p>Date: {new Date(t.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
