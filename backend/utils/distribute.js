exports.distributeEqually = (items, agents) => {
  const n = items.length;
  const slotCount = 5; 
  const selectedAgents = agents.slice(0, slotCount);

  const base = Math.floor(n / slotCount);
  let remainder = n % slotCount;

  const distribution = {};
  let start = 0;

  for (let i = 0; i < selectedAgents.length; i++) {
    const count = base + (remainder > 0 ? 1 : 0);
    remainder = Math.max(remainder - 1, 0);

    const agentId = selectedAgents[i]._id.toString();
    distribution[agentId] = items.slice(start, start + count);
    start += count;
  }

  return distribution; 
};
