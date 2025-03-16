# Rebranding Plan for mcp-coincap-jj

This document outlines the steps to rebrand the forked npm package from "mcp-crypto-price" to "mcp-coincap-jj".

## Detailed Plan for Rebranding the Package

### 1. Update package.json
We'll modify the following fields:
- Change name to "mcp-coincap-jj"
- Reset version to "1.0.0"
- Update author to "wazzan"
- Update bin name to match the new package name
- Update repository, bugs, and homepage URLs to point to your GitHub repository
- Add a note about the fork in the description

### 2. Update src/config/index.ts
- Change SERVER_CONFIG.name to "mcp-coincap-jj"

### 3. Update README.md
- Replace all references to "mcp-crypto-price" with "mcp-coincap-jj"
- Update badges or remove them
- Update installation and usage instructions
- Add a clear note about this being a fork of the original project
- Update GitHub links to point to your repository

### 4. Update src/index.ts
- Change the console message to reflect your package name
- Keep the tool names and functionality the same for now

### 5. Update GitHub Workflows
- Review the workflows to ensure they'll work with your repository
- Note that you'll need to set up NPM_TOKEN in your GitHub repository settings

### 6. Update Dockerfile (if needed)
- Update any references to the original package name

### 7. Testing and Publishing
- Build and test the package locally
- Prepare for npm publishing

## Implementation Sequence

1. First, update configuration files (package.json, src/config/index.ts)
2. Then, update source code (src/index.ts)
3. Next, update documentation (README.md)
4. Finally, update CI/CD configuration (GitHub workflows, Dockerfile)
5. Test the changes locally before publishing

## Future Considerations

After the initial rebranding, consider:
- Adding new features or improvements
- Updating the API integration
- Enhancing documentation
- Setting up proper CI/CD with your GitHub repository