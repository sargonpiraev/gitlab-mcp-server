# GitLab MCP Server

MCP Server for GitLab API - repository management and DevOps automation

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Set up environment:

```bash
cp .env.example .env
# Edit .env with your API credentials
```

3. Start the server:

```bash
npm start
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "gitlab-mcp-server": {
      "command": "node",
      "args": ["/dist/index.js"],
      "env": {
        "GITLAB_TOKEN": "your_gitlab_token"
      }
    }
  }
}
```

## Available Tools

- **get-projects**: Get a list of visible projects for authenticated user
- **post-projects**: Create new project
- **get-projects-by-id**: Get a single project
- **put-projects-by-id**: Update an existing project
- **delete-projects-by-id**: Delete a project

## Development

```bash
npm run build    # Build TypeScript
npm run test     # Run tests
npm run lint     # Check code style
```

## License

MIT
