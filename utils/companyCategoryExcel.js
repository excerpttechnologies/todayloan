const XLSX = require('xlsx');

// ─────────────────────────────────────────────────────────────────────────────
// Sheet format: two columns — "Company Name" | "Category"
// One row per company. Bank staff just fill this in, no JSON knowledge needed.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {Buffer} buffer - uploaded .xlsx/.xls file
 * @returns {Array<{companyName: string, category: string}>}
 */
function parseCompanyCategoryExcel(buffer) {
  const wb = XLSX.read(buffer, { type: 'buffer' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // [[companyName, category], ...]

  const out = [];
  rows.forEach((row, idx) => {
    if (idx === 0) return; // skip header row
    if (!row || row.length < 2) return;
    const companyName = String(row[0] ?? '').trim();
    const category = String(row[1] ?? '').trim(); // kept exactly as the bank wrote it
    if (!companyName || !category) return; // skip blank/incomplete rows
    out.push({ companyName, category });
  });
  return out;
}

function buildCompanyCategoryTemplateBuffer() {
  const rows = [
    ['Company Name', 'Category'],
    ['Infosys', 'A'],
    ['TCS', 'A'],
    ['Wipro', 'B'],
    ['ABC Pvt Ltd', 'C'],
  ];
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 30 }, { wch: 14 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Company Category');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

module.exports = { parseCompanyCategoryExcel, buildCompanyCategoryTemplateBuffer };
