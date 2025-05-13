import React, { useState } from "react";
import { api } from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("auth/register", {
        username,
        password,
      });
      setSuccess("Registration successful. You can now log in.");
      setError("");
      setUsername("");
      setPassword("");
      setOpen(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess("");
      setOpen(true);
      console.error("Registration error:", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
    setSuccess("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
        boxShadow: 3,
        mt: 8,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        Register
      </Typography>

      <form onSubmit={handleRegister}>
        <TextField
          fullWidth
          variant="outlined"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          required
        />

        <Button type="submit" variant="contained" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
          Log in here
        </Link>
      </Typography>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {error && (
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        )}
      </Snackbar>
    </Box>
  );
};

export default Register;
