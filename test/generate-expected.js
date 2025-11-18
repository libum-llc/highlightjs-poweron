const hljs = require('highlight.js');
const fs = require('fs');
const path = require('path');

// Import the PowerOn language definition
const poweronModule = require('../src/poweron.js');
const hljsDefinePowerOn = poweronModule.default || poweronModule;

hljs.registerLanguage('poweron', hljsDefinePowerOn);

const inputPath = path.join(__dirname, 'markup/poweron/poweron.txt');
const outputPath = path.join(__dirname, 'markup/poweron/poweron.expect.txt');

const code = fs.readFileSync(inputPath, 'utf-8');
const result = hljs.highlight(code, { language: 'poweron' });

fs.writeFileSync(outputPath, result.value);
console.log('Generated expected output at:', outputPath);
