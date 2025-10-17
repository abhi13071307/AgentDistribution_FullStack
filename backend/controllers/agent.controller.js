const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.createAgent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed', errors: errors.array() });

    const { name, email, mobile, password } = req.body;
    const existing = await Agent.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: 'Agent with this email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const agent = await Agent.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashed,
    });

    const obj = agent.toObject();
    delete obj.password;
    res.status(201).json({ agent: obj });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ message: 'Duplicate field error' });
    next(err);
  }
};

exports.deleteAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    await Agent.deleteOne({ _id: id });

    res.json({ message: 'Agent deleted successfully', id });
  } catch (err) {
    next(err);
  }
};

exports.listAgents = async (req, res, next) => {
  try {
    const agents = await Agent.find().select('-password').sort({ createdAt: -1 });
    res.json({ agents });
  } catch (err) {
    next(err);
  }
};

exports.getAgent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id).select('-password');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });
    res.json({ agent });
  } catch (err) {
    next(err);
  }
};
