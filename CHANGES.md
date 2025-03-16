# Changes by wazzan

## 2025-03-16
- Forked the original project from Tracey Russell (https://github.com/truss44/mcp-crypto-price).
- Migrated API integration to CoinCap API 3.0 as API 2.0 is being deprecated. Updated the base URL from `https://api.coincap.io/v2/` to `https://rest.coincap.io/v3/`.
- Refactored Jest test commands in `package.json`:
  - Changed `test` script to `jest src` to ensure tests run against the source files instead of any compiled output.
  - Changed `test:coverage` script to `jest --coverage src` to generate accurate code coverage reports on the source code.
  - These changes resolved previous test suite errors related to test discovery and execution.
- Rebranded project files and identifiers to prepare for publishing a new npm package under a different name and organization.