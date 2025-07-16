# GitLab MCP Server

![npm version](https://img.shields.io/npm/v/@sargonpiraev/gitlab-mcp-server)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/gitlab-mcp-server)

MCP Server for GitLab API - repository management and DevOps automation

## Features

- 🔧 Repository Management - Create, update, and manage GitLab repositories
- 🚀 DevOps Integration - Seamless GitLab operations from AI assistants
- 📋 Project Automation - Automate project setup and configuration
- ⚡ Workflow Enhancement - Streamline development workflows with AI

## Get Your Credentials

Before installation, you'll need to obtain your API credentials:

1. **GITLAB_TOKEN**: Your GitLab personal access token

Save these credentials for the installation steps below.

## Installation

<details>
<summary><b>Installing via Smithery</b></summary>

To install GitLab MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli@latest install @sargonpiraev/gitlab-mcp-server --client <CLIENT_NAME>
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

#### Cursor One-Click Installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=@sargonpiraev/gitlab-mcp-server&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBzYXJnb25waXJhZXYvaGFiaXRpZnktbWNwLXNlcnZlciJdLCJlbnYiOnsiSEFCSVRJRllfQVBJX0tFWSI6InlvdXItaGFiaXRpZnktYXBpLWtleSJ9fQo=)

#### Manual Configuration

Add to your Cursor `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "gitlab-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/gitlab-mcp-server"],
      "env": {
        "GITLAB_TOKEN": "your-GITLAB_TOKEN-here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in VS Code</b></summary>

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22gitlab-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/gitlab-mcp-server%22%5D%7D)

Or add manually to your VS Code settings:

```json
"mcp": {
  "servers": {
    "gitlab-mcp-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@sargonpiraev/gitlab-mcp-server"],
      "env": {
        "GITLAB_TOKEN": "your-GITLAB_TOKEN-here"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "gitlab-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/gitlab-mcp-server"],
      "env": {
        "GITLAB_TOKEN": "your-GITLAB_TOKEN-here"
      }
    }
  }
}
```

</details>

## Available Tools

- **`get-projects`**: Get a list of visible projects for authenticated user
- **`post-projects`**: Create new project
- **`get-projects-by-id`**: Get a single project
- **`put-projects-by-id`**: Update an existing project
- **`delete-projects-by-id`**: Delete a project

**Total: 5 tools available** 🎯

## Support This Project

Hi! I'm Sargon, a software engineer passionate about AI tools and automation. I create open-source MCP servers to help developers integrate AI assistants with their favorite services.

Your support helps me continue developing and maintaining these tools, and motivates me to create new integrations that make AI assistants even more powerful! 🚀

[![Support on Boosty](https://img.shields.io/badge/Support-Boosty-orange?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://boosty.to/sargonpiraev)

## Connect with Author

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 💬 Join [Discord](https://discord.gg/ZsWGxRGj)
