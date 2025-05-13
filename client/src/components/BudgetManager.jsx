import React, { useState, useEffect } from "react";
import { api } from "../api/axios";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

const BudgetManager = ({ setBudget, budget }) => {
  const [newBudget, setNewBudget] = useState(budget);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setNewBudget(budget);
  }, [budget]);

  const handleBudgetUpdate = async () => {
    if (newBudget <= 0) {
      setSeverity("error");
      setMessage("Budget must be a positive number.");
      setOpen(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "http://localhost:5000/api/budget",
        { amount: newBudget },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBudget(res.data.amount);
      setSeverity("success");
      setMessage("Budget updated successfully!");
      setOpen(true);
    } catch (error) {
      console.error("Error updating budget:", error);
      setSeverity("error");
      setMessage("Failed to update budget.");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Monthly Budget
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        label="Budget Amount"
        type="number"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
        sx={{ mb: 2 }}
      />

      <Button
        variant="contained"
        onClick={handleBudgetUpdate}
        fullWidth
        sx={{ mb: 2 }}
      >
        Update Budget
      </Button>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BudgetManager;
