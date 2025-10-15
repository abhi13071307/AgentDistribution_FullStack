const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const runController = require('../controllers/run.controller');

router.get('/', auth, runController.listRuns);
router.get('/:runId/agents/:agentId/leads', auth, runController.getLeadsForAgentInRun);

module.exports = router;
