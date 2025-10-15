const router = require('express').Router();
const { body } = require('express-validator');
const agentController = require('../controllers/agent.controller');
const auth = require('../middlewares/auth.middleware');

const createAgentValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('mobile').isLength({ min: 7 }).withMessage('Valid mobile required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

router.post('/', auth, createAgentValidators, agentController.createAgent);
router.get('/', auth, agentController.listAgents);
router.get('/:id', auth, agentController.getAgent);

module.exports = router;
