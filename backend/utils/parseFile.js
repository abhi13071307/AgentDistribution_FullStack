const { parse } = require('csv-parse/sync'); 
const xlsx = require('xlsx');

exports.parseBuffer = async (buffer, filename) => {
  const ext = filename.split('.').pop().toLowerCase();

  if (ext === 'csv') {
    const text = buffer.toString('utf8');
    const records = parse(text, { columns: true, skip_empty_lines: true });
    return records;
  } else if (ext === 'xlsx' || ext === 'xls') {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
  } else {
    throw new Error('Unsupported file format');
  }
};
