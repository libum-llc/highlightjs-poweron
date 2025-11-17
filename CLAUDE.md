# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Highlight.js language grammar definition for PowerOn, the scripting language used in the Jack Henry Credit Union Core Platform (Symitar). The project exports a single JavaScript module that registers PowerOn syntax highlighting with Highlight.js.

## Development Commands

### Linting
```bash
npm run lint
```
Formats JavaScript files in `src/` using Prettier.

### Testing
Currently no tests are configured (test script exits with error). The `test/` directory contains markup fixtures for syntax highlighting validation, but the test runner is not set up.

## Architecture

### Core Language Definition (`src/poweron.js`)

The entire grammar is defined in a single ES module export that returns a Highlight.js language definition object. Key architecture:

- **Pattern matching**: Uses Highlight.js regex utilities and the `hljs.regex` helper for building complex patterns
- **Language elements are organized into constant arrays**:
  - `CONSTANTS_LIST`: System variables (e.g., `SYSTEMDATE`, `SYSUSERNUMBER`)
  - `FUNCTIONS_LIST`: Built-in functions with parameters (e.g., `FILEOPEN`, `EMAILSEND`)
  - `FUNCTIONS_NO_PARAMS_LIST`: Built-in functions without parameters (e.g., `TRANPERFORM`, `FMPERFORM`)
  - `NAMESPACES_LIST`: Execution contexts (e.g., `BATCH`, `WINDOWS`, `SUBROUTINE`)
  - `KEYWORDS_LIST`: Language keywords (e.g., `IF`, `WHILE`, `DEFINE`)
  - `RECORD_LIST`: Database record types (e.g., `LOAN`, `SHARE`, `ACCOUNT`)
  - `OPERATORS_LIST`: Operators including escaped regex versions
  - `DOCSTRING_LIST`: JSDoc-style documentation tags

- **Syntax elements**:
  - Comments use `[` and `]` brackets with support for doctags
  - Includes detected with `#INCLUDE` directive
  - Variables have three forms:
    - Standard identifiers (filtered against reserved words)
    - `@` prefixed variables
    - Field accessors using `:` (e.g., `ACCOUNT:NUMBER`)
  - Case-insensitive matching

- **Scoping strategy**:
  - Database records matched with lookahead for `:` or whitespace
  - Functions matched with lookahead for `(`
  - Procedures matched with lookbehind for `PROCEDURE` or `CALL` keywords
  - Reserved word filtering prevents false positives on variable detection

### Distribution Files

- `dist/poweron.min.js`: UMD build for CDN/browser usage
- `dist/poweron.es.min.js`: ES module build

### Test Structure

Test fixtures in `test/markup/poweron/`:
- `*.txt`: Input PowerOn code samples
- `*.expect.txt`: Expected highlighted HTML output

The test runner in `test/index.js` uses Mocha and should.js to compare actual vs. expected output, though it's currently not wired into npm test.
