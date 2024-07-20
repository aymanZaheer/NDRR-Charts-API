const mongoose = require('mongoose');

const chartSchema = new mongoose.Schema({
  chartId: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  xAxisCaption: { type: String },
  yAxisCaption: { type: String },
  labels: { type: [String], required: true },
  data: { type: [Number], required: true },
});

module.exports = mongoose.model('Chart', chartSchema);
