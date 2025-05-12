import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Budget Tracker
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Take control of your finances. Track your expenses, manage your
          budget, and make smarter financial decisions.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to="/login"
        >
          Login
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>

      <Typography variant="body2" color="textSecondary">
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default Home;
