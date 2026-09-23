const fs = require('fs');
const { execSync } = require('child_process');

const sampleCode = `
function testScope() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  sheet.getRange("A1").setValue("123");
  SpreadsheetApp.flush();
}
`;

fs.writeFileSync('sheets-licensing/sample.js', sampleCode, 'utf8');

const reservedList = [
  'testScope',
  'SpreadsheetApp',
  'getActiveSpreadsheet',
  'getSheetByName',
  'getRange',
  'setValue',
  'flush'
].join(',');

execSync(
  `npx javascript-obfuscator sheets-licensing/sample.js --output sheets-licensing/sample_out.js --reserved-names ${reservedList} --reserved-strings ${reservedList} --transform-object-keys false --string-array-rotate false --string-array true --target browser-no-eval`,
  { stdio: 'inherit' }
);

const out = fs.readFileSync('sheets-licensing/sample_out.js', 'utf8');
console.log('Sample output:');
console.log(out);

fs.unlinkSync('sheets-licensing/sample.js');
fs.unlinkSync('sheets-licensing/sample_out.js');
