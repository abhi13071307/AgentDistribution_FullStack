const mongoose = require('mongoose');

const RunSchema = new mongoose.Schema(
  {
    fileName: String,
    total: Number,
    distributedTo: [
      {
        agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
        count: Number,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Run', RunSchema);
