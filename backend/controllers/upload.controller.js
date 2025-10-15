const { parseBuffer } = require('../utils/parseFile');
const { validateRows } = require('../utils/normalize');
const { distributeEqually } = require('../utils/distribute');
const Agent = require('../models/Agent');
const Lead = require('../models/Lead');
const Run = require('../models/Run');

exports.handleUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const records = await parseBuffer(req.file.buffer, req.file.originalname);
    const { valid, invalid } = validateRows(records);

    if (valid.length === 0) {
      return res.status(400).json({ message: 'No valid records found in file', invalidCount: invalid.length });
    }

    const agents = await Agent.find().limit(5);
    if (agents.length < 5) {
      return res.status(400).json({ message: 'At least 5 agents are required for distribution' });
    }

    const distribution = distributeEqually(valid, agents);

    const run = await Run.create({
      fileName: req.file.originalname,
      total: valid.length,
      createdBy: req.admin.id,
      distributedTo: agents.map((a) => ({
        agent: a._id,
        count: distribution[a._id.toString()]?.length || 0
      }))
    });

    const allLeads = [];
    for (const agentId in distribution) {
      const leads = distribution[agentId].map((l) => ({
        firstName: l.firstName,
        phone: l.phone,
        notes: l.notes,
        agent: agentId,
        run: run._id
      }));
      allLeads.push(...leads);
    }

    await Lead.insertMany(allLeads);

    res.json({
      message: 'Leads distributed successfully',
      total: valid.length,
      runId: run._id,
      distributedTo: run.distributedTo
    });
  } catch (err) {
    next(err);
  }
};
