const express = require('express');
const Chart = require("../models/chart");
const router = express.Router();

// Get all charts
router.get('/', async (req, res) => {
  try {
    const charts = await Chart.find();
    res.json(charts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get chart by ID
router.get('/:id', async (req, res) => {
  try {
    const chart = await Chart.findOne({ chartId: req.params.id });
    if (!chart) return res.status(404).json({ message: 'Chart not found' });
    res.json(chart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new chart
router.post('/', async (req, res) => {
  const { chartId, type, xAxisCaption, yAxisCaption, labels, data } = req.body;
  const chart = new Chart({ chartId, type, xAxisCaption, yAxisCaption, labels, data });

  try {
    const newChart = await chart.save();
    res.status(201).json(newChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing chart
router.put('/:id', async (req, res) => {
  try {
    const updatedChart = await Chart.findOneAndUpdate({ chartId: req.params.id }, req.body, { new: true });
    if (!updatedChart) return res.status(404).json({ message: 'Chart not found' });
    res.json(updatedChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a chart
router.delete('/:id', async (req, res) => {
  try {
    const deletedChart = await Chart.findOneAndDelete({ chartId: req.params.id });
    if (!deletedChart) return res.status(404).json({ message: 'Chart not found' });
    res.json({ message: 'Chart deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
