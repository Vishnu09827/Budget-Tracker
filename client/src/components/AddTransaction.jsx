import React, { useState } from "react";
import { api } from "../api/axios";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
} from "@mui/material";

const AddTransaction = ({ addTransaction }) => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "http://localhost:5000/api/transactions",
        { type, amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      addTransaction(res.data);
      setType("");
      setAmount("");
      setCategory("");
      setSeverity("success");
      setMessage("Transaction added successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error adding transaction:", error);
      setSeverity("error");
      setMessage("Failed to add transaction.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="type-label">Select Type</InputLabel>
        <Select
          labelId="type-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <MenuItem value="Income">Income</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Add Transaction
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddTransaction;
