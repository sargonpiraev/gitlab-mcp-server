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
  baseURL: 'https://api.gitlab.com',
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
    const message = error.response?.data?.message || error.message
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

mcpServer.tool(
  'get-api-v4-groups-id-access-requests',
  `Gets a list of access requests for a group.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/access_requests`

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
  'post-api-v4-groups-id-access-requests',
  `Requests access for the authenticated user to a group.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/access_requests`

      const response = await apiClient.post(url, requestData)
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-access-requests-user-id-approve',
  `Approves an access request for the given user.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/access_requests/${user_id}/approve`

      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-access-requests-user-id',
  `Denies an access request for the given user.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/access_requests/${user_id}`

      const response = await apiClient.delete(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-epics-epic-iid-award-emoji',
  `List an awardable&#x27;s emoji reactions for groups`,
  {
    id: z.string(),
    epic_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, epic_iid, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/award_emoji`

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
  'post-api-v4-groups-id-epics-epic-iid-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, ...requestData } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/award_emoji`

      const response = await apiClient.post(url, requestData)
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-epics-epic-iid-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, award_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/award_emoji/${award_id}`

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
  'delete-api-v4-groups-id-epics-epic-iid-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, award_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/award_emoji/${award_id}`

      const response = await apiClient.delete(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji',
  `List an awardable&#x27;s emoji reactions for groups`,
  {
    id: z.string(),
    epic_iid: z.string(),
    note_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, epic_iid, note_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/notes/${note_id}/award_emoji`

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
  'post-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
    note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, note_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/notes/${note_id}/award_emoji`

      const response = await apiClient.post(url, requestData)
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('GitLab API MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
}) 