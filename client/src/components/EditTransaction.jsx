import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";

const EditTransaction = ({
  editFormData,
  setEditFormData,
  handleUpdateTransaction,
  setEditingTransaction,
}) => {
  return (
    <Box mb={2}>
      <TextField
        fullWidth
        variant="outlined"
        value={editFormData.category}
        onChange={(e) =>
          setEditFormData({
            ...editFormData,
            category: e.target.value,
          })
        }
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        variant="outlined"
        value={editFormData.amount}
        onChange={(e) =>
          setEditFormData({ ...editFormData, amount: e.target.value })
        }
        sx={{ mb: 2 }}
      />
      <IconButton onClick={handleUpdateTransaction} color="success">
        <Save sx={{ margin: 0 }} />
      </IconButton>
      <IconButton onClick={() => setEditingTransaction(null)} color="error">
        <Cancel sx={{ margin: 0 }} />
      </IconButton>
    </Box>
  );
};

export default EditTransaction;
