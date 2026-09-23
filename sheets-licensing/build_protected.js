const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = __dirname;
const codigoPath = path.join(dir, 'Codigo.gs');
const seguridadPath = path.join(dir, 'Seguridad.gs');
const rawPath = path.join(dir, 'bundle_raw.js');
const tempObfPath = path.join(dir, 'bundle_obf.js');
const finalGsPath = path.join(dir, 'FlorMartinez_Comercial_Protegido.gs');

console.log('1. Leyendo archivos fuente...');
const codigoContent = fs.readFileSync(codigoPath, 'utf8');
const seguridadContent = fs.readFileSync(seguridadPath, 'utf8');

const combined = `
${codigoContent}

${seguridadContent}
`;

fs.writeFileSync(rawPath, combined, 'utf8');
console.log('2. bundle_raw.js creado.');

console.log('3. Ejecutando obfuscación...');
const cmd = [
  'npx javascript-obfuscator',
  `"${rawPath}"`,
  `--output "${tempObfPath}"`,
  '--reserved-names onEdit,onOpen,prepararPlantillaParaVender,forzarDesbloqueoManual',
  '--compact true',
  '--control-flow-flattening false',
  '--string-array-rotate false',
  '--string-array-shuffle false',
  '--string-array-index-shift false',
  '--transform-object-keys false',
  '--split-strings false',
  '--string-array true',
  '--string-array-encoding base64',
  '--string-array-threshold 1',
  '--target browser-no-eval'
].join(' ');

execSync(cmd, { stdio: 'inherit' });

console.log('4. Post-procesamiento para compatibilidad total con Google Apps Script...');
let obfuscatedCode = fs.readFileSync(tempObfPath, 'utf8');

// Restauramos llamadas directas de SpreadsheetApp y Utilities para que el analizador
// estático de OAuth de Google Apps Script detecte las llamadas nativas
const vm = require('vm');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(obfuscatedCode, sandbox);

// Encontrar la función decodificadora real del string array en el sandbox
const decoderFn = Object.values(sandbox).find(v => {
  try {
    return typeof v === 'function' && v(0) === '🏠 Vivienda';
  } catch(e) {
    return false;
  }
});

if (!decoderFn) {
  throw new Error('No se pudo encontrar la función decodificadora en el sandbox.');
}

// Restaurar TODAS las llamadas a propiedades y métodos de objetos
// (SpreadsheetApp, Spreadsheet, Sheet, Range, DataValidation, String, Array, etc.)
// En Google Apps Script los objetos nativos (Java host proxies) NO resuelven métodos
// mediante corchetes dinámicos como sheet['getName'](), sino únicamente mediante dot notation sheet.getName()
obfuscatedCode = obfuscatedCode.replace(/([a-zA-Z0-9_$\)\]])\[[a-zA-Z0-9_$]+\((0x[a-f0-9]+)\)\]/g, (match, prefix, hex) => {
  const prop = decoderFn(parseInt(hex, 16));
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop)) {
    return prefix + '.' + prop;
  }
  return match;
});

const banner = `/**
 * @OnlyCurrentDoc
 * ====================================================================
 * SISTEMA INTEGRAL FLOR MARTÍNEZ SIGNATURE
 * VERSIÓN COMERCIAL BLINDADA Y PROTEGIDA (ZERO-AUTH)
 * ====================================================================
 * Motor operativo completo + Sistema criptográfico anti-copia.
 * 
 * Funciones disponibles para ejecutar desde el editor de Apps Script:
 * - prepararPlantillaParaVender() : Deja el archivo bloqueado y listo para entregar.
 * - forzarDesbloqueoManual()      : Desbloqueo de emergencia del creador.
 * 
 * Triggers automáticos que gestiona Google Sheets:
 * - onEdit(e)  : Sincronización en vivo, desplegables dinámicos y validación en C7.
 * - onOpen(e)  : Detección y bloqueo automático de copias clonadas no autorizadas.
 * ====================================================================
 */
`;

fs.writeFileSync(finalGsPath, banner + '\n' + obfuscatedCode, 'utf8');

// Limpieza de temporales
if (fs.existsSync(rawPath)) fs.unlinkSync(rawPath);
if (fs.existsSync(tempObfPath)) fs.unlinkSync(tempObfPath);

const stats = fs.statSync(finalGsPath);
console.log(`\n🎉 NUEVO ARCHIVO PROTEGIDO GENERADO: ${finalGsPath} (${(stats.size / 1024).toFixed(1)} KB)`);
