#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

// Load environment variables
dotenv.config()

// Environment configuration schema
const envSchema = z.object({
  GITLAB_TOKEN: z.string().min(1),
  //  TOOL_GLOB_PATTERNS: z.string().optional(),
  //  LOG_LEVEL: z.enum(['debug', 'info', 'notice', 'warning', 'error']).default('info').optional(),
})

// Parse and validate environment variables
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

// Axios client setup
const apiClient: AxiosInstance = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

// Add request interceptor for environment variables
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

// Tools
mcpServer.tool(
  'get-projects',
  `Get a list of visible projects for authenticated user`,
  {
    order_by: z.any().optional(),
    sort: z.any().optional(),
    archived: z.any().optional(),
    visibility: z.any().optional(),
    search: z.any().optional(),
    search_namespaces: z.any().optional(),
    owned: z.any().optional(),
    starred: z.any().optional(),
    imported: z.any().optional(),
    membership: z.any().optional(),
    with_issues_enabled: z.any().optional(),
    with_merge_requests_enabled: z.any().optional(),
    with_programming_language: z.any().optional(),
    min_access_level: z.any().optional(),
    id_after: z.any().optional(),
    id_before: z.any().optional(),
    last_activity_after: z.any().optional(),
    last_activity_before: z.any().optional(),
    repository_storage: z.any().optional(),
    topic: z.any().optional(),
    topic_id: z.any().optional(),
    updated_before: z.any().optional(),
    updated_after: z.any().optional(),
    include_pending_delete: z.any().optional(),
    marked_for_deletion_on: z.any().optional(),
    active: z.any().optional(),
    wiki_checksum_failed: z.any().optional(),
    repository_checksum_failed: z.any().optional(),
    include_hidden: z.any().optional(),
    page: z.any().optional(),
    per_page: z.any().optional(),
    simple: z.any().optional(),
    statistics: z.any().optional(),
    with_custom_attributes: z.any().optional(),
  },
  async (args) => {
    try {
      const response = await apiClient.get('/api/v4/projects', {
        params: args,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool('post-projects', `Create new project`, {}, async (args) => {
  try {
    const response = await apiClient.post('/api/v4/projects', args)
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool(
  'get-projects-by-id',
  `Get a single project`,
  {
    id: z.string().min(1),
    statistics: z.any().optional(),
    with_custom_attributes: z.any().optional(),
    license: z.any().optional(),
  },
  async (args) => {
    try {
      // Extract path parameters and query parameters
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}`

      const response = await apiClient.get(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-projects-by-id',
  `Update an existing project`,
  {
    id: z.string().min(1),
  },
  async (args) => {
    try {
      // Extract path parameters and request data
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}`

      const response = await apiClient.put(url, requestData)
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-projects-by-id',
  `Delete a project`,
  {
    id: z.string().min(1),
  },
  async (args) => {
    try {
      // Extract path parameters and query parameters
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}`

      const response = await apiClient.delete(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('GitLab MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
