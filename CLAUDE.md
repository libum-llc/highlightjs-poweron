# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Highlight.js language grammar definition for PowerOn, the scripting language used in the Jack Henry Credit Union Core Platform (Symitar). The project is written in TypeScript and exports an ES module that registers PowerOn syntax highlighting with Highlight.js.

## Development Commands

### Building
```bash
pnpm run build
```
Builds the project using esbuild via `build.ts`. Generates:
- `dist/poweron.min.js`: UMD build for CDN/browser usage
- `dist/poweron.es.min.js`: ES module build

The build script is automatically run before publishing (`prepublishOnly` hook).

### Linting
```bash
pnpm run lint
```
Formats TypeScript files (`src/*.ts`, `test/*.ts`, `*.ts`) using Prettier.

### Testing
```bash
pnpm run test
```
Runs Jest tests defined in `test/index.test.ts`. Tests compare actual syntax highlighting output against expected output fixtures. The test suite uses Node's experimental VM modules to support ES modules in Jest.

### Generating Test Fixtures
```bash
pnpm run generate-expected
```
Regenerates the expected output file (`test/markup/poweron/poweron.expect.txt`) from the input fixture (`test/markup/poweron/poweron.txt`) using the current grammar implementation.

## Architecture

### Core Language Definition (`src/poweron.ts`)

The entire grammar is defined in a single TypeScript module export that returns a Highlight.js language definition object. The module imports types from Highlight.js (`HLJSApi`, `Language`, `Mode`) for type safety. Key architecture:

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
  - Reserved word filtering prevents false positives on variable detection using the `noneOf()` helper function

### Build System (`build.ts`)

Uses esbuild to compile TypeScript and bundle the output into two formats:
- **UMD build** (`dist/poweron.min.js`): IIFE format with global name `hljsDefinePowerOn` and CommonJS footer for Node.js compatibility
- **ES module build** (`dist/poweron.es.min.js`): Standard ES module format

Both builds are minified. The build process cleans the `dist/` directory before each build.

### Test Structure

**Test fixtures** in `test/markup/poweron/`:
- `poweron.txt`: Input PowerOn code sample
- `poweron.expect.txt`: Expected highlighted HTML output

**Test runner** (`test/index.test.ts`):
- Written in TypeScript
- Uses Jest with ES module support
- Dynamically reads all `.txt` files in `test/markup/poweron/` (excluding `.expect.txt`)
- For each fixture, compares actual highlight.js output against expected output
- Registers the language using the built ES module from `dist/`

**Detection tests** in `test/detect/poweron/`:
- `poweron.detect.txt`: Sample code for language auto-detection testing

**Jest configuration** (`jest.config.ts`):
- Node environment
- No transformation (uses native ES modules)
- Treats `.ts` files as ES modules via `extensionsToTreatAsEsm`
