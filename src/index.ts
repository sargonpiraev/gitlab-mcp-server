#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

dotenv.config()

const envSchema = z.object({
  GITLAB_API_KEY: ,
})

const env = envSchema.parse(process.env)

const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/gitlab-mcp-server',
    version: '',
  },
  {
    instructions: `MCP server for gitlab integration`,
    capabilities: {
      tools: {},
      logging: {},
    },
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
    'Accept': 'application/json'
  },
  timeout: 30000
})

apiClient.interceptors.request.use((config) => {
  
  return config
}, (error) => {
  return Promise.reject(error)
})

function handleResult(data: unknown): CallToolResult {
  return {
    content: [{ 
      type: 'text', 
      text: JSON.stringify(data, null, 2) 
    }]
  }
}

function handleError(error: unknown): CallToolResult {
  console.error(error)
  logger.error('Error occurred:', JSON.stringify(error))
  
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.description || error.message
    return { 
      isError: true, 
      content: [{ type: 'text', text: `API Error: ${message}` }] 
    } as CallToolResult
  }
  
  return { 
    isError: true, 
    content: [{ type: 'text', text: `Error: ${error}` }] 
  } as CallToolResult
}

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('GitLab API MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
}) 