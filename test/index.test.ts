import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import hljs from 'highlight.js';
import hljsDefinePowerOn from '../dist/poweron.es.min.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

hljs.registerLanguage('poweron', hljsDefinePowerOn);

describe('PowerOn syntax highlighting', () => {
  const markupDir = path.join(__dirname, 'markup/poweron');
  const files = fs.readdirSync(markupDir).filter((f) => !f.includes('.expect.'));

  files.forEach((file) => {
    const scenario = file.replace(/\.txt$/, '');

    test(`should perform syntax highlighting on ${scenario}`, () => {
      const filePath = path.join(markupDir, file);
      const expectFilePath = filePath.replace('.txt', '.expect.txt');

      const code = fs.readFileSync(filePath, 'utf-8');
      const expected = fs.readFileSync(expectFilePath, 'utf-8');

      const result = hljs.highlight(code, { language: 'poweron' });
      const actual = result.value;

      expect(actual.trim()).toBe(expected.trim());
    });
  });
});
