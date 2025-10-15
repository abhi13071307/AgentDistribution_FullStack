const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    phone: { type: String, trim: true },
    notes: { type: String, trim: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    run: { type: mongoose.Schema.Types.ObjectId, ref: 'Run' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);
