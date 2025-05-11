import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ExpenseChart = ({ transactions, budget }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!transactions.length) return;

    // Prepare data
    const categoryTotals = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const data = Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
    }));

    const totalExpenses = data.reduce((sum, d) => sum + d.amount, 0);
    const budgetRemaining = Math.max(budget - totalExpenses, 0);

    // Set dimensions
    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    // Clear previous chart (important for component re-renders)
    d3.select(chartRef.current).selectAll("*").remove();

    // Create the SVG
    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeSet3);

    // Generate the pie chart
    const pie = d3.pie().value((d) => d.amount);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text((d) => `${d.data.category} (${d.data.amount})`);

    // Budget bar
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -radius - 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#333")
      .text(`Budget: $${budget} | Spent: $${totalExpenses}`);
  }, [transactions, budget]);

  return <svg ref={chartRef}></svg>;
};

export default ExpenseChart;
