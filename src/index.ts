#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

dotenv.config()

const envSchema = z.object({
  GITLAB_TOKEN: z.string().min(1),
})

const env = envSchema.parse(process.env)

const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/gitlab-mcp-server',
    version: '',
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
    instructions: `MCP Server for GitLab API - repository management and DevOps automation`,
  }
)

const logger = {
  log: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'info', data: message.join(' ') }),
  error: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'error', data: message.join(' ') }),
  debug: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'debug', data: message.join(' ') }),
}

const apiClient: AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config) => {
    if (env.GITLAB_TOKEN) {
      config.headers['PRIVATE-TOKEN'] = env.GITLAB_TOKEN
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

function handleResult(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
  }
}

function handleError(error: unknown): CallToolResult {
  console.error(error)
  logger.error('Error occurred:', JSON.stringify(error))

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.description || error.message
    return {
      isError: true,
      content: [{ type: 'text', text: `API Error: ${message}` }],
    } as CallToolResult
  }

  return {
    isError: true,
    content: [{ type: 'text', text: `Error: ${error}` }],
  } as CallToolResult
}

mcpServer.tool('get-projects', `Get a list of visible projects for authenticated user`, {}, async (args) => {
  try {
    const response = await apiClient.get('/api/v4/projects', {
      params: args,
    })
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool('post-projects', `Create new project`, {}, async (args) => {
  try {
    const response = await apiClient.post('/api/v4/projects', args)
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool('get-projects-by-id', `Get a single project`, {}, async (args) => {
  try {
    const response = await apiClient.get('/api/v4/projects/{id}', {
      params: args,
    })
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool('put-projects-by-id', `Update an existing project`, {}, async (args) => {
  try {
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool('delete-projects-by-id', `Delete a project`, {}, async (args) => {
  try {
    const response = await apiClient.delete('/api/v4/projects/{id}', {
      params: args,
    })
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('GitLab MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
