import React from "react";
import { Paper, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Transactions = ({
  item,
  handleEditTransaction,
  handleDeleteTransaction,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6">{item.category}</Typography>
      <Typography>Amount: ${item.amount}</Typography>
      <Typography>
        Date: {new Date(item.createdAt).toLocaleDateString()}
      </Typography>
      <IconButton onClick={() => handleEditTransaction(item)} color="primary">
        <Edit sx={{ margin: 0 }} />
      </IconButton>
      <IconButton
        onClick={() => handleDeleteTransaction(item._id)}
        color="error"
      >
        <Delete sx={{ margin: 0 }} />
      </IconButton>
    </Paper>
  );
};

export default Transactions;
