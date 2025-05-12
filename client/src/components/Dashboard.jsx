import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ExpenseChart from "./ExpenseChart";
import BudgetManager from "./BudgetManager";
import AddTransaction from "./AddTransaction";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Pagination,
} from "@mui/material";
import EditTransaction from "./EditTransaction";
import Transactions from "./Transactions";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [amountFilter, setAmountFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editFormData, setEditFormData] = useState({
    type: "",
    amount: "",
    category: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionsAndBudget = async () => {
      try {
        const token = localStorage.getItem("token");
        const transactionRes = await axios.get(
          `http://localhost:5000/api/transactions?page=${page}&category=${categoryFilter}&amount=${amountFilter}&date=${dateFilter}`,
          { headers: { Authorization: `Bearer ${token}` } }
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

  const addTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction._id);
    setEditFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
    });
  };

  const handleUpdateTransaction = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/transactions/${editingTransaction}`,
        editFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(
        transactions.map((t) => (t._id === res.data._id ? res.data : t))
      );
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <BudgetManager setBudget={setBudget} budget={budget} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <AddTransaction addTransaction={addTransaction} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <ExpenseChart transactions={transactions} budget={budget} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Filter by Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Filter by Amount"
            type="number"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{ mb: 2 }}
          />

          {transactions.map((t) =>
            editingTransaction === t._id ? (
              <EditTransaction
                key={t._id}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                setEditingTransaction={setEditingTransaction}
                handleUpdateTransaction={handleUpdateTransaction}
              />
            ) : (
              <Transactions
                key={t._id}
                item={t}
                handleDeleteTransaction={handleDeleteTransaction}
                handleEditTransaction={handleEditTransaction}
              />
            )
          )}
        </Grid>
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 3 }}
      />
    </Container>
  );
};

export default Dashboard;
