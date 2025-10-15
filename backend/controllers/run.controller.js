const Run = require('../models/Run');
const Lead = require('../models/Lead');
const Agent = require('../models/Agent');

exports.listRuns = async (req, res, next) => {
  try {
    const runs = await Run.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('createdBy', 'email name')
      .populate('distributedTo.agent', 'name email mobile')
      .lean();

    res.json({ runs });
  } catch (err) {
    next(err);
  }
};

exports.getLeadsForAgentInRun = async (req, res, next) => {
  try {
    const { runId, agentId } = req.params;

    const run = await Run.findById(runId);
    if (!run) return res.status(404).json({ message: 'Run not found' });

    // Optional: verify agent exists
    const agent = await Agent.findById(agentId).select('-password');
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    // Get leads for that run and agent
    const leads = await Lead.find({ run: runId, agent: agentId }).select('-__v').sort({ createdAt: 1 });

    res.json({
      run: { id: run._id, fileName: run.fileName, total: run.total },
      agent,
      count: leads.length,
      leads
    });
  } catch (err) {
    next(err);
  }
};
