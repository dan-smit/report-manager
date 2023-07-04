const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  viewers: {
        type: Array,
        default: [],
        required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  reportPDF: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema, "reports"); //Report is the model, reports is the collection