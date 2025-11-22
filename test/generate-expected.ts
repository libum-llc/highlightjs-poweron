import hljs from 'highlight.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import hljsDefinePowerOn from '../dist/poweron.es.min.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hljs.registerLanguage('poweron', hljsDefinePowerOn);

const inputPath = path.join(__dirname, 'markup/poweron/poweron.txt');
const outputPath = path.join(__dirname, 'markup/poweron/poweron.expect.txt');

const code = fs.readFileSync(inputPath, 'utf-8');
const result = hljs.highlight(code, { language: 'poweron' });

fs.writeFileSync(outputPath, result.value);
console.log('Generated expected output at:', outputPath);
