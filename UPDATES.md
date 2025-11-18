# Updates to src/poweron.js

This document details the updates made to sync `src/poweron.js` with the `../poweron-pro` source code.

## Summary

Updated the PowerOn language grammar definition to include the latest keywords, functions, namespaces, and database records from the poweron-pro language server project.

---

## Constants (12 items - No changes)

The constants list remains unchanged:
- `LIVEINSTCHECK`
- `PREVSYSTEMDATE`
- `SYSACTUALDATE`
- `SYSACTUALTIME`
- `SYSCLIENTNUMBER`
- `SYSCONSOLENUM`
- `SYSHOSTNAME`
- `SYSMEMOMODE`
- `SYSSYMDIRECTORY`
- `SYSTEMDATE`
- `SYSUSERNUMBER`
- `SYSWINDOWSLEVEL`

---

## Functions with Parameters (156 items)

### Added Functions (51 new)
- `ABS` - Absolute value function
- `ANYSERVICE` - Check for service code existence
- `ANYWARNING` - Check for warning code existence
- `CHARACTERSEARCH` - Search for character in string
- `COL` - Column positioning
- `DATASIZE` - Get data size
- `DATEOFFSET` - Calculate date offset
- `DATEVALUE` - Convert to date value
- `DIALOGINTROTEXT` - Dialog intro text
- `DIALOGPROMPTCHAR` - Dialog character prompt
- `DIALOGPROMPTCODE` - Dialog code prompt
- `DIM` - Dimension array
- `ELSE` - Else clause
- `ENTERLINE` - Enter line input
- `HOUR` - Get hour from time
- `LENGTH` - String length
- `TERMINATE` - Terminate execution
- `GETDATACHAR` - Get data character
- `GETDATACHARACTER` - Get data character (alternate)
- `GETDATADATE` - Get data date
- `GETDATAMONEY` - Get data money
- `GETDATANUMBER` - Get data number
- `GETDATARATE` - Get data rate
- `GETFIELDDATAMAX` - Get field data max
- `GETFIELDDATATYPE` - Get field data type
- `GETFIELDHELPFILE` - Get field help file
- `GETFIELDMNEMONIC` - Get field mnemonic
- `GETFIELDNAME` - Get field name
- `GETFIELDNUMBER` - Get field number
- Plus 22 additional functions

### Bug Fixes
- Fixed typo: `WINDDEDISCONNTECT` → `WINDDEDISCONNECT`

### Previously Missing Functions Now Added
All functions from the poweron-pro language server are now included in the grammar definition.

---

## Functions without Parameters (16 items)

### Added Functions (4 new)
- `PRINT` - Print statement
- `THEN` - Then clause
- `TOTAL` - Total calculation
- `HTMLVIEWDISPLAY` - HTML view display

### Excluded Multi-Word Statements
The following were excluded because they are multi-word statements that require special regex patterns (not simple word boundary matching):
- `FOR ACCOUNT` - Handled by keyword `FOR` + `ACCOUNT`
- `FOR EACH` - Handled by keyword `FOR` + `EACH`
- `FOR <RECORD>` - Generic pattern, handled separately
- `FOR <RECORD> WITH` - Generic pattern with condition, handled separately
- `INSERT [INTO] QUEUE` - Handled by special pattern `/insert\s+(into\s+)?queue\s+/i`
- `REMOVE [FROM] QUEUE` - Handled by special pattern `/remove\s+(from\s+)?queue\s+/i`

### Complete List (alphabetically sorted)
1. `FMPERFORM`
2. `HEADER`
3. `HEADERS`
4. `HPESC`
5. `HPRESET`
6. `HTMLVIEWDISPLAY`
7. `PRINT`
8. `PULLCREDITREPORT`
9. `STOPBLINK`
10. `SUPPRESSNEWLINE`
11. `THEN`
12. `TOTAL`
13. `TRAILERS`
14. `TRANPERFORM`
15. `WHILELIMIT`
16. `WIDTH`

---

## Namespaces (24 items)

### Added Namespaces (3 new)
- `ATMDIALOG` - ATM dialog namespace
- `CUSTOMFORMSWINDOWS` - Custom forms Windows namespace
- `EXCPITEM` - Exception item namespace

### Retained Legacy Namespaces
- `APPLICATION` - Application/loan application TARGET namespace (legacy)
- `AUDIOLOANAPP` - Audio loan application TARGET namespace (legacy)
- `BATCH` - Batch processing TARGET namespace

Note: While `APPLICATION`, `AUDIOLOANAPP`, and `BATCH` are not in the current poweron-pro keywords.json, they remain valid TARGET keywords in PowerOn and are retained for backward compatibility.

### Complete List (alphabetically sorted)
1. `ACCOUNTCHANGE`
2. `ACS`
3. `APPLICATION`
4. `ATMDIALOG`
5. `AUDIO`
6. `AUDIOLOANAPP`
7. `BATCH`
8. `CARDCREATIONWIZARD`
9. `CERTIFICATE`
10. `CHECKDISBURSEDWIZARD`
11. `COLLECTION`
12. `CUSTOMFORMS`
13. `CUSTOMFORMSWINDOWS`
14. `DEMAND`
15. `EXCPITEM`
16. `HOMEBANKING`
17. `MCW`
18. `MCWINTERACTIVE`
19. `STATELESS`
20. `SUBROUTINE`
21. `SYMCONNECT`
22. `VALIDATION`
23. `WINDOWS`
24. `WINDOWSPRINT`

---

## Keywords (107 items)

### Added Keywords (65 new)
- `AFTERLAST` - Position after last record
- `APPEND` - Append to file
- `ASCII` - ASCII character set
- `BEFOREFIRST` - Position before first record
- `BLOCKSIZE` - Block size specification
- `CHANGE` - Change record
- `CLEARSERVICE` - Clear service code
- `CLEARWARNING` - Clear warning code
- `CREATE` - Create record
- `DELETE` - Delete record
- `DIALOGENDGROUPBOX` - End dialog group box
- `EBCDIC` - EBCDIC character set
- `LANDSCAPE` - Landscape orientation
- `LASTACCOUNT` - Last account
- `LASTCREATE` - Last create operation
- `LASTSEQUENCE` - Last sequence number
- `LNINSFROMSH` - Loan insurance from share
- `LOC` - Locator
- `MODIFY` - Modify record
- `NEXT` - Next record
- `NEXTACCOUNT` - Next account
- `NEXTCARD` - Next card
- `NEXTCHECK` - Next check
- `NEXTCOLLATERAL` - Next collateral
- `NEXTCTR` - Next CTR
- `NEXTDOCUMENT` - Next document
- `NEXTMBRADDRESS` - Next member address
- `NEXTSEQUENCE` - Next sequence
- `NEXTULI` - Next unique locator identifier
- `OVERDRAWAVAILABLECALC` - Overdraw available calculation
- `OVERDRAWAVAILABLEINIT` - Overdraw available initialization
- `PORTRAIT` - Portrait orientation
- `PREFIX` - Prefix specification
- `READ` - Read mode
- `READWRITE` - Read/write mode
- `RECORDSIZE` - Record size
- `REVISE` - Revise record
- `REVLANDSCAPE` - Reverse landscape orientation
- `REVPORTRAIT` - Reverse portrait orientation
- `SAVEMODE` - Save mode
- `SETSERVICE` - Set service code
- `SETWARNING` - Set warning code
- `TARGETFILE` - Target file
- `UNIQUEKEY` - Unique key
- `UNTIL` - Until condition
- `WRAP` - Wrap text
- Plus 19 additional keywords

### Removed Keywords with Relevance Scores
The previous implementation had some keywords with relevance scores (e.g., `DIALOGSTARTGROUPING|10`). These have been normalized to remove the relevance scoring syntax.

### Complete List (alphabetically sorted)
All 107 keywords are now alphabetically sorted and include control flow, file operations, record operations, formatting directives, and system keywords.

---

## Database Records (170 items)

### Major Reorganization
The record list has been completely reorganized and expanded:
- **Alphabetically sorted** for easier maintenance
- **Added 30+ new record types** and sub-records
- **More comprehensive coverage** of all Symitar database structures

### Added Record Types (partial list of notable additions)
- `ACHADDINFO` - ACH additional info
- `ACHEDIT` - ACH edit
- `AGREEMENT` - Agreement record
- `AGREEMENT NOTE` - Agreement notes
- `AGREEMENT TRANSACTION` - Agreement transactions
- `CDMDIALOG` - Cash dispense dialog
- `CREDREP` - Credit report
- `CREDREP ITEM` - Credit report item
- `CTRACCOUNT` - CTR account
- `CTRFOREIGN` - CTR foreign
- `CTRPERSON` - CTR person
- `GLENTRY` - GL entry
- `GLHISTORY` - GL history
- `GLSUBACCOUNT` - GL subaccount
- `GLTRAN` - GL transaction
- `PARTICIPATIONLOAN` - Participation loan
- `PARTICIPATIONLOAN NOTE` - Participation loan note
- `PAYROLL` - Payroll record
- `VENDOR` - Vendor record
- `VENDOR FMHISTORY` - Vendor FM history
- Plus many more sub-records and tracking records

### Record Categories Covered
1. **Core Records**: ACCOUNT, SHARE, LOAN, CARD, etc.
2. **Transaction Records**: SHARE TRANSACTION, LOAN TRANSACTION, etc.
3. **Tracking Records**: Multiple tracking variants for different record types
4. **FM History Records**: Historical file maintenance records
5. **Wire Records**: Complete wire transfer sub-record hierarchy
6. **ACH Records**: ACH item, addenda, additional info, edit
7. **GL Records**: Complete general ledger record hierarchy
8. **Collection Records**: CPWORKCARD and related records
9. **Credit Records**: Credit report records
10. **Agreement Records**: Agreement and related sub-records
11. **Participation Records**: Pool and participation loan records
12. **Dealer Records**: Dealer and reserve plan records

### Complete List
All 170 database record types are now included, providing comprehensive coverage for PowerOn syntax highlighting of Symitar database operations.

---

## Technical Notes

### Formatting
- All lists maintain **UPPERCASE** formatting as per project standards
- Items are separated by `~` delimiter
- Lists are split into arrays using `.split('~')`

### Compatibility
- Updates maintain backward compatibility with existing PowerOn code
- New keywords and functions are additive, not breaking changes
- Case-insensitive matching ensures existing code continues to highlight correctly

### Source
All updates are sourced from the `poweron-pro` language server project at `../poweron-pro/packages/language-server/data/`:
- `keywords.json`
- `functions.json`
- `records.json`

---

## Verification

The updated file has been verified:
- ✅ Prettier formatting applied successfully
- ✅ No syntax errors
- ✅ All lists properly formatted
- ✅ Maintains existing grammar structure
