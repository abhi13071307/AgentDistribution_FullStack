exports.distributeEqually = (items, agents) => {
  const n = items.length;
  const slots = agents.length; 
  if (slots === 0) return {};

  const base = Math.floor(n / slots);
  let remainder = n % slots;
  const result = {};

  let start = 0;
  for (let i = 0; i < slots; i++) {
    const count = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    const agentId = agents[i]._id.toString();
    result[agentId] = items.slice(start, start + count);
    start += count;
  }
  return result;
};
