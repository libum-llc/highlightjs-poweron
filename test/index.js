require('should');
const promisify = require('util').promisify;
const path = require('path');
const hljs = require('highlight.js');
const fs = require('fs');
const hljsDefinePowerOn = require('../src/poweron');
hljs.registerLanguage('poweron', hljsDefinePowerOn);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

describe('PowerOn syntax highlighting', () => {
  async function itShouldPerformSyntaxHighlighting() {
    hljs.registerLanguage('poweron', hljsDefinePowerOn);
    const files = (await readdir(path.join(__dirname, 'markup/poweron')))
      .filter(f => !f.includes('.expect.'));
    const scenarios = files.map(f => f.replace(/\.txt$/, ''));
    scenarios.forEach(scenario => {
      it(`should perform syntax highlighting on ${scenario}`, async () => {
        const file = `${scenario}.txt`;
        const filePath = path.join(__dirname, 'markup/poweron', file);
        const expectFilePath = filePath.replace('.txt', '.expect.txt');
        const code = await readFile(filePath, 'utf-8');
        const expected = await readFile(expectFilePath, 'utf-8');
        const result = hljs.highlight('poweron', code);
        const actual = result.value;
        actual.trim().should.eql(expected.trim(), file);
      });
    })
  }

  itShouldPerformSyntaxHighlighting();
});
