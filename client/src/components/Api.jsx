import React from "react";
import { Container, Typography, Box, Divider } from "@mui/material";

const API = () => {
  const apiEndpoints = [
    {
      title: "Authentication",
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/register",
          description: "Register a new user",
          payload: `{ "username": "Vishnu", "password": "Vishnu123" }`,
        },
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Login user and return JWT token",
          payload: `{ "username": "Vishnu", "password": "Vishnu123" }`,
        },
      ],
    },
    {
      title: "Budget Management",
      endpoints: [
        {
          method: "GET",
          path: "/api/budget",
          description: "Get the current budget",
          headers: `{ "Authorization": "Bearer <token>" }`,
        },
        {
          method: "POST",
          path: "/api/budget",
          description: "Set or update the budget",
          headers: `{ "Authorization": "Bearer <token>" }`,
          payload: `{ "amount": 5000 }`,
        },
      ],
    },
    {
      title: "Transaction Management",
      endpoints: [
        {
          method: "GET",
          path: "/api/transactions",
          description: "Fetch all transactions with pagination",
          headers: `{ "Authorization": "Bearer <token>" }`,
          query: `?page=1&category=Food&amount=50&date=2025-01-01`,
        },
        {
          method: "POST",
          path: "/api/transactions",
          description: "Add a new transaction",
          headers: `{ "Authorization": "Bearer <token>" }`,
          payload: `{ "type": "Expense", "amount": 100, "category": "Groceries" }`,
        },
        {
          method: "PUT",
          path: "/api/transactions/:id",
          description: "Update a transaction",
          headers: `{ "Authorization": "Bearer <token>" }`,
          payload: `{ "type": "Income", "amount": 200, "category": "Salary" }`,
        },
        {
          method: "DELETE",
          path: "/api/transactions/:id",
          description: "Delete a transaction",
          headers: `{ "Authorization": "Bearer <token>" }`,
        },
      ],
    },
  ];

  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Budget Tracker API Documentation
      </Typography>

      {apiEndpoints.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {section.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {section.endpoints.map((endpoint, idx) => (
            <Box
              key={idx}
              sx={{
                mb: 3,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="body1">
                <strong>Method:</strong> {endpoint.method}
              </Typography>
              <Typography variant="body1">
                <strong>Path:</strong> {endpoint.path}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {endpoint.description}
              </Typography>
              {endpoint.headers && (
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  <strong>Headers:</strong> {endpoint.headers}
                </Typography>
              )}
              {endpoint.query && (
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  <strong>Query Parameters:</strong> {endpoint.query}
                </Typography>
              )}
              {endpoint.payload && (
                <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                  <strong>Payload:</strong> {endpoint.payload}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default API;
