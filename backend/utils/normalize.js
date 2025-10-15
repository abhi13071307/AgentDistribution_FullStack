exports.normalizeRow = (row) => {
  const keys = Object.keys(row);
  const mapKey = (k) => k.toLowerCase().replace(/\s/g, '');

  let firstName = null, phone = null, notes = null;
  for (const k of keys) {
    const lk = mapKey(k);
    if (lk.includes('firstname') || lk === 'firstname' || lk === 'first') firstName = row[k];
    if (lk.includes('phone') || lk.includes('mobile')) phone = row[k];
    if (lk.includes('note')) notes = row[k];
  }

  return { firstName, phone, notes };
};

exports.validateRows = (rows) => {
  const invalid = [];
  const valid = [];

  for (const [index, r] of rows.entries()) {
    const norm = exports.normalizeRow(r);
    if (!norm.firstName || !norm.phone) {
      invalid.push({ index, ...norm });
    } else {
      valid.push(norm);
    }
  }

  if (invalid.length > 0) {
    return { valid, invalid, message: `${invalid.length} invalid rows detected` };
  }
  return { valid, invalid: [], message: 'All rows valid' };
};
