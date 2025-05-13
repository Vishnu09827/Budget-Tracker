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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password");
      setOpen(true);
      console.error("Login error:", err);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError("");
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
        Login
      </Typography>

      <form onSubmit={handleLogin}>
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
          Login
        </Button>
      </form>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{" "}
        <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
          Register here
        </Link>
      </Typography>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} sx={{margin:0}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
