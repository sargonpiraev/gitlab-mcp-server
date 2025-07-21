import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

dotenv.config()

export const envSchema = z.object({
  GITLAB_API_KEY: z.string(),
})

export const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/gitlab-mcp-server',
    version: 'v4',
  },
  {
    instructions: `MCP server for gitlab integration`,
    capabilities: {
      tools: {},
      logging: {},
    },
  }
)

export const env = envSchema.parse(process.env)

export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Accept': 'application/json'
  },
  timeout: 30000
})

apiClient.interceptors.request.use((config) => {
  if (env.GITLAB_API_KEY) {
    config.headers['Authorization'] = env.GITLAB_API_KEY
  }
  
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

// Register tools
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
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
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
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
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
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
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
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
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
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    epic_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, epic_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/epics/${epic_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-badges',
  `Gets a list of group badges viewable by the authenticated user.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    name: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/badges`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-badges',
  `Adds a badge to a group.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/badges`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-badges-render',
  `Preview a badge from a group.`,
  {
    id: z.string(),
    link_url: z.string(),
    image_url: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/badges/render`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-badges-badge-id',
  `Gets a badge of a group.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-badges-badge-id',
  `Updates a badge of a group.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-badges-badge-id',
  `Removes a badge from the group.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-custom-attributes',
  `Get all custom attributes on a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/custom_attributes`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-custom-attributes-key',
  `Get a custom attribute on a group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/groups/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-custom-attributes-key',
  `Set a custom attribute on a group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...requestData } = args
      const url = `/api/v4/groups/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-custom-attributes-key',
  `Delete a custom attribute on a group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/groups/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups',
  `Get a groups list`,
  {
    statistics: z.string().optional(),
    archived: z.string().optional(),
    skip_groups: z.string().optional(),
    all_available: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    owned: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    min_access_level: z.string().optional(),
    top_level_only: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    repository_storage: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/groups',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups',
  `Create a group. Available only for users who can create groups.`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/groups',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id',
  `Update a group. Available only for users who can administrate groups.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id',
  `Get a single group, with containing projects.`,
  {
    id: z.string(),
    with_custom_attributes: z.string().optional(),
    with_projects: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id',
  `Remove a group.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-archive',
  `Archive a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/archive`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-unarchive',
  `Unarchive a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/unarchive`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-restore',
  `Restore a group.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/restore`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-groups-shared',
  `Get a list of shared groups this group was invited to`,
  {
    id: z.string(),
    skip_groups: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    min_access_level: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/groups/shared`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-invited-groups',
  `Get a list of invited groups in this group`,
  {
    id: z.string(),
    relation: z.string().optional(),
    search: z.string().optional(),
    min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/invited_groups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-projects',
  `Get a list of projects in this group.`,
  {
    id: z.string(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    simple: z.string().optional(),
    owned: z.string().optional(),
    starred: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    with_shared: z.string().optional(),
    include_subgroups: z.string().optional(),
    include_ancestor_groups: z.string().optional(),
    min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
    with_security_reports: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/projects`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-projects-shared',
  `Get a list of shared projects in this group`,
  {
    id: z.string(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    simple: z.string().optional(),
    starred: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/projects/shared`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-subgroups',
  `Get a list of subgroups in this group.`,
  {
    id: z.string(),
    statistics: z.string().optional(),
    archived: z.string().optional(),
    skip_groups: z.string().optional(),
    all_available: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    owned: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    min_access_level: z.string().optional(),
    top_level_only: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    repository_storage: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/subgroups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-descendant-groups',
  `Get a list of descendant groups of this group.`,
  {
    id: z.string(),
    statistics: z.string().optional(),
    archived: z.string().optional(),
    skip_groups: z.string().optional(),
    all_available: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    owned: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    min_access_level: z.string().optional(),
    top_level_only: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    repository_storage: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/descendant_groups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-projects-project-id',
  `Transfer a project to the group namespace. Available only for admin.`,
  {
    id: z.string(),
    project_id: z.string(),
  },
  async (args) => {
    try {
      const { id, project_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/projects/${project_id}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-transfer-locations',
  `Get the groups to where the current group can be transferred to`,
  {
    id: z.string(),
    search: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/transfer_locations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-transfer',
  `Transfer a group to a new parent group or promote a subgroup to a top-level group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/transfer`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-share',
  `Share a group with a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/share`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-share-group-id',
  `DELETE /api/v4/groups/{id}/share/{group_id}`,
  {
    id: z.string(),
    group_id: z.string(),
  },
  async (args) => {
    try {
      const { id, group_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/share/${group_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-tokens-revoke',
  `Revoke a single token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/tokens/revoke`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-ldap-sync',
  `Sync a group with LDAP.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/ldap_sync`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-audit-events',
  `Get a list of audit events in this group.`,
  {
    id: z.string(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/audit_events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-audit-events-audit-event-id',
  `Get a specific audit event in this group.`,
  {
    id: z.string(),
    audit_event_id: z.string(),
  },
  async (args) => {
    try {
      const { id, audit_event_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/audit_events/${audit_event_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-saml-users',
  `Get a list of SAML users of the group`,
  {
    id: z.string(),
    username: z.string().optional(),
    search: z.string().optional(),
    active: z.string().optional(),
    blocked: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/saml_users`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-provisioned-users',
  `Get a list of users provisioned by the group`,
  {
    id: z.string(),
    username: z.string().optional(),
    search: z.string().optional(),
    active: z.string().optional(),
    blocked: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/provisioned_users`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-users',
  `Get a list of users for the group`,
  {
    id: z.string(),
    search: z.string().optional(),
    active: z.string().optional(),
    include_saml_users: z.string().optional(),
    include_service_accounts: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/users`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-ssh-certificates',
  `Get a list of Groups::SshCertificate for a Group.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/ssh_certificates`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-ssh-certificates',
  `Add a Groups::SshCertificate.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/ssh_certificates`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-ssh-certificates-ssh-certificates-id',
  `Removes an ssh certificate from a group.`,
  {
    id: z.string(),
    ssh_certificates_id: z.string(),
  },
  async (args) => {
    try {
      const { id, ssh_certificates_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/ssh_certificates/${ssh_certificates_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-runners',
  `List group&#x27;s runners`,
  {
    id: z.string(),
    type: z.string().optional(),
    paused: z.string().optional(),
    status: z.string().optional(),
    tag_list: z.string().optional(),
    version_prefix: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/runners`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-runners-reset-registration-token',
  `Reset the runner registration token for a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/runners/reset_registration_token`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-release-gpg',
  `The Release file signature`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/Release.gpg`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-release',
  `The unsigned Release file`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/Release`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-inrelease',
  `The signed Release file`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/InRelease`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-packages',
  `The installer (udeb) binary files index`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/debian-installer/binary-${architecture}/Packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-by-hash-sha256-file-sha256',
  `The installer (udeb) binary files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, file_sha256, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/debian-installer/binary-${architecture}/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-source-sources',
  `The source files index`,
  {
    id: z.string(),
    component: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/source/Sources`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-source-by-hash-sha256-file-sha256',
  `The source files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, file_sha256, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/source/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-binary-architecture-packages',
  `The binary files index`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/binary-${architecture}/Packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-dists*distribution-component-binary-architecture-by-hash-sha256-file-sha256',
  `The binary files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, file_sha256, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/dists/*distribution/${component}/binary-${architecture}/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-debian-pool-distribution-project-id-letter-package-name-package-version-file-name',
  `Download Debian package`,
  {
    id: z.string(),
    distribution: z.string(),
    project_id: z.string(),
    letter: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, distribution, project_id, letter, package_name, package_version, file_name, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/debian/pool/${distribution}/${project_id}/${letter}/${package_name}/${package_version}/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-dependency-proxy-cache',
  `Purge the dependency proxy for a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/dependency_proxy/cache`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-deploy-tokens',
  `List group deploy tokens`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    active: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/deploy_tokens`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-deploy-tokens',
  `Create a group deploy token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/deploy_tokens`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-deploy-tokens-token-id',
  `Get a group deploy token`,
  {
    id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, token_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/deploy_tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-deploy-tokens-token-id',
  `Delete a group deploy token`,
  {
    id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, token_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/deploy_tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-avatar',
  `Download the group avatar`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/avatar`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-clusters',
  `List group clusters`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/clusters`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-clusters-cluster-id',
  `Get a single group cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-clusters-cluster-id',
  `Edit group cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-clusters-cluster-id',
  `Delete group cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-clusters-user',
  `Add existing cluster to group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/clusters/user`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-registry-repositories',
  `List registry repositories within a group`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/registry/repositories`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-debian-distributions',
  `Create a Debian Distribution`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-debian-distributions',
  `Get a list of Debian Distributions`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    codename: z.string().optional(),
    suite: z.string().optional(),
    origin: z.string().optional(),
    label: z.string().optional(),
    version: z.string().optional(),
    description: z.string().optional(),
    valid_time_duration_seconds: z.string().optional(),
    components: z.string().optional(),
    architectures: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-debian-distributions-codename',
  `Get a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-debian-distributions-codename',
  `Update a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...requestData } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-debian-distributions-codename',
  `Delete a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
    suite: z.string().optional(),
    origin: z.string().optional(),
    label: z.string().optional(),
    version: z.string().optional(),
    description: z.string().optional(),
    valid_time_duration_seconds: z.string().optional(),
    components: z.string().optional(),
    architectures: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-debian-distributions-codename-key-asc',
  `Get a Debian Distribution Key`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/debian_distributions/${codename}/key.asc`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-export-download',
  `Download export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/export/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-export',
  `Start export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/export`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-export-relations',
  `Start relations export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/export_relations`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-export-relations-download',
  `Download relations export`,
  {
    id: z.string(),
    relation: z.string(),
    batched: z.string().optional(),
    batch_number: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/export_relations/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-export-relations-status',
  `Relations export status`,
  {
    id: z.string(),
    relation: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/export_relations/status`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-import-authorize',
  `Workhorse authorize the group import upload`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/groups/import/authorize',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-import',
  `Create a new group import`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/groups/import',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages',
  `List packages within a group`,
  {
    id: z.string(),
    exclude_subgroups: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    package_type: z.string().optional(),
    package_name: z.string().optional(),
    package_version: z.string().optional(),
    include_versionless: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-placeholder-reassignments',
  `Download the list of pending placeholder assignments for a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/placeholder_reassignments`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-placeholder-reassignments',
  `POST /api/v4/groups/{id}/placeholder_reassignments`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/placeholder_reassignments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-placeholder-reassignments-authorize',
  `Workhorse authorization for the reassignment CSV file`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/placeholder_reassignments/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-variables',
  `Get a list of group-level variables`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/variables`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-variables',
  `Create a new variable in a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/variables`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-variables-key',
  `Get the details of a group’s specific variable`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/groups/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-variables-key',
  `Update an existing variable from a group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...requestData } = args
      const url = `/api/v4/groups/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-variables-key',
  `Delete an existing variable from a group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/groups/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-integrations',
  `List all active integrations`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/integrations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-apple-app-store',
  `Create/Edit Apple App Store integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/apple-app-store`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-asana',
  `Create/Edit Asana integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/asana`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-assembla',
  `Create/Edit Assembla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/assembla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-bamboo',
  `Create/Edit Bamboo integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/bamboo`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-bugzilla',
  `Create/Edit Bugzilla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/bugzilla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-buildkite',
  `Create/Edit Buildkite integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/buildkite`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-campfire',
  `Create/Edit Campfire integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/campfire`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-confluence',
  `Create/Edit Confluence integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/confluence`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-custom-issue-tracker',
  `Create/Edit Custom Issue Tracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/custom-issue-tracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-datadog',
  `Create/Edit Datadog integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/datadog`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-diffblue-cover',
  `Create/Edit Diffblue Cover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/diffblue-cover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-discord',
  `Create/Edit Discord integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/discord`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-drone-ci',
  `Create/Edit Drone Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/drone-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-emails-on-push',
  `Create/Edit Emails On Push integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/emails-on-push`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-external-wiki',
  `Create/Edit External Wiki integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/external-wiki`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-gitlab-slack-application',
  `Create/Edit Gitlab Slack Application integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/gitlab-slack-application`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-google-play',
  `Create/Edit Google Play integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/google-play`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-hangouts-chat',
  `Create/Edit Hangouts Chat integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/hangouts-chat`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-harbor',
  `Create/Edit Harbor integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/harbor`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-irker',
  `Create/Edit Irker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/irker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-jenkins',
  `Create/Edit Jenkins integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/jenkins`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-jira',
  `Create/Edit Jira integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/jira`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-jira-cloud-app',
  `Create/Edit Jira Cloud App integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/jira-cloud-app`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-matrix',
  `Create/Edit Matrix integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/matrix`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-mattermost-slash-commands',
  `Create/Edit Mattermost Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/mattermost-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-slack-slash-commands',
  `Create/Edit Slack Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/slack-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-packagist',
  `Create/Edit Packagist integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/packagist`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-phorge',
  `Create/Edit Phorge integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/phorge`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-pipelines-email',
  `Create/Edit Pipelines Email integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/pipelines-email`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-pivotaltracker',
  `Create/Edit Pivotaltracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/pivotaltracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-pumble',
  `Create/Edit Pumble integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/pumble`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-pushover',
  `Create/Edit Pushover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/pushover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-redmine',
  `Create/Edit Redmine integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/redmine`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-ewm',
  `Create/Edit Ewm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/ewm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-youtrack',
  `Create/Edit Youtrack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/youtrack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-clickup',
  `Create/Edit Clickup integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/clickup`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-slack',
  `Create/Edit Slack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/slack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-microsoft-teams',
  `Create/Edit Microsoft Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/microsoft-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-mattermost',
  `Create/Edit Mattermost integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/mattermost`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-teamcity',
  `Create/Edit Teamcity integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/teamcity`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-telegram',
  `Create/Edit Telegram integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/telegram`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-unify-circuit',
  `Create/Edit Unify Circuit integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/unify-circuit`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-webex-teams',
  `Create/Edit Webex Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/webex-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-zentao',
  `Create/Edit Zentao integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/zentao`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-squash-tm',
  `Create/Edit Squash Tm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/squash-tm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-github',
  `Create/Edit Github integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/github`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-git-guardian',
  `Create/Edit Git Guardian integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/git-guardian`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-google-cloud-platform-artifact-registry',
  `Create/Edit Google Cloud Platform Artifact Registry integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/google-cloud-platform-artifact-registry`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-google-cloud-platform-workload-identity-federation',
  `Create/Edit Google Cloud Platform Workload Identity Federation integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/google-cloud-platform-workload-identity-federation`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-mock-ci',
  `Create/Edit Mock Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/mock-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-integrations-mock-monitoring',
  `Create/Edit Mock Monitoring integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/integrations/mock-monitoring`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-integrations-slug',
  `Disable an integration`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/groups/${id}/integrations/${slug}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-integrations-slug',
  `Get an integration settings`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/groups/${id}/integrations/${slug}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-invitations',
  `Invite non-members by email address to a group or project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/invitations`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-invitations',
  `Get a list of group or project invitations viewable by the authenticated user`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    query: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/invitations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-invitations-email',
  `Updates a group or project invitation.`,
  {
    id: z.string(),
    email: z.string(),
  },
  async (args) => {
    try {
      const { id, email, ...requestData } = args
      const url = `/api/v4/groups/${id}/invitations/${email}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-invitations-email',
  `Removes an invitation from a group or project.`,
  {
    id: z.string(),
    email: z.string(),
  },
  async (args) => {
    try {
      const { id, email, ...queryParams } = args
      const url = `/api/v4/groups/${id}/invitations/${email}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-uploads',
  `Get the list of uploads of a group`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/uploads`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-uploads-upload-id',
  `Download a single group upload by ID`,
  {
    id: z.string(),
    upload_id: z.string(),
  },
  async (args) => {
    try {
      const { id, upload_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/uploads/${upload_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-uploads-upload-id',
  `Delete a single group upload`,
  {
    id: z.string(),
    upload_id: z.string(),
  },
  async (args) => {
    try {
      const { id, upload_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/uploads/${upload_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-uploads-secret-filename',
  `Download a single project upload by secret and filename`,
  {
    id: z.string(),
    secret: z.string(),
    filename: z.string(),
  },
  async (args) => {
    try {
      const { id, secret, filename, ...queryParams } = args
      const url = `/api/v4/groups/${id}/uploads/${secret}/${filename}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-uploads-secret-filename',
  `Delete a single group upload by secret and filename`,
  {
    id: z.string(),
    secret: z.string(),
    filename: z.string(),
  },
  async (args) => {
    try {
      const { id, secret, filename, ...queryParams } = args
      const url = `/api/v4/groups/${id}/uploads/${secret}/${filename}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-maven*path-file-name',
  `Download the maven package file at a group level`,
  {
    id: z.string(),
    file_name: z.string(),
    path: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/maven/*path/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-members',
  `Gets a list of group or project members viewable by the authenticated user.`,
  {
    id: z.string(),
    query: z.string().optional(),
    user_ids: z.string().optional(),
    skip_users: z.string().optional(),
    show_seat_info: z.string().optional(),
    with_saml_identity: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-members',
  `Adds a member to a group or project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-members-all',
  `Gets a list of group or project members viewable by the authenticated user, including those who gained membership through ancestor group.`,
  {
    id: z.string(),
    query: z.string().optional(),
    user_ids: z.string().optional(),
    show_seat_info: z.string().optional(),
    state: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members/all`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-members-user-id',
  `Gets a member of a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-members-user-id',
  `Updates a member of a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-members-user-id',
  `Removes a user from a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
    skip_subresources: z.string().optional(),
    unassign_issuables: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-members-all-user-id',
  `Gets a member of a group or project, including those who gained membership through ancestor group`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members/all/${user_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-members-user-id-override',
  `Overrides the access level of an LDAP group member.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members/${user_id}/override`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-members-user-id-override',
  `Remove an LDAP group member access level override.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/members/${user_id}/override`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-members-member-id-approve',
  `Approves a pending member`,
  {
    id: z.string(),
    member_id: z.string(),
  },
  async (args) => {
    try {
      const { id, member_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members/${member_id}/approve`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-members-approve-all',
  `Approves all pending members`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members/approve_all`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-pending-members',
  `Lists all pending members for a group including invited users`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/pending_members`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-billable-members',
  `Gets a list of billable users of top-level group.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/billable_members`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-members-user-id-state',
  `Changes the state of the memberships of a user in the group`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/groups/${id}/members/${user_id}/state`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-billable-members-user-id-memberships',
  `Get the direct memberships of a billable user of a top-level group.`,
  {
    id: z.string(),
    user_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/billable_members/${user_id}/memberships`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-billable-members-user-id-indirect',
  `Get the indirect memberships of a billable user of a top-level group.`,
  {
    id: z.string(),
    user_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/billable_members/${user_id}/indirect`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-billable-members-user-id',
  `Removes a billable member from a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/billable_members/${user_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-merge-requests',
  `List group merge requests`,
  {
    id: z.string(),
    author_id: z.string().optional(),
    author_username: z.string().optional(),
    assignee_id: z.string().optional(),
    assignee_username: z.string().optional(),
    reviewer_username: z.string().optional(),
    labels: z.string().optional(),
    milestone: z.string().optional(),
    my_reaction_emoji: z.string().optional(),
    reviewer_id: z.string().optional(),
    state: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    with_labels_details: z.string().optional(),
    with_merge_status_recheck: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    updated_after: z.string().optional(),
    updated_before: z.string().optional(),
    view: z.string().optional(),
    scope: z.string().optional(),
    source_branch: z.string().optional(),
    source_project_id: z.string().optional(),
    target_branch: z.string().optional(),
    search: z.string().optional(),
    in: z.string().optional(),
    wip: z.string().optional(),
    not[author_id]: z.string().optional(),
    not[author_username]: z.string().optional(),
    not[assignee_id]: z.string().optional(),
    not[assignee_username]: z.string().optional(),
    not[reviewer_username]: z.string().optional(),
    not[labels]: z.string().optional(),
    not[milestone]: z.string().optional(),
    not[my_reaction_emoji]: z.string().optional(),
    not[reviewer_id]: z.string().optional(),
    deployed_before: z.string().optional(),
    deployed_after: z.string().optional(),
    environment: z.string().optional(),
    approved: z.string().optional(),
    merge_user_id: z.string().optional(),
    merge_user_username: z.string().optional(),
    approver_ids: z.string().optional(),
    approved_by_ids: z.string().optional(),
    approved_by_usernames: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    non_archived: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/merge_requests`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-npm-package*package-name-dist-tags',
  `Get all tags for a given an NPM package`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/-/package/*package_name/dist-tags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-packages-npm-package*package-name-dist-tags-tag',
  `Create or Update the given tag for the given NPM package and version`,
  {
    id: z.string(),
    tag: z.string(),
  },
  async (args) => {
    try {
      const { id, tag, ...requestData } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-packages-npm-package*package-name-dist-tags-tag',
  `Deletes the given tag`,
  {
    id: z.string(),
    tag: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-packages-npm-npm-v1-security-advisories-bulk',
  `NPM registry bulk advisory endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/-/npm/v1/security/advisories/bulk`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-packages-npm-npm-v1-security-audits-quick',
  `NPM registry quick audit endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/-/npm/v1/security/audits/quick`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-npm*package-name',
  `NPM registry metadata endpoint`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/npm/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-index',
  `The NuGet V3 Feed Service Index`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/index`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-symbolfiles*file-name*signature*same-file-name',
  `The NuGet Symbol File Download Endpoint`,
  {
    id: z.string(),
    file_name: z.string(),
    signature: z.string(),
    same_file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/symbolfiles/*file_name/*signature/*same_file_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-v2',
  `The NuGet V2 Feed Service Index`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/v2`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-v2$metadata',
  `The NuGet V2 Feed Package $metadata endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/v2/$metadata`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-metadata*package-name-index',
  `The NuGet Metadata Service - Package name level`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/metadata/*package_name/index`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-metadata*package-name*package-version',
  `The NuGet Metadata Service - Package name and version level`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/metadata/*package_name/*package_version`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-nuget-query',
  `The NuGet Search Service`,
  {
    id: z.string(),
    q: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
    prerelease: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/nuget/query`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-pypi-files-sha256*file-identifier',
  `Download a package file from a group`,
  {
    id: z.string(),
    sha256: z.string(),
    file_identifier: z.string(),
  },
  async (args) => {
    try {
      const { id, sha256, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/pypi/files/${sha256}/*file_identifier`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-pypi-simple',
  `The PyPi Simple Group Index Endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/pypi/simple`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-packages-pypi-simple*package-name',
  `The PyPi Simple Group Package Endpoint`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/-/packages/pypi/simple/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-releases',
  `List group releases`,
  {
    id: z.string(),
    sort: z.string().optional(),
    simple: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/releases`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-access-tokens-self-rotate',
  `Rotate a resource access token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/access_tokens/self/rotate`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-wikis',
  `Get a list of wiki pages`,
  {
    id: z.string(),
    with_content: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/groups/${id}/wikis`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-wikis',
  `Create a wiki page`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/wikis`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-groups-id-wikis-slug',
  `Get a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
    version: z.string().optional(),
    render_html: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/groups/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-groups-id-wikis-slug',
  `Update a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...requestData } = args
      const url = `/api/v4/groups/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-groups-id-wikis-slug',
  `Delete a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/groups/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-groups-id-wikis-attachments',
  `Upload an attachment to the wiki repository`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/groups/${id}/wikis/attachments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-access-requests',
  `Gets a list of access requests for a project.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/access_requests`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-access-requests',
  `Requests access for the authenticated user to a project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/access_requests`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-access-requests-user-id-approve',
  `Approves an access request for the given user.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/access_requests/${user_id}/approve`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-access-requests-user-id',
  `Denies an access request for the given user.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/access_requests/${user_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-authorize',
  `Workhorse authorize metric image file upload`,
  {
    id: z.string(),
    alert_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, alert_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/alert_management_alerts/${alert_iid}/metric_images/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images',
  `Upload a metric image for an alert`,
  {
    id: z.string(),
    alert_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, alert_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/alert_management_alerts/${alert_iid}/metric_images`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images',
  `Metric Images for alert`,
  {
    id: z.string(),
    alert_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, alert_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/alert_management_alerts/${alert_iid}/metric_images`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-metric-image-id',
  `Update a metric image for an alert`,
  {
    id: z.string(),
    alert_iid: z.string(),
    metric_image_id: z.string(),
  },
  async (args) => {
    try {
      const { id, alert_iid, metric_image_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/alert_management_alerts/${alert_iid}/metric_images/${metric_image_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-metric-image-id',
  `Remove a metric image for an alert`,
  {
    id: z.string(),
    alert_iid: z.string(),
    metric_image_id: z.string(),
  },
  async (args) => {
    try {
      const { id, alert_iid, metric_image_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/alert_management_alerts/${alert_iid}/metric_images/${metric_image_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    issue_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, issue_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-issues-issue-iid-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-issues-issue-iid-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    issue_iid: z.string(),
    note_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, issue_iid, note_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
    note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, note_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    issue_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    note_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, note_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, note_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    snippet_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-snippets-snippet-id-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-snippets-snippet-id-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji',
  `List an awardable&#x27;s emoji reactions for projects`,
  {
    id: z.string(),
    snippet_id: z.string(),
    note_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, snippet_id, note_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji',
  `Add a new emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
    note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, note_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/notes/${note_id}/award_emoji`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji-award-id',
  `Get a single emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji-award-id',
  `Delete an emoji reaction`,
  {
    id: z.string(),
    snippet_id: z.string(),
    note_id: z.string(),
    award_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, note_id, award_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/notes/${note_id}/award_emoji/${award_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-badges',
  `Gets a list of project badges viewable by the authenticated user.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    name: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/badges`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-badges',
  `Adds a badge to a project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/badges`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-badges-render',
  `Preview a badge from a project.`,
  {
    id: z.string(),
    link_url: z.string(),
    image_url: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/badges/render`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-badges-badge-id',
  `Gets a badge of a project.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-badges-badge-id',
  `Updates a badge of a project.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-badges-badge-id',
  `Removes a badge from the project.`,
  {
    id: z.string(),
    badge_id: z.string(),
  },
  async (args) => {
    try {
      const { id, badge_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/badges/${badge_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-branches',
  `Get a project repository branches`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    search: z.string().optional(),
    regex: z.string().optional(),
    sort: z.string().optional(),
    page_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/branches`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-branches',
  `Create branch`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/branches`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-branches-branch',
  `Get a single repository branch`,
  {
    id: z.string(),
    branch: z.string(),
  },
  async (args) => {
    try {
      const { id, branch, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/branches/${branch}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-repository-branches-branch',
  `Delete a branch`,
  {
    id: z.string(),
    branch: z.string(),
  },
  async (args) => {
    try {
      const { id, branch, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/branches/${branch}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-repository-branches-branch-protect',
  `Protect a single branch`,
  {
    id: z.string(),
    branch: z.string(),
  },
  async (args) => {
    try {
      const { id, branch, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/branches/${branch}/protect`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-repository-branches-branch-unprotect',
  `Unprotect a single branch`,
  {
    id: z.string(),
    branch: z.string(),
  },
  async (args) => {
    try {
      const { id, branch, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/branches/${branch}/unprotect`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-repository-merged-branches',
  `Delete all merged branches`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/merged_branches`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-catalog-publish',
  `Publish a new component project release as version to the CI/CD catalog`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/catalog/publish`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-artifacts-ref-name-download',
  `Download the artifacts archive from a job`,
  {
    id: z.string(),
    ref_name: z.string(),
    job: z.string(),
    job_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ref_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/artifacts/${ref_name}/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-artifacts-ref-name-raw*artifact-path',
  `Download a specific file from artifacts archive from a ref`,
  {
    id: z.string(),
    ref_name: z.string(),
    job: z.string(),
    artifact_path: z.string(),
    job_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ref_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/artifacts/${ref_name}/raw/*artifact_path`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-job-id-artifacts',
  `Download the artifacts archive from a job`,
  {
    id: z.string(),
    job_id: z.string(),
    job_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, job_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/artifacts`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-jobs-job-id-artifacts',
  `Delete the artifacts files from a job`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/artifacts`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-job-id-artifacts*artifact-path',
  `Download a specific file from artifacts archive`,
  {
    id: z.string(),
    job_id: z.string(),
    artifact_path: z.string(),
    job_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, job_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/artifacts/*artifact_path`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-jobs-job-id-artifacts-keep',
  `Keep the artifacts to prevent them from being deleted`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/artifacts/keep`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-artifacts',
  `Expire the artifacts files from a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/artifacts`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs',
  `Get a projects jobs`,
  {
    id: z.string(),
    scope: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-job-id',
  `Get a specific job of a project`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-jobs-job-id-trace',
  `Get a trace of a specific job of a project`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/trace`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-jobs-job-id-cancel',
  `Cancel a specific job of a project`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/cancel`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-jobs-job-id-retry',
  `Retry a specific job of a project`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/retry`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-jobs-job-id-erase',
  `Erase job (remove artifacts and the trace)`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/erase`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-jobs-job-id-play',
  `Trigger an actionable job (manual, delayed, etc)`,
  {
    id: z.string(),
    job_id: z.string(),
  },
  async (args) => {
    try {
      const { id, job_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/jobs/${job_id}/play`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-resource-groups',
  `Get all resource groups for a project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/resource_groups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-resource-groups-key',
  `Get a specific resource group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/resource_groups/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-resource-groups-key',
  `Edit an existing resource group`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/resource_groups/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-resource-groups-key-upcoming-jobs',
  `List upcoming jobs for a specific resource group`,
  {
    id: z.string(),
    key: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/resource_groups/${key}/upcoming_jobs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-runners',
  `List project&#x27;s runners`,
  {
    id: z.string(),
    scope: z.string().optional(),
    type: z.string().optional(),
    paused: z.string().optional(),
    status: z.string().optional(),
    tag_list: z.string().optional(),
    version_prefix: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/runners`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-runners',
  `Assign a runner to project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/runners`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-runners-runner-id',
  `Unassign a project runner from the project`,
  {
    id: z.string(),
    runner_id: z.string(),
  },
  async (args) => {
    try {
      const { id, runner_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/runners/${runner_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-runners-reset-registration-token',
  `Reset the runner registration token for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/runners/reset_registration_token`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-secure-files',
  `Get list of secure files in a project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/secure_files`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-secure-files',
  `Create a secure file`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/secure_files`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-secure-files-secure-file-id',
  `Get the details of a specific secure file in a project`,
  {
    id: z.string(),
    secure_file_id: z.string(),
  },
  async (args) => {
    try {
      const { id, secure_file_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/secure_files/${secure_file_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-secure-files-secure-file-id',
  `Remove a secure file`,
  {
    id: z.string(),
    secure_file_id: z.string(),
  },
  async (args) => {
    try {
      const { id, secure_file_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/secure_files/${secure_file_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-secure-files-secure-file-id-download',
  `Download secure file`,
  {
    id: z.string(),
    secure_file_id: z.string(),
  },
  async (args) => {
    try {
      const { id, secure_file_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/secure_files/${secure_file_id}/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines',
  `Get all Pipelines of the project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    scope: z.string().optional(),
    status: z.string().optional(),
    ref: z.string().optional(),
    sha: z.string().optional(),
    yaml_errors: z.string().optional(),
    username: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
    created_before: z.string().optional(),
    created_after: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    source: z.string().optional(),
    name: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipeline',
  `Create a new pipeline`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-latest',
  `Gets the latest pipeline for the project branch`,
  {
    id: z.string(),
    ref: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/latest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id',
  `Gets a specific pipeline for the project`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-pipelines-pipeline-id',
  `Deletes a pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id-jobs',
  `Get pipeline jobs`,
  {
    id: z.string(),
    pipeline_id: z.string(),
    include_retried: z.string().optional(),
    scope: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/jobs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id-bridges',
  `Get pipeline bridge jobs`,
  {
    id: z.string(),
    pipeline_id: z.string(),
    scope: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/bridges`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id-variables',
  `Gets the variables for a given pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/variables`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id-test-report',
  `Gets the test report for a given pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/test_report`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipelines-pipeline-id-test-report-summary',
  `Gets the test report summary for a given pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/test_report_summary`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-pipelines-pipeline-id-metadata',
  `Updates pipeline metadata`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/metadata`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipelines-pipeline-id-retry',
  `Retry builds in the pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/retry`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipelines-pipeline-id-cancel',
  `Cancel all builds in the pipeline`,
  {
    id: z.string(),
    pipeline_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipelines/${pipeline_id}/cancel`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipeline-schedules',
  `Get all pipeline schedules`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    scope: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipeline-schedules',
  `Create a new pipeline schedule`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id',
  `Get a single pipeline schedule`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id',
  `Edit a pipeline schedule`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id',
  `Delete a pipeline schedule`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-pipelines',
  `Get all pipelines triggered from a pipeline schedule`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/pipelines`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-take-ownership',
  `Take ownership of a pipeline schedule`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/take_ownership`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-play',
  `Play a scheduled pipeline immediately`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/play`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables',
  `Create a new pipeline schedule variable`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/variables`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables-key',
  `Edit a pipeline schedule variable`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables-key',
  `Delete a pipeline schedule variable`,
  {
    id: z.string(),
    pipeline_schedule_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, pipeline_schedule_id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pipeline_schedules/${pipeline_schedule_id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id(ref-ref)trigger-pipeline',
  `Trigger a GitLab project pipeline`,
  {
    id: z.string(),
    ref: z.string(),
  },
  async (args) => {
    try {
      const { id, ref, ...requestData } = args
      const url = `/api/v4/projects/${id}/(ref/${ref}/)trigger/pipeline`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-triggers',
  `Get trigger tokens list`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/triggers`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-triggers',
  `Create a trigger token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/triggers`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-triggers-trigger-id',
  `Get specific trigger token of a project`,
  {
    id: z.string(),
    trigger_id: z.string(),
  },
  async (args) => {
    try {
      const { id, trigger_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/triggers/${trigger_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-triggers-trigger-id',
  `Update a trigger token`,
  {
    id: z.string(),
    trigger_id: z.string(),
  },
  async (args) => {
    try {
      const { id, trigger_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/triggers/${trigger_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-triggers-trigger-id',
  `Delete a trigger token`,
  {
    id: z.string(),
    trigger_id: z.string(),
  },
  async (args) => {
    try {
      const { id, trigger_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/triggers/${trigger_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-variables',
  `Get project variables`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/variables`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-variables',
  `Create a new variable in a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/variables`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-variables-key',
  `Get the details of a single variable from a project`,
  {
    id: z.string(),
    key: z.string(),
    filter[environment_scope]: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-variables-key',
  `Update an existing variable from a project`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-variables-key',
  `Delete an existing variable from a project`,
  {
    id: z.string(),
    key: z.string(),
    filter[environment_scope]: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-cluster-agents-agent-id-tokens',
  `List tokens for an agent`,
  {
    id: z.string(),
    agent_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, agent_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}/tokens`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-cluster-agents-agent-id-tokens',
  `Create an agent token`,
  {
    id: z.string(),
    agent_id: z.string(),
  },
  async (args) => {
    try {
      const { id, agent_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}/tokens`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-cluster-agents-agent-id-tokens-token-id',
  `Get a single agent token`,
  {
    id: z.string(),
    agent_id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, agent_id, token_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}/tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-cluster-agents-agent-id-tokens-token-id',
  `Revoke an agent token`,
  {
    id: z.string(),
    agent_id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, agent_id, token_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}/tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-cluster-agents',
  `List the agents for a project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-cluster-agents',
  `Register an agent with a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/cluster_agents`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-cluster-agents-agent-id',
  `Get details about an agent`,
  {
    id: z.string(),
    agent_id: z.string(),
  },
  async (args) => {
    try {
      const { id, agent_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-cluster-agents-agent-id',
  `Delete a registered agent`,
  {
    id: z.string(),
    agent_id: z.string(),
  },
  async (args) => {
    try {
      const { id, agent_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/cluster_agents/${agent_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-cargo-config-json',
  `Get config.json`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/cargo/config.json`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits',
  `Get a project repository commits`,
  {
    id: z.string(),
    ref_name: z.string().optional(),
    since: z.string().optional(),
    until: z.string().optional(),
    path: z.string().optional(),
    author: z.string().optional(),
    all: z.string().optional(),
    with_stats: z.string().optional(),
    first_parent: z.string().optional(),
    order: z.string().optional(),
    trailers: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-commits',
  `Commit multiple file changes as one commit`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/commits`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha',
  `Get a specific commit of a project`,
  {
    id: z.string(),
    sha: z.string(),
    stats: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-diff',
  `Get the diff for a specific commit of a project`,
  {
    id: z.string(),
    sha: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    unidiff: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/diff`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-comments',
  `Get a commit&#x27;s comments`,
  {
    id: z.string(),
    sha: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/comments`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-commits-sha-comments',
  `Post comment to commit`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/comments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-sequence',
  `Get the sequence count of a commit SHA`,
  {
    id: z.string(),
    sha: z.string(),
    first_parent: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/sequence`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-commits-sha-cherry-pick',
  `Cherry pick commit into a branch`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/cherry_pick`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-commits-sha-revert',
  `Revert a commit in a branch`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/revert`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-refs',
  `Get all references a commit is pushed to`,
  {
    id: z.string(),
    sha: z.string(),
    type: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/refs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-merge-requests',
  `Get Merge Requests associated with a commit`,
  {
    id: z.string(),
    sha: z.string(),
    state: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/merge_requests`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-signature',
  `Get a commit&#x27;s signature`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/signature`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-commits-sha-statuses',
  `Get a commit&#x27;s statuses`,
  {
    id: z.string(),
    sha: z.string(),
    ref: z.string().optional(),
    stage: z.string().optional(),
    name: z.string().optional(),
    pipeline_id: z.string().optional(),
    all: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/commits/${sha}/statuses`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-statuses-sha',
  `Post status to a commit`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...requestData } = args
      const url = `/api/v4/projects/${id}/statuses/${sha}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-composer',
  `Composer packages endpoint for registering packages`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/composer`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-composer-archives*package-name',
  `Composer package endpoint to download a package archive`,
  {
    id: z.string(),
    sha: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/composer/archives/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-users-authenticate',
  `Authenticate user against conan CLI`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/users/authenticate`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-users-check-credentials',
  `Check for valid user credentials per conan CLI`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/users/check_credentials`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-search',
  `Search for packages`,
  {
    id: z.string(),
    q: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-search',
  `Get package references metadata`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-ping',
  `Ping the Conan API`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/ping`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference',
  `Package Snapshot`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel',
  `Recipe Snapshot`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel',
  `Delete Package`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-digest',
  `Package Digest`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/digest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-digest',
  `Recipe Digest`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/digest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-download-urls',
  `Package Download Urls`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/download_urls`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-download-urls',
  `Recipe Download Urls`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/download_urls`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-upload-urls',
  `Package Upload Urls`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, conan_package_reference, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/upload_urls`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-upload-urls',
  `Recipe Upload Urls`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/upload_urls`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name',
  `Download recipe files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name',
  `Upload recipe package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name-authorize',
  `Workhorse authorize the conan recipe file`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name',
  `Download package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name',
  `Upload package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name-authorize',
  `Workhorse authorize the conan package file`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-users-authenticate',
  `Authenticate user against conan CLI`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/users/authenticate`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-users-check-credentials',
  `Check for valid user credentials per conan CLI`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/users/check_credentials`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-search',
  `Search for packages`,
  {
    id: z.string(),
    q: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-search',
  `Get package references metadata`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-latest',
  `Get the latest recipe revision`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/latest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions',
  `Get the list of revisions`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision',
  `Delete recipe revision`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files',
  `List recipe files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/files`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name',
  `Download recipe files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/files/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name',
  `Upload recipe package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/files/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name-authorize',
  `Workhorse authorize the conan recipe file`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/files/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-search',
  `Get package references metadata`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-latest',
  `Get the latest package revision`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/latest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions',
  `Get the list of package revisions`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision',
  `Delete package revision`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions/${package_revision}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files',
  `List package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions/${package_revision}/files`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name',
  `Download package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions/${package_revision}/files/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name',
  `Upload package files`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions/${package_revision}/files/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name-authorize',
  `Workhorse authorize the conan package file`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/conan/v2/conans/${package_name}/${package_version}/${package_username}/${package_channel}/revisions/${recipe_revision}/packages/${conan_package_reference}/revisions/${package_revision}/files/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-release-gpg',
  `The Release file signature`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/Release.gpg`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-release',
  `The unsigned Release file`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/Release`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-inrelease',
  `The signed Release file`,
  {
    id: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/InRelease`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-packages',
  `The installer (udeb) binary files index`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/debian-installer/binary-${architecture}/Packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-by-hash-sha256-file-sha256',
  `The installer (udeb) binary files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, file_sha256, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/debian-installer/binary-${architecture}/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-source-sources',
  `The source files index`,
  {
    id: z.string(),
    component: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/source/Sources`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-source-by-hash-sha256-file-sha256',
  `The source files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, file_sha256, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/source/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-binary-architecture-packages',
  `The binary files index`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/binary-${architecture}/Packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-dists*distribution-component-binary-architecture-by-hash-sha256-file-sha256',
  `The binary files index by hash`,
  {
    id: z.string(),
    component: z.string(),
    architecture: z.string(),
    file_sha256: z.string(),
    distribution: z.string(),
  },
  async (args) => {
    try {
      const { id, component, architecture, file_sha256, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/dists/*distribution/${component}/binary-${architecture}/by-hash/SHA256/${file_sha256}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-debian-pool-distribution-letter-package-name-package-version-file-name',
  `Download Debian package`,
  {
    id: z.string(),
    distribution: z.string(),
    letter: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, distribution, letter, package_name, package_version, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/debian/pool/${distribution}/${letter}/${package_name}/${package_version}/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-debian-file-name',
  `Upload Debian package`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/debian/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-debian-file-name-authorize',
  `Authorize Debian package upload`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/debian/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deploy-keys',
  `List deploy keys for project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_keys`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-deploy-keys',
  `Add deploy key`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deploy_keys`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deploy-keys-key-id',
  `Get a single deploy key`,
  {
    id: z.string(),
    key_id: z.string(),
  },
  async (args) => {
    try {
      const { id, key_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_keys/${key_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-deploy-keys-key-id',
  `Update deploy key`,
  {
    id: z.string(),
    key_id: z.string(),
  },
  async (args) => {
    try {
      const { id, key_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deploy_keys/${key_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-deploy-keys-key-id',
  `Delete deploy key`,
  {
    id: z.string(),
    key_id: z.string(),
  },
  async (args) => {
    try {
      const { id, key_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_keys/${key_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-deploy-keys-key-id-enable',
  `Enable a deploy key`,
  {
    id: z.string(),
    key_id: z.string(),
  },
  async (args) => {
    try {
      const { id, key_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deploy_keys/${key_id}/enable`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deploy-tokens',
  `List project deploy tokens`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    active: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_tokens`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-deploy-tokens',
  `Create a project deploy token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deploy_tokens`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deploy-tokens-token-id',
  `Get a project deploy token`,
  {
    id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, token_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-deploy-tokens-token-id',
  `Delete a project deploy token`,
  {
    id: z.string(),
    token_id: z.string(),
  },
  async (args) => {
    try {
      const { id, token_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deploy_tokens/${token_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deployments',
  `List project deployments`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    updated_after: z.string().optional(),
    updated_before: z.string().optional(),
    finished_after: z.string().optional(),
    finished_before: z.string().optional(),
    environment: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deployments`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-deployments',
  `Create a deployment`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deployments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deployments-deployment-id',
  `Get a specific deployment`,
  {
    id: z.string(),
    deployment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, deployment_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deployments/${deployment_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-deployments-deployment-id',
  `Update a deployment`,
  {
    id: z.string(),
    deployment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, deployment_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deployments/${deployment_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-deployments-deployment-id',
  `Delete a specific deployment`,
  {
    id: z.string(),
    deployment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, deployment_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deployments/${deployment_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-deployments-deployment-id-merge-requests',
  `List of merge requests associated with a deployment`,
  {
    id: z.string(),
    deployment_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    author_id: z.string().optional(),
    author_username: z.string().optional(),
    assignee_id: z.string().optional(),
    assignee_username: z.string().optional(),
    reviewer_username: z.string().optional(),
    labels: z.string().optional(),
    milestone: z.string().optional(),
    my_reaction_emoji: z.string().optional(),
    reviewer_id: z.string().optional(),
    state: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    with_labels_details: z.string().optional(),
    with_merge_status_recheck: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    updated_after: z.string().optional(),
    updated_before: z.string().optional(),
    view: z.string().optional(),
    scope: z.string().optional(),
    source_branch: z.string().optional(),
    source_project_id: z.string().optional(),
    target_branch: z.string().optional(),
    search: z.string().optional(),
    in: z.string().optional(),
    wip: z.string().optional(),
    not[author_id]: z.string().optional(),
    not[author_username]: z.string().optional(),
    not[assignee_id]: z.string().optional(),
    not[assignee_username]: z.string().optional(),
    not[reviewer_username]: z.string().optional(),
    not[labels]: z.string().optional(),
    not[milestone]: z.string().optional(),
    not[my_reaction_emoji]: z.string().optional(),
    not[reviewer_id]: z.string().optional(),
    deployed_before: z.string().optional(),
    deployed_after: z.string().optional(),
    environment: z.string().optional(),
    approved: z.string().optional(),
    merge_user_id: z.string().optional(),
    merge_user_username: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, deployment_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/deployments/${deployment_id}/merge_requests`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-deployments-deployment-id-approval',
  `Approve or reject a blocked deployment`,
  {
    id: z.string(),
    deployment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, deployment_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/deployments/${deployment_id}/approval`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes',
  `Get a list of merge request draft notes`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes',
  `Create a new draft note`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id',
  `Get a single draft note`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    draft_note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, draft_note_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id',
  `Modify an existing draft note`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    draft_note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, draft_note_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id',
  `Delete a draft note`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    draft_note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, draft_note_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id-publish',
  `Publish a pending draft note`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    draft_note_id: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, draft_note_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}/publish`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-bulk-publish',
  `Bulk publish all pending draft notes`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/draft_notes/bulk_publish`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-environments',
  `List environments`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    name: z.string().optional(),
    search: z.string().optional(),
    states: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/environments`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-environments',
  `Create a new environment`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/environments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-environments-environment-id',
  `Update an existing environment`,
  {
    id: z.string(),
    environment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, environment_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/environments/${environment_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-environments-environment-id',
  `Delete an environment`,
  {
    id: z.string(),
    environment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, environment_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/environments/${environment_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-environments-environment-id',
  `Get a specific environment`,
  {
    id: z.string(),
    environment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, environment_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/environments/${environment_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-environments-review-apps',
  `Delete multiple stopped review apps`,
  {
    id: z.string(),
    before: z.string().optional(),
    limit: z.string().optional(),
    dry_run: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/environments/review_apps`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-environments-environment-id-stop',
  `Stop an environment`,
  {
    id: z.string(),
    environment_id: z.string(),
  },
  async (args) => {
    try {
      const { id, environment_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/environments/${environment_id}/stop`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-environments-stop-stale',
  `Stop stale environments`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/environments/stop_stale`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-error-tracking-client-keys',
  `List project client keys`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/error_tracking/client_keys`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-error-tracking-client-keys',
  `Create a client key`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/error_tracking/client_keys`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-error-tracking-client-keys-key-id',
  `Delete a client key`,
  {
    id: z.string(),
    key_id: z.string(),
  },
  async (args) => {
    try {
      const { id, key_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/error_tracking/client_keys/${key_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-error-tracking-settings',
  `Get Error Tracking settings`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/error_tracking/settings`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-error-tracking-settings',
  `Enable or disable the Error Tracking project settings`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/error_tracking/settings`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-error-tracking-settings',
  `Update Error Tracking project settings. Available in GitLab 15.10 and later.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/error_tracking/settings`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-feature-flags',
  `List feature flags for a project`,
  {
    id: z.string(),
    scope: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-feature-flags',
  `Create a new feature flag`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/feature_flags`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-feature-flags-feature-flag-name',
  `Get a single feature flag`,
  {
    id: z.string(),
    feature_flag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, feature_flag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags/${feature_flag_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-feature-flags-feature-flag-name',
  `Update a feature flag`,
  {
    id: z.string(),
    feature_flag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, feature_flag_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/feature_flags/${feature_flag_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-feature-flags-feature-flag-name',
  `Delete a feature flag`,
  {
    id: z.string(),
    feature_flag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, feature_flag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags/${feature_flag_name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-feature-flags-user-lists',
  `List all feature flag user lists for a project`,
  {
    id: z.string(),
    search: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags_user_lists`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-feature-flags-user-lists',
  `Create a feature flag user list`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/feature_flags_user_lists`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-feature-flags-user-lists-iid',
  `Get a feature flag user list`,
  {
    id: z.string(),
    iid: z.string(),
  },
  async (args) => {
    try {
      const { id, iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags_user_lists/${iid}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-feature-flags-user-lists-iid',
  `Update a feature flag user list`,
  {
    id: z.string(),
    iid: z.string(),
  },
  async (args) => {
    try {
      const { id, iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/feature_flags_user_lists/${iid}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-feature-flags-user-lists-iid',
  `Delete feature flag user list`,
  {
    id: z.string(),
    iid: z.string(),
  },
  async (args) => {
    try {
      const { id, iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/feature_flags_user_lists/${iid}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-files-file-path-blame',
  `Get blame file from the repository`,
  {
    id: z.string(),
    file_path: z.string(),
    ref: z.string(),
    range[start]: z.string(),
    range[end]: z.string(),
  },
  async (args) => {
    try {
      const { id, file_path, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}/blame`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-files-file-path-raw',
  `Get raw file contents from the repository`,
  {
    id: z.string(),
    file_path: z.string(),
    ref: z.string().optional(),
    lfs: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, file_path, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-files-file-path',
  `Get a file from the repository`,
  {
    id: z.string(),
    file_path: z.string(),
    ref: z.string(),
  },
  async (args) => {
    try {
      const { id, file_path, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-files-file-path',
  `Create new file in repository`,
  {
    id: z.string(),
    file_path: z.string(),
  },
  async (args) => {
    try {
      const { id, file_path, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-repository-files-file-path',
  `Update existing file in repository`,
  {
    id: z.string(),
    file_path: z.string(),
  },
  async (args) => {
    try {
      const { id, file_path, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-repository-files-file-path',
  `Delete an existing file in repository`,
  {
    id: z.string(),
    file_path: z.string(),
    branch: z.string(),
    commit_message: z.string(),
    start_branch: z.string().optional(),
    author_email: z.string().optional(),
    author_name: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, file_path, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/files/${file_path}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-freeze-periods',
  `List freeze periods`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/freeze_periods`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-freeze-periods',
  `Create a freeze period`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/freeze_periods`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-freeze-periods-freeze-period-id',
  `Get a freeze period`,
  {
    id: z.string(),
    freeze_period_id: z.string(),
  },
  async (args) => {
    try {
      const { id, freeze_period_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/freeze_periods/${freeze_period_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-freeze-periods-freeze-period-id',
  `Update a freeze period`,
  {
    id: z.string(),
    freeze_period_id: z.string(),
  },
  async (args) => {
    try {
      const { id, freeze_period_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/freeze_periods/${freeze_period_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-freeze-periods-freeze-period-id',
  `Delete a freeze period`,
  {
    id: z.string(),
    freeze_period_id: z.string(),
  },
  async (args) => {
    try {
      const { id, freeze_period_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/freeze_periods/${freeze_period_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name-authorize',
  `Workhorse authorize generic package file`,
  {
    id: z.string(),
    package_name: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/generic/${package_name}/*package_version/(*path/)${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name',
  `Upload package file`,
  {
    id: z.string(),
    package_name: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/generic/${package_name}/*package_version/(*path/)${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name',
  `Download package file`,
  {
    id: z.string(),
    package_name: z.string(),
    file_name: z.string(),
    package_version: z.string(),
    path: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, package_name, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/generic/${package_name}/*package_version/(*path/)${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-go*module-name@v-list',
  `List`,
  {
    id: z.string(),
    module_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/go/*module_name/@v/list`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-go*module-name@v-module-version-info',
  `Version metadata`,
  {
    id: z.string(),
    module_version: z.string(),
    module_name: z.string(),
  },
  async (args) => {
    try {
      const { id, module_version, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/go/*module_name/@v/${module_version}.info`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-go*module-name@v-module-version-mod',
  `Download module file`,
  {
    id: z.string(),
    module_version: z.string(),
    module_name: z.string(),
  },
  async (args) => {
    try {
      const { id, module_version, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/go/*module_name/@v/${module_version}.mod`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-go*module-name@v-module-version-zip',
  `Download module source`,
  {
    id: z.string(),
    module_version: z.string(),
    module_name: z.string(),
  },
  async (args) => {
    try {
      const { id, module_version, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/go/*module_name/@v/${module_version}.zip`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-helm-channel-index-yaml',
  `Download a chart index`,
  {
    id: z.string(),
    channel: z.string(),
  },
  async (args) => {
    try {
      const { id, channel, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/helm/${channel}/index.yaml`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-helm-channel-charts-file-name-tgz',
  `Download a chart`,
  {
    id: z.string(),
    channel: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, channel, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/helm/${channel}/charts/${file_name}.tgz`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-helm-api-channel-charts-authorize',
  `Authorize a chart upload from workhorse`,
  {
    id: z.string(),
    channel: z.string(),
  },
  async (args) => {
    try {
      const { id, channel, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/helm/api/${channel}/charts/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-helm-api-channel-charts',
  `Upload a chart`,
  {
    id: z.string(),
    channel: z.string(),
  },
  async (args) => {
    try {
      const { id, channel, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/helm/api/${channel}/charts`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-services',
  `List all active integrations`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/services`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-apple-app-store',
  `Create/Edit Apple App Store integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/apple-app-store`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-asana',
  `Create/Edit Asana integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/asana`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-assembla',
  `Create/Edit Assembla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/assembla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-bamboo',
  `Create/Edit Bamboo integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/bamboo`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-bugzilla',
  `Create/Edit Bugzilla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/bugzilla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-buildkite',
  `Create/Edit Buildkite integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/buildkite`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-campfire',
  `Create/Edit Campfire integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/campfire`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-confluence',
  `Create/Edit Confluence integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/confluence`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-custom-issue-tracker',
  `Create/Edit Custom Issue Tracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/custom-issue-tracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-datadog',
  `Create/Edit Datadog integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/datadog`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-diffblue-cover',
  `Create/Edit Diffblue Cover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/diffblue-cover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-discord',
  `Create/Edit Discord integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/discord`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-drone-ci',
  `Create/Edit Drone Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/drone-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-emails-on-push',
  `Create/Edit Emails On Push integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/emails-on-push`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-external-wiki',
  `Create/Edit External Wiki integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/external-wiki`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-gitlab-slack-application',
  `Create/Edit Gitlab Slack Application integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/gitlab-slack-application`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-google-play',
  `Create/Edit Google Play integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/google-play`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-hangouts-chat',
  `Create/Edit Hangouts Chat integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/hangouts-chat`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-harbor',
  `Create/Edit Harbor integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/harbor`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-irker',
  `Create/Edit Irker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/irker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-jenkins',
  `Create/Edit Jenkins integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/jenkins`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-jira',
  `Create/Edit Jira integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/jira`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-jira-cloud-app',
  `Create/Edit Jira Cloud App integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/jira-cloud-app`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-matrix',
  `Create/Edit Matrix integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/matrix`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-mattermost-slash-commands',
  `Create/Edit Mattermost Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/mattermost-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-slack-slash-commands',
  `Create/Edit Slack Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/slack-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-packagist',
  `Create/Edit Packagist integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/packagist`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-phorge',
  `Create/Edit Phorge integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/phorge`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-pipelines-email',
  `Create/Edit Pipelines Email integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/pipelines-email`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-pivotaltracker',
  `Create/Edit Pivotaltracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/pivotaltracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-pumble',
  `Create/Edit Pumble integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/pumble`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-pushover',
  `Create/Edit Pushover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/pushover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-redmine',
  `Create/Edit Redmine integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/redmine`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-ewm',
  `Create/Edit Ewm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/ewm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-youtrack',
  `Create/Edit Youtrack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/youtrack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-clickup',
  `Create/Edit Clickup integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/clickup`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-slack',
  `Create/Edit Slack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/slack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-microsoft-teams',
  `Create/Edit Microsoft Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/microsoft-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-mattermost',
  `Create/Edit Mattermost integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/mattermost`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-teamcity',
  `Create/Edit Teamcity integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/teamcity`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-telegram',
  `Create/Edit Telegram integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/telegram`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-unify-circuit',
  `Create/Edit Unify Circuit integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/unify-circuit`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-webex-teams',
  `Create/Edit Webex Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/webex-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-zentao',
  `Create/Edit Zentao integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/zentao`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-squash-tm',
  `Create/Edit Squash Tm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/squash-tm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-github',
  `Create/Edit Github integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/github`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-git-guardian',
  `Create/Edit Git Guardian integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/git-guardian`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-google-cloud-platform-artifact-registry',
  `Create/Edit Google Cloud Platform Artifact Registry integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/google-cloud-platform-artifact-registry`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-google-cloud-platform-workload-identity-federation',
  `Create/Edit Google Cloud Platform Workload Identity Federation integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/google-cloud-platform-workload-identity-federation`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-mock-ci',
  `Create/Edit Mock Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/mock-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-services-mock-monitoring',
  `Create/Edit Mock Monitoring integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/mock-monitoring`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-services-slug',
  `Disable an integration`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/services/${slug}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-services-slug',
  `Get an integration settings`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/services/${slug}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-services-mattermost-slash-commands-trigger',
  `Trigger a slash command for mattermost-slash-commands`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/mattermost_slash_commands/trigger`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-services-slack-slash-commands-trigger',
  `Trigger a slash command for slack-slash-commands`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/services/slack_slash_commands/trigger`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-integrations',
  `List all active integrations`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/integrations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-apple-app-store',
  `Create/Edit Apple App Store integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/apple-app-store`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-asana',
  `Create/Edit Asana integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/asana`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-assembla',
  `Create/Edit Assembla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/assembla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-bamboo',
  `Create/Edit Bamboo integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/bamboo`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-bugzilla',
  `Create/Edit Bugzilla integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/bugzilla`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-buildkite',
  `Create/Edit Buildkite integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/buildkite`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-campfire',
  `Create/Edit Campfire integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/campfire`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-confluence',
  `Create/Edit Confluence integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/confluence`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-custom-issue-tracker',
  `Create/Edit Custom Issue Tracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/custom-issue-tracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-datadog',
  `Create/Edit Datadog integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/datadog`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-diffblue-cover',
  `Create/Edit Diffblue Cover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/diffblue-cover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-discord',
  `Create/Edit Discord integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/discord`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-drone-ci',
  `Create/Edit Drone Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/drone-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-emails-on-push',
  `Create/Edit Emails On Push integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/emails-on-push`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-external-wiki',
  `Create/Edit External Wiki integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/external-wiki`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-gitlab-slack-application',
  `Create/Edit Gitlab Slack Application integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/gitlab-slack-application`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-google-play',
  `Create/Edit Google Play integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/google-play`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-hangouts-chat',
  `Create/Edit Hangouts Chat integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/hangouts-chat`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-harbor',
  `Create/Edit Harbor integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/harbor`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-irker',
  `Create/Edit Irker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/irker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-jenkins',
  `Create/Edit Jenkins integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/jenkins`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-jira',
  `Create/Edit Jira integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/jira`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-jira-cloud-app',
  `Create/Edit Jira Cloud App integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/jira-cloud-app`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-matrix',
  `Create/Edit Matrix integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/matrix`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-mattermost-slash-commands',
  `Create/Edit Mattermost Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/mattermost-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-slack-slash-commands',
  `Create/Edit Slack Slash Commands integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/slack-slash-commands`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-packagist',
  `Create/Edit Packagist integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/packagist`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-phorge',
  `Create/Edit Phorge integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/phorge`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-pipelines-email',
  `Create/Edit Pipelines Email integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/pipelines-email`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-pivotaltracker',
  `Create/Edit Pivotaltracker integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/pivotaltracker`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-pumble',
  `Create/Edit Pumble integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/pumble`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-pushover',
  `Create/Edit Pushover integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/pushover`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-redmine',
  `Create/Edit Redmine integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/redmine`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-ewm',
  `Create/Edit Ewm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/ewm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-youtrack',
  `Create/Edit Youtrack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/youtrack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-clickup',
  `Create/Edit Clickup integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/clickup`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-slack',
  `Create/Edit Slack integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/slack`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-microsoft-teams',
  `Create/Edit Microsoft Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/microsoft-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-mattermost',
  `Create/Edit Mattermost integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/mattermost`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-teamcity',
  `Create/Edit Teamcity integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/teamcity`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-telegram',
  `Create/Edit Telegram integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/telegram`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-unify-circuit',
  `Create/Edit Unify Circuit integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/unify-circuit`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-webex-teams',
  `Create/Edit Webex Teams integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/webex-teams`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-zentao',
  `Create/Edit Zentao integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/zentao`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-squash-tm',
  `Create/Edit Squash Tm integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/squash-tm`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-github',
  `Create/Edit Github integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/github`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-git-guardian',
  `Create/Edit Git Guardian integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/git-guardian`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-google-cloud-platform-artifact-registry',
  `Create/Edit Google Cloud Platform Artifact Registry integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/google-cloud-platform-artifact-registry`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-google-cloud-platform-workload-identity-federation',
  `Create/Edit Google Cloud Platform Workload Identity Federation integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/google-cloud-platform-workload-identity-federation`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-mock-ci',
  `Create/Edit Mock Ci integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/mock-ci`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-integrations-mock-monitoring',
  `Create/Edit Mock Monitoring integration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/mock-monitoring`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-integrations-slug',
  `Disable an integration`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/integrations/${slug}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-integrations-slug',
  `Get an integration settings`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/integrations/${slug}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-integrations-mattermost-slash-commands-trigger',
  `Trigger a slash command for mattermost-slash-commands`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/mattermost_slash_commands/trigger`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-integrations-slack-slash-commands-trigger',
  `Trigger a slash command for slack-slash-commands`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/integrations/slack_slash_commands/trigger`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-invitations',
  `Invite non-members by email address to a group or project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/invitations`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-invitations',
  `Get a list of group or project invitations viewable by the authenticated user`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    query: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/invitations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-invitations-email',
  `Updates a group or project invitation.`,
  {
    id: z.string(),
    email: z.string(),
  },
  async (args) => {
    try {
      const { id, email, ...requestData } = args
      const url = `/api/v4/projects/${id}/invitations/${email}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-invitations-email',
  `Removes an invitation from a group or project.`,
  {
    id: z.string(),
    email: z.string(),
  },
  async (args) => {
    try {
      const { id, email, ...queryParams } = args
      const url = `/api/v4/projects/${id}/invitations/${email}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-links',
  `List issue relations`,
  {
    id: z.string(),
    issue_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/links`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-issues-issue-iid-links',
  `Create an issue link`,
  {
    id: z.string(),
    issue_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/links`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-issue-iid-links-issue-link-id',
  `Get an issue link`,
  {
    id: z.string(),
    issue_iid: z.string(),
    issue_link_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, issue_link_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/links/${issue_link_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-issues-issue-iid-links-issue-link-id',
  `Delete an issue link`,
  {
    id: z.string(),
    issue_iid: z.string(),
    issue_link_id: z.string(),
  },
  async (args) => {
    try {
      const { id, issue_iid, issue_link_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${issue_iid}/links/${issue_link_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-ci-lint',
  `Validates a CI YAML configuration with a namespace`,
  {
    id: z.string(),
    sha: z.string().optional(),
    content_ref: z.string().optional(),
    dry_run: z.string().optional(),
    include_jobs: z.string().optional(),
    ref: z.string().optional(),
    dry_run_ref: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/ci/lint`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-ci-lint',
  `Validate a CI YAML configuration with a namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/ci/lint`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-uploads-authorize',
  `Workhorse authorize the file upload`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/uploads/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-uploads',
  `Upload a file`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/uploads`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-uploads',
  `Get the list of uploads of a project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/uploads`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-uploads-upload-id',
  `Download a single project upload by ID`,
  {
    id: z.string(),
    upload_id: z.string(),
  },
  async (args) => {
    try {
      const { id, upload_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/uploads/${upload_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-uploads-upload-id',
  `Delete a single project upload by ID`,
  {
    id: z.string(),
    upload_id: z.string(),
  },
  async (args) => {
    try {
      const { id, upload_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/uploads/${upload_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-uploads-secret-filename',
  `Download a single project upload by secret and filename`,
  {
    id: z.string(),
    secret: z.string(),
    filename: z.string(),
  },
  async (args) => {
    try {
      const { id, secret, filename, ...queryParams } = args
      const url = `/api/v4/projects/${id}/uploads/${secret}/${filename}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-uploads-secret-filename',
  `Delete a single project upload by secret and filename`,
  {
    id: z.string(),
    secret: z.string(),
    filename: z.string(),
  },
  async (args) => {
    try {
      const { id, secret, filename, ...queryParams } = args
      const url = `/api/v4/projects/${id}/uploads/${secret}/${filename}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-maven*path-file-name',
  `Download the maven package file at a project level`,
  {
    id: z.string(),
    file_name: z.string(),
    path: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/maven/*path/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-maven*path-file-name',
  `Upload the maven package file`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/maven/*path/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-maven*path-file-name-authorize',
  `Workhorse authorize the maven package file upload`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/maven/*path/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-members',
  `Gets a list of group or project members viewable by the authenticated user.`,
  {
    id: z.string(),
    query: z.string().optional(),
    user_ids: z.string().optional(),
    skip_users: z.string().optional(),
    show_seat_info: z.string().optional(),
    with_saml_identity: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/members`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-members',
  `Adds a member to a group or project.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/members`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-members-all',
  `Gets a list of group or project members viewable by the authenticated user, including those who gained membership through ancestor group.`,
  {
    id: z.string(),
    query: z.string().optional(),
    user_ids: z.string().optional(),
    show_seat_info: z.string().optional(),
    state: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/members/all`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-members-user-id',
  `Gets a member of a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-members-user-id',
  `Updates a member of a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-members-user-id',
  `Removes a user from a group or project.`,
  {
    id: z.string(),
    user_id: z.string(),
    skip_subresources: z.string().optional(),
    unassign_issuables: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/members/${user_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-members-all-user-id',
  `Gets a member of a group or project, including those who gained membership through ancestor group`,
  {
    id: z.string(),
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { id, user_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/members/all/${user_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-approvals',
  `List approvals for merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/approvals`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-approvals',
  `Deprecated in 16.0: Use the merge request approvals API instead. Change approval-related configuration`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/approvals`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-approve',
  `Approve a merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/approve`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-unapprove',
  `Remove an approval from a merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/unapprove`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid-reset-approvals',
  `Remove all merge request approvals`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/reset_approvals`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-approval-state',
  `Get approval state of merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/approval_state`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-create-ci-config',
  `Creates merge request for missing ci config in project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/create_ci_config`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-time-estimate',
  `Set a time estimate for a merge_request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/time_estimate`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-reset-time-estimate',
  `Reset the time estimate for a project merge_request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/reset_time_estimate`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-add-spent-time',
  `Add spent time for a merge_request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/add_spent_time`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-reset-spent-time',
  `Reset spent time for a merge_request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/reset_spent_time`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-time-stats',
  `Get time tracking stats`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/time_stats`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests',
  `List project merge requests`,
  {
    id: z.string(),
    author_id: z.string().optional(),
    author_username: z.string().optional(),
    assignee_id: z.string().optional(),
    assignee_username: z.string().optional(),
    reviewer_username: z.string().optional(),
    labels: z.string().optional(),
    milestone: z.string().optional(),
    my_reaction_emoji: z.string().optional(),
    reviewer_id: z.string().optional(),
    state: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    with_labels_details: z.string().optional(),
    with_merge_status_recheck: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    updated_after: z.string().optional(),
    updated_before: z.string().optional(),
    view: z.string().optional(),
    scope: z.string().optional(),
    source_branch: z.string().optional(),
    source_project_id: z.string().optional(),
    target_branch: z.string().optional(),
    search: z.string().optional(),
    in: z.string().optional(),
    wip: z.string().optional(),
    not[author_id]: z.string().optional(),
    not[author_username]: z.string().optional(),
    not[assignee_id]: z.string().optional(),
    not[assignee_username]: z.string().optional(),
    not[reviewer_username]: z.string().optional(),
    not[labels]: z.string().optional(),
    not[milestone]: z.string().optional(),
    not[my_reaction_emoji]: z.string().optional(),
    not[reviewer_id]: z.string().optional(),
    deployed_before: z.string().optional(),
    deployed_after: z.string().optional(),
    environment: z.string().optional(),
    approved: z.string().optional(),
    merge_user_id: z.string().optional(),
    merge_user_username: z.string().optional(),
    approver_ids: z.string().optional(),
    approved_by_ids: z.string().optional(),
    approved_by_usernames: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    iids: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests',
  `Create merge request`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-merge-requests-merge-request-iid',
  `Delete a merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid',
  `Get single merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    render_html: z.string().optional(),
    include_diverged_commits_count: z.string().optional(),
    include_rebase_in_progress: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid',
  `Update merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-participants',
  `Get single merge request participants`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/participants`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-reviewers',
  `Get single merge request reviewers`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/reviewers`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-commits',
  `Get single merge request commits`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/commits`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-context-commits',
  `List merge request context commits`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/context_commits`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-context-commits',
  `Create merge request context commits`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/context_commits`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-merge-requests-merge-request-iid-context-commits',
  `Delete merge request context commits`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    commits: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/context_commits`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-changes',
  `Get single merge request changes`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    unidiff: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/changes`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-diffs',
  `Get the merge request diffs`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    unidiff: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/diffs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-raw-diffs',
  `Get the merge request raw diffs`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/raw_diffs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-pipelines',
  `Get single merge request pipelines`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/pipelines`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-pipelines',
  `Create merge request pipeline`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/pipelines`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid-merge',
  `Merge a merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/merge`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-merge-ref',
  `Returns the up to date merge-ref HEAD commit`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/merge_ref`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-merge-requests-merge-request-iid-cancel-merge-when-pipeline-succeeds',
  `Cancel Merge When Pipeline Succeeds`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/cancel_merge_when_pipeline_succeeds`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-merge-requests-merge-request-iid-rebase',
  `Rebase a merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...requestData } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/rebase`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-closes-issues',
  `List issues that close on merge`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/closes_issues`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-related-issues',
  `List issues related to merge request`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/related_issues`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-versions',
  `Get a list of merge request diff versions`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/versions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-merge-request-iid-versions-version-id',
  `Get a single merge request diff version`,
  {
    id: z.string(),
    merge_request_iid: z.string(),
    version_id: z.string(),
    unidiff: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, merge_request_iid, version_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${merge_request_iid}/versions/${version_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name-authorize',
  `Workhorse authorize model package file`,
  {
    id: z.string(),
    model_version_id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, model_version_id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/ml_models/${model_version_id}/files/(*path/)${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name',
  `Workhorse upload model package file`,
  {
    id: z.string(),
    model_version_id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, model_version_id, file_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/ml_models/${model_version_id}/files/(*path/)${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name',
  `Download an ml_model package file`,
  {
    id: z.string(),
    model_version_id: z.string(),
    file_name: z.string(),
    path: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, model_version_id, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/ml_models/${model_version_id}/files/(*path/)${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-npm-package*package-name-dist-tags',
  `Get all tags for a given an NPM package`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/npm/-/package/*package_name/dist-tags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-npm-package*package-name-dist-tags-tag',
  `Create or Update the given tag for the given NPM package and version`,
  {
    id: z.string(),
    tag: z.string(),
  },
  async (args) => {
    try {
      const { id, tag, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-npm-package*package-name-dist-tags-tag',
  `Deletes the given tag`,
  {
    id: z.string(),
    tag: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-npm-npm-v1-security-advisories-bulk',
  `NPM registry bulk advisory endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/npm/-/npm/v1/security/advisories/bulk`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-npm-npm-v1-security-audits-quick',
  `NPM registry quick audit endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/npm/-/npm/v1/security/audits/quick`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-npm*package-name-*file-name',
  `Download the NPM tarball`,
  {
    id: z.string(),
    package_name: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/npm/*package_name/-/*file_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-npm-package-name',
  `Create or deprecate NPM package`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, package_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/npm/${package_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-npm*package-name',
  `NPM registry metadata endpoint`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/npm/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-index',
  `The NuGet V3 Feed Service Index`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/index`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-symbolfiles*file-name*signature*same-file-name',
  `The NuGet Symbol File Download Endpoint`,
  {
    id: z.string(),
    file_name: z.string(),
    signature: z.string(),
    same_file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/symbolfiles/*file_name/*signature/*same_file_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-v2',
  `The NuGet V2 Feed Service Index`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/v2`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget-v2',
  `The NuGet V2 Feed Package Publish endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget/v2`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-v2$metadata',
  `The NuGet V2 Feed Package $metadata endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/v2/$metadata`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-metadata*package-name-index',
  `The NuGet Metadata Service - Package name level`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/metadata/*package_name/index`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-metadata*package-name*package-version',
  `The NuGet Metadata Service - Package name and version level`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/metadata/*package_name/*package_version`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-query',
  `The NuGet Search Service`,
  {
    id: z.string(),
    q: z.string().optional(),
    skip: z.string().optional(),
    take: z.string().optional(),
    prerelease: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/query`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-download*package-name-index',
  `The NuGet Content Service - index request`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/download/*package_name/index`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-nuget-download*package-name*package-version*package-filename',
  `The NuGet Content Service - content request`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
    package_filename: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/download/*package_name/*package_version/*package_filename`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget',
  `The NuGet V3 Feed Package Publish endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget-authorize',
  `The NuGet Package Authorize endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget-symbolpackage',
  `The NuGet Symbol Package Publish endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget/symbolpackage`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget-symbolpackage-authorize',
  `The NuGet Symbol Package Authorize endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget/symbolpackage/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-nuget*package-name*package-version',
  `The NuGet Package Delete endpoint`,
  {
    id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/nuget/*package_name/*package_version`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-nuget-v2-authorize',
  `The NuGet V2 Feed Package Authorize endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/nuget/v2/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-project-id-packages-nuget-v2-findpackagesbyid\(\)',
  `The NuGet V2 Feed Find Packages by ID endpoint`,
  {
    project_id: z.string(),
    id: z.string(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/projects/${project_id}/packages/nuget/v2/FindPackagesById\(\)`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-project-id-packages-nuget-v2-packages\(\)',
  `The NuGet V2 Feed Enumerate Packages endpoint`,
  {
    project_id: z.string(),
    $filter: z.string(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/projects/${project_id}/packages/nuget/v2/Packages\(\)`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-project-id-packages-nuget-v2-packages\(id&#x3D;&#x27;*package-name&#x27;,version&#x3D;&#x27;*package-version&#x27;\)',
  `The NuGet V2 Feed Single Package Metadata endpoint`,
  {
    project_id: z.string(),
    package_name: z.string(),
    package_version: z.string(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/projects/${project_id}/packages/nuget/v2/Packages\(Id='*package_name',Version='*package_version'\)`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-package-id-package-files',
  `List package files`,
  {
    id: z.string(),
    package_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, package_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/${package_id}/package_files`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-package-id-package-files-package-file-id',
  `Delete a package file`,
  {
    id: z.string(),
    package_id: z.string(),
    package_file_id: z.string(),
  },
  async (args) => {
    try {
      const { id, package_id, package_file_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/${package_id}/package_files/${package_file_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-pages',
  `Unpublish pages`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-pages',
  `Update pages settings`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pages`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pages',
  `Get pages settings`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pages-domains',
  `Get all pages domains`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages/domains`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-pages-domains',
  `Create a new pages domain`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/pages/domains`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pages-domains-domain',
  `Get a single pages domain`,
  {
    id: z.string(),
    domain: z.string(),
  },
  async (args) => {
    try {
      const { id, domain, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages/domains/${domain}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-pages-domains-domain',
  `Updates a pages domain`,
  {
    id: z.string(),
    domain: z.string(),
  },
  async (args) => {
    try {
      const { id, domain, ...requestData } = args
      const url = `/api/v4/projects/${id}/pages/domains/${domain}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-pages-domains-domain',
  `Delete a pages domain`,
  {
    id: z.string(),
    domain: z.string(),
  },
  async (args) => {
    try {
      const { id, domain, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages/domains/${domain}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-pages-domains-domain-verify',
  `Verify a pages domain`,
  {
    id: z.string(),
    domain: z.string(),
  },
  async (args) => {
    try {
      const { id, domain, ...requestData } = args
      const url = `/api/v4/projects/${id}/pages/domains/${domain}/verify`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-avatar',
  `Download a project avatar`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/avatar`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-clusters',
  `List project clusters`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/clusters`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-clusters-cluster-id',
  `Get a single project cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-clusters-cluster-id',
  `Edit project cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-clusters-cluster-id',
  `Delete project cluster`,
  {
    id: z.string(),
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { id, cluster_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-clusters-user',
  `Add existing cluster to project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/clusters/user`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-registry-repositories',
  `List container repositories within a project`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    tags: z.string().optional(),
    tags_count: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-registry-repositories-repository-id',
  `Delete repository`,
  {
    id: z.string(),
    repository_id: z.string(),
  },
  async (args) => {
    try {
      const { id, repository_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories/${repository_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-registry-repositories-repository-id-tags',
  `List tags of a repository`,
  {
    id: z.string(),
    repository_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, repository_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories/${repository_id}/tags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-registry-repositories-repository-id-tags',
  `Delete repository tags (in bulk)`,
  {
    id: z.string(),
    repository_id: z.string(),
    name_regex_delete: z.string().optional(),
    name_regex: z.string().optional(),
    name_regex_keep: z.string().optional(),
    keep_n: z.string().optional(),
    older_than: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, repository_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories/${repository_id}/tags`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-registry-repositories-repository-id-tags-tag-name',
  `Get details about a repository tag`,
  {
    id: z.string(),
    repository_id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, repository_id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories/${repository_id}/tags/${tag_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-registry-repositories-repository-id-tags-tag-name',
  `Delete repository tag`,
  {
    id: z.string(),
    repository_id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, repository_id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/repositories/${repository_id}/tags/${tag_name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-registry-protection-repository-rules',
  `Get list of container registry protection rules for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/protection/repository/rules`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-registry-protection-repository-rules',
  `Create a container protection rule for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/registry/protection/repository/rules`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-registry-protection-repository-rules-protection-rule-id',
  `Update a container protection rule for a project`,
  {
    id: z.string(),
    protection_rule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, protection_rule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/registry/protection/repository/rules/${protection_rule_id}`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-registry-protection-repository-rules-protection-rule-id',
  `Delete container protection rule`,
  {
    id: z.string(),
    protection_rule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, protection_rule_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/registry/protection/repository/rules/${protection_rule_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-debian-distributions',
  `Create a Debian Distribution`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/debian_distributions`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-debian-distributions',
  `Get a list of Debian Distributions`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    codename: z.string().optional(),
    suite: z.string().optional(),
    origin: z.string().optional(),
    label: z.string().optional(),
    version: z.string().optional(),
    description: z.string().optional(),
    valid_time_duration_seconds: z.string().optional(),
    components: z.string().optional(),
    architectures: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/debian_distributions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-debian-distributions-codename',
  `Get a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/projects/${id}/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-debian-distributions-codename',
  `Update a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...requestData } = args
      const url = `/api/v4/projects/${id}/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-debian-distributions-codename',
  `Delete a Debian Distribution`,
  {
    id: z.string(),
    codename: z.string(),
    suite: z.string().optional(),
    origin: z.string().optional(),
    label: z.string().optional(),
    version: z.string().optional(),
    description: z.string().optional(),
    valid_time_duration_seconds: z.string().optional(),
    components: z.string().optional(),
    architectures: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/projects/${id}/debian_distributions/${codename}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-debian-distributions-codename-key-asc',
  `Get a Debian Distribution Key`,
  {
    id: z.string(),
    codename: z.string(),
  },
  async (args) => {
    try {
      const { id, codename, ...queryParams } = args
      const url = `/api/v4/projects/${id}/debian_distributions/${codename}/key.asc`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-events',
  `List a project&#x27;s visible events`,
  {
    id: z.string(),
    action: z.string().optional(),
    target_type: z.string().optional(),
    before: z.string().optional(),
    after: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-export',
  `Get export status`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/export`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-export',
  `Start export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/export`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-export-download',
  `Download export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/export/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-export-relations',
  `Start relations export`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/export_relations`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-export-relations-download',
  `Download relations export`,
  {
    id: z.string(),
    relation: z.string(),
    batched: z.string().optional(),
    batch_number: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/export_relations/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-export-relations-status',
  `Relations export status`,
  {
    id: z.string(),
    relation: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/export_relations/status`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-hooks-hook-id-url-variables-key',
  `Set a url variable`,
  {
    id: z.string(),
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/url_variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-hooks-hook-id-url-variables-key',
  `Un-Set a url variable`,
  {
    id: z.string(),
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/url_variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-hooks-hook-id-custom-headers-key',
  `Set a custom header`,
  {
    id: z.string(),
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/custom_headers/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-hooks-hook-id-custom-headers-key',
  `Un-Set a custom header`,
  {
    id: z.string(),
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/custom_headers/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-hooks',
  `List project hooks`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-hooks',
  `Add project hook`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-hooks-hook-id',
  `Get project hook`,
  {
    id: z.string(),
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-hooks-hook-id',
  `Edit project hook`,
  {
    id: z.string(),
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-hooks-hook-id',
  `Delete a project hook`,
  {
    id: z.string(),
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-hooks-hook-id-events',
  `Get events for a given hook id`,
  {
    id: z.string(),
    hook_id: z.string(),
    status: z.string().optional(),
    per_page: z.string().optional(),
    page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, hook_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-hooks-hook-id-test-trigger',
  `Triggers a hook test`,
  {
    id: z.string(),
    hook_id: z.string(),
    trigger: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, trigger, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/test/${trigger}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-hooks-hook-id-events-hook-log-id-resend',
  `Resend a webhook event`,
  {
    id: z.string(),
    hook_id: z.string(),
    hook_log_id: z.string(),
  },
  async (args) => {
    try {
      const { id, hook_id, hook_log_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/hooks/${hook_id}/events/${hook_log_id}/resend`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-import-authorize',
  `Workhorse authorize the project import upload`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/import/authorize',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-import',
  `Create a new project import`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/import',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-import',
  `Get a project import status`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/import`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-remote-import',
  `Create a new project import using a remote object storage path`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/remote-import',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-import-relation-authorize',
  `Workhorse authorize the project relation import upload`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/import-relation/authorize',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-import-relation',
  `Re-import a relation into a project`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/import-relation',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-relation-imports',
  `Get the statuses of relation imports for specified project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/relation-imports`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-remote-import-s3',
  `Create a new project import using a file from AWS S3`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects/remote-import-s3',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-job-token-scope',
  `Fetch CI_JOB_TOKEN access settings.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/job_token_scope`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-job-token-scope',
  `Patch CI_JOB_TOKEN access settings.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/job_token_scope`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-job-token-scope-allowlist',
  `Fetch project inbound allowlist for CI_JOB_TOKEN access settings.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/job_token_scope/allowlist`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-job-token-scope-allowlist',
  `Add target project to allowlist.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/job_token_scope/allowlist`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-job-token-scope-groups-allowlist',
  `Fetch project groups allowlist for CI_JOB_TOKEN access settings.`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/job_token_scope/groups_allowlist`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-job-token-scope-groups-allowlist',
  `Add target group to allowlist.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/job_token_scope/groups_allowlist`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-job-token-scope-groups-allowlist-target-group-id',
  `Delete target group from allowlist.`,
  {
    id: z.string(),
    target_group_id: z.string(),
  },
  async (args) => {
    try {
      const { id, target_group_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/job_token_scope/groups_allowlist/${target_group_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-job-token-scope-allowlist-target-project-id',
  `Delete project from allowlist.`,
  {
    id: z.string(),
    target_project_id: z.string(),
  },
  async (args) => {
    try {
      const { id, target_project_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/job_token_scope/allowlist/${target_project_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages',
  `Get a list of project packages`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    package_type: z.string().optional(),
    package_name: z.string().optional(),
    package_version: z.string().optional(),
    include_versionless: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-package-id',
  `Get a single project package`,
  {
    id: z.string(),
    package_id: z.string(),
  },
  async (args) => {
    try {
      const { id, package_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/${package_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-package-id',
  `Delete a project package`,
  {
    id: z.string(),
    package_id: z.string(),
  },
  async (args) => {
    try {
      const { id, package_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/${package_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-package-id-pipelines',
  `Get the pipelines for a single project package`,
  {
    id: z.string(),
    package_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    cursor: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, package_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/${package_id}/pipelines`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-protection-rules',
  `Get list of package protection rules for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/protection/rules`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-protection-rules',
  `Create a package protection rule for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/protection/rules`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-packages-protection-rules-package-protection-rule-id',
  `Update a package protection rule for a project`,
  {
    id: z.string(),
    package_protection_rule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, package_protection_rule_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/protection/rules/${package_protection_rule_id}`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-packages-protection-rules-package-protection-rule-id',
  `Delete package protection rule`,
  {
    id: z.string(),
    package_protection_rule_id: z.string(),
  },
  async (args) => {
    try {
      const { id, package_protection_rule_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/protection/rules/${package_protection_rule_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snapshot',
  `Download a (possibly inconsistent) snapshot of a repository`,
  {
    id: z.string(),
    wiki: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snapshot`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets',
  `Get all project snippets`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-snippets',
  `Create a new project snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/snippets`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id',
  `Get a single project snippet`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-snippets-snippet-id',
  `Update an existing project snippet`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-snippets-snippet-id',
  `Delete a project snippet`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-raw',
  `Get a raw project snippet`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-files-ref-file-path-raw',
  `Get raw project snippet file contents from the repository`,
  {
    id: z.string(),
    snippet_id: z.string(),
    ref: z.string(),
    file_path: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ref, file_path, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/files/${ref}/${file_path}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-snippets-snippet-id-user-agent-detail',
  `Get the user agent details for a project snippet`,
  {
    id: z.string(),
    snippet_id: z.string(),
  },
  async (args) => {
    try {
      const { id, snippet_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/snippets/${snippet_id}/user_agent_detail`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-statistics',
  `Get the list of project fetch statistics for the last 30 days`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/statistics`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-templates-type',
  `Get a list of templates available to this project`,
  {
    id: z.string(),
    type: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, type, ...queryParams } = args
      const url = `/api/v4/projects/${id}/templates/${type}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-templates-type-name',
  `Download a template available to this project`,
  {
    id: z.string(),
    type: z.string(),
    name: z.string(),
    source_template_project_id: z.string().optional(),
    project: z.string().optional(),
    fullname: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, type, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/templates/${type}/${name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-custom-attributes',
  `Get all custom attributes on a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/custom_attributes`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-custom-attributes-key',
  `Get a custom attribute on a project`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-custom-attributes-key',
  `Set a custom attribute on a project`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...requestData } = args
      const url = `/api/v4/projects/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-custom-attributes-key',
  `Delete a custom attribute on a project`,
  {
    id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { id, key, ...queryParams } = args
      const url = `/api/v4/projects/${id}/custom_attributes/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-restore',
  `Restore a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/restore`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects',
  `Get a list of visible projects for authenticated user`,
  {
    order_by: z.string().optional(),
    sort: z.string().optional(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    search_namespaces: z.string().optional(),
    owned: z.string().optional(),
    starred: z.string().optional(),
    imported: z.string().optional(),
    membership: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    with_programming_language: z.string().optional(),
    min_access_level: z.string().optional(),
    id_after: z.string().optional(),
    id_before: z.string().optional(),
    last_activity_after: z.string().optional(),
    last_activity_before: z.string().optional(),
    repository_storage: z.string().optional(),
    topic: z.string().optional(),
    topic_id: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
    include_pending_delete: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    wiki_checksum_failed: z.string().optional(),
    repository_checksum_failed: z.string().optional(),
    include_hidden: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    simple: z.string().optional(),
    statistics: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/projects',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects',
  `Create new project`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/projects',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-user-user-id',
  `Create new project for a specified user. Only available to admin users.`,
  {
    user_id: z.string(),
  },
  async (args) => {
    try {
      const { user_id, ...requestData } = args
      const url = `/api/v4/projects/user/${user_id}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-share-locations',
  `Returns group that can be shared with the given project`,
  {
    id: z.string(),
    search: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/share_locations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id',
  `Get a single project`,
  {
    id: z.string(),
    statistics: z.string().optional(),
    with_custom_attributes: z.string().optional(),
    license: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id',
  `Update an existing project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id',
  `Delete a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-fork',
  `Fork new project for the current user or provided namespace.`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/fork`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-fork',
  `Remove a forked_from relationship`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/fork`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-forks',
  `List forks of this project`,
  {
    id: z.string(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    search_namespaces: z.string().optional(),
    owned: z.string().optional(),
    starred: z.string().optional(),
    imported: z.string().optional(),
    membership: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    with_programming_language: z.string().optional(),
    min_access_level: z.string().optional(),
    id_after: z.string().optional(),
    id_before: z.string().optional(),
    last_activity_after: z.string().optional(),
    last_activity_before: z.string().optional(),
    repository_storage: z.string().optional(),
    topic: z.string().optional(),
    topic_id: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
    include_pending_delete: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    wiki_checksum_failed: z.string().optional(),
    repository_checksum_failed: z.string().optional(),
    include_hidden: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    simple: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/forks`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-pages-access',
  `Check pages access of this project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/pages_access`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-archive',
  `Archive a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/archive`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-unarchive',
  `Unarchive a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/unarchive`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-star',
  `Star a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/star`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-unstar',
  `Unstar a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/unstar`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-starrers',
  `Get the users who starred a project`,
  {
    id: z.string(),
    search: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/starrers`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-languages',
  `Get languages in project repository`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/languages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-fork-forked-from-id',
  `Mark this project as forked from another`,
  {
    id: z.string(),
    forked_from_id: z.string(),
  },
  async (args) => {
    try {
      const { id, forked_from_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/fork/${forked_from_id}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-share',
  `Share the project with a group`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/share`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-share-group-id',
  `Remove a group share`,
  {
    id: z.string(),
    group_id: z.string(),
  },
  async (args) => {
    try {
      const { id, group_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/share/${group_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-import-project-members-project-id',
  `Import members from another project`,
  {
    id: z.string(),
    project_id: z.string(),
  },
  async (args) => {
    try {
      const { id, project_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/import_project_members/${project_id}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-users',
  `Get the users list of a project`,
  {
    id: z.string(),
    search: z.string().optional(),
    skip_users: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/users`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-groups',
  `Get ancestor and shared groups for a project`,
  {
    id: z.string(),
    search: z.string().optional(),
    skip_groups: z.string().optional(),
    with_shared: z.string().optional(),
    shared_visible_only: z.string().optional(),
    shared_min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/groups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-invited-groups',
  `Get a list of invited groups in this project`,
  {
    id: z.string(),
    relation: z.string().optional(),
    search: z.string().optional(),
    min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/invited_groups`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-housekeeping',
  `Start the housekeeping task for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/housekeeping`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-size',
  `Start a task to recalculate repository size for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository_size`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-transfer',
  `Transfer a project to a new namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/transfer`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-transfer-locations',
  `Get the namespaces to where the project can be transferred`,
  {
    id: z.string(),
    search: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/transfer_locations`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-storage',
  `Show the storage information`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/storage`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-audit-events',
  `Get a list of audit events in this project.`,
  {
    id: z.string(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/audit_events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-audit-events-audit-event-id',
  `Get a specific audit event in this project.`,
  {
    id: z.string(),
    audit_event_id: z.string(),
  },
  async (args) => {
    try {
      const { id, audit_event_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/audit_events/${audit_event_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-protected-branches',
  `Get a project&#x27;s protected branches`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    search: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_branches`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-protected-branches',
  `Protect a single branch`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/protected_branches`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-protected-branches-name',
  `Get a single protected branch`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_branches/${name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-projects-id-protected-branches-name',
  `Update a protected branch`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...requestData } = args
      const url = `/api/v4/projects/${id}/protected_branches/${name}`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-protected-branches-name',
  `Unprotect a single branch`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_branches/${name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-protected-tags',
  `Get a project&#x27;s protected tags`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_tags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-protected-tags',
  `Protect a single tag or wildcard`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/protected_tags`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-protected-tags-name',
  `Get a single protected tag`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_tags/${name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-protected-tags-name',
  `Unprotect a single tag`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/protected_tags/${name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-pypi-files-sha256*file-identifier',
  `The PyPi package download endpoint`,
  {
    id: z.string(),
    sha256: z.string(),
    file_identifier: z.string(),
  },
  async (args) => {
    try {
      const { id, sha256, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/pypi/files/${sha256}/*file_identifier`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-pypi-simple',
  `The PyPi Simple Project Index Endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/pypi/simple`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-pypi-simple*package-name',
  `The PyPi Simple Project Package Endpoint`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/pypi/simple/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-pypi',
  `The PyPi Package upload endpoint`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/pypi`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-pypi-authorize',
  `Authorize the PyPi package upload from workhorse`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/pypi/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases',
  `List Releases`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    include_html_description: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-releases',
  `Create a release`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/releases`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases-tag-name',
  `Get a release by a tag name`,
  {
    id: z.string(),
    tag_name: z.string(),
    include_html_description: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-releases-tag-name',
  `Update a release`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-releases-tag-name',
  `Delete a release`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases-tag-name-downloads*direct-asset-path',
  `Download a project release asset file`,
  {
    id: z.string(),
    tag_name: z.string(),
    direct_asset_path: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/downloads/*direct_asset_path`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases-permalink-latest()(*suffix-path)',
  `Get the latest project release`,
  {
    id: z.string(),
    suffix_path: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/permalink/latest(/)(*suffix_path)`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-releases-tag-name-evidence',
  `Collect release evidence`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/evidence`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases-tag-name-assets-links',
  `List links of a release`,
  {
    id: z.string(),
    tag_name: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/assets/links`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-releases-tag-name-assets-links',
  `Create a release link`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...requestData } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/assets/links`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-releases-tag-name-assets-links-link-id',
  `Get a release link`,
  {
    id: z.string(),
    tag_name: z.string(),
    link_id: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, link_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/assets/links/${link_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-releases-tag-name-assets-links-link-id',
  `Update a release link`,
  {
    id: z.string(),
    tag_name: z.string(),
    link_id: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, link_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/assets/links/${link_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-releases-tag-name-assets-links-link-id',
  `Delete a release link`,
  {
    id: z.string(),
    tag_name: z.string(),
    link_id: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, link_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/releases/${tag_name}/assets/links/${link_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-remote-mirrors',
  `List the project&#x27;s remote mirrors`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/remote_mirrors`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-remote-mirrors',
  `Create remote mirror for a project`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/remote_mirrors`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-remote-mirrors-mirror-id',
  `Get a single remote mirror`,
  {
    id: z.string(),
    mirror_id: z.string(),
  },
  async (args) => {
    try {
      const { id, mirror_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/remote_mirrors/${mirror_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-remote-mirrors-mirror-id',
  `Update the attributes of a single remote mirror`,
  {
    id: z.string(),
    mirror_id: z.string(),
  },
  async (args) => {
    try {
      const { id, mirror_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/remote_mirrors/${mirror_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-remote-mirrors-mirror-id',
  `Delete a single remote mirror`,
  {
    id: z.string(),
    mirror_id: z.string(),
  },
  async (args) => {
    try {
      const { id, mirror_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/remote_mirrors/${mirror_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-remote-mirrors-mirror-id-sync',
  `Triggers a push mirror operation`,
  {
    id: z.string(),
    mirror_id: z.string(),
  },
  async (args) => {
    try {
      const { id, mirror_id, ...requestData } = args
      const url = `/api/v4/projects/${id}/remote_mirrors/${mirror_id}/sync`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-remote-mirrors-mirror-id-public-key',
  `Get the public key of a single remote mirror`,
  {
    id: z.string(),
    mirror_id: z.string(),
  },
  async (args) => {
    try {
      const { id, mirror_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/remote_mirrors/${mirror_id}/public_key`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-tree',
  `Get a project repository tree`,
  {
    id: z.string(),
    ref: z.string().optional(),
    path: z.string().optional(),
    recursive: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    pagination: z.string().optional(),
    page_token: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/tree`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-blobs-sha-raw',
  `Get raw blob contents from the repository`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/blobs/${sha}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-blobs-sha',
  `Get a blob from the repository`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/blobs/${sha}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-archive',
  `Get an archive of the repository`,
  {
    id: z.string(),
    sha: z.string().optional(),
    format: z.string().optional(),
    path: z.string().optional(),
    include_lfs_blobs: z.string().optional(),
    exclude_paths: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/archive`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-compare',
  `Compare two branches, tags, or commits`,
  {
    id: z.string(),
    from: z.string(),
    to: z.string(),
    from_project_id: z.string().optional(),
    straight: z.string().optional(),
    unidiff: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/compare`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-health',
  `Get repository health`,
  {
    id: z.string(),
    generate: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/health`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-contributors',
  `Get repository contributors`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    ref: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/contributors`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-merge-base',
  `Get the common ancestor between commits`,
  {
    id: z.string(),
    refs: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/merge_base`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-changelog',
  `Generates a changelog section for a release and returns it`,
  {
    id: z.string(),
    version: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
    date: z.string().optional(),
    trailer: z.string().optional(),
    config_file: z.string().optional(),
    config_file_ref: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/changelog`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-changelog',
  `Generates a changelog section for a release and commits it in a changelog file`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/changelog`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-access-tokens-self-rotate',
  `Rotate a resource access token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/access_tokens/self/rotate`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-eventable-id-resource-milestone-events',
  `List project Issue milestone events`,
  {
    id: z.string(),
    eventable_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, eventable_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${eventable_id}/resource_milestone_events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-issues-eventable-id-resource-milestone-events-event-id',
  `Get single Issue milestone event`,
  {
    id: z.string(),
    eventable_id: z.string(),
    event_id: z.string(),
  },
  async (args) => {
    try {
      const { id, eventable_id, event_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/issues/${eventable_id}/resource_milestone_events/${event_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-eventable-id-resource-milestone-events',
  `List project Merge request milestone events`,
  {
    id: z.string(),
    eventable_id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, eventable_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${eventable_id}/resource_milestone_events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-merge-requests-eventable-id-resource-milestone-events-event-id',
  `Get single Merge request milestone event`,
  {
    id: z.string(),
    eventable_id: z.string(),
    event_id: z.string(),
  },
  async (args) => {
    try {
      const { id, eventable_id, event_id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/merge_requests/${eventable_id}/resource_milestone_events/${event_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rpm-repodata*file-name',
  `Download repository metadata files`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rpm/repodata/*file_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rpm*package-file-id*file-name',
  `Download RPM package files`,
  {
    id: z.string(),
    package_file_id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rpm/*package_file_id/*file_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-rpm',
  `Upload a RPM package`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/rpm`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-rpm-authorize',
  `Authorize package upload from workhorse`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/rpm/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rubygems-file-name',
  `Download the spec index file`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rubygems-quick-marshal48-file-name',
  `Download the gemspec file`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/quick/Marshal.4.8/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rubygems-gems-file-name',
  `Download the .gem package`,
  {
    id: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { id, file_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/gems/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-rubygems-api-v1-gems-authorize',
  `Authorize a gem upload from workhorse`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/api/v1/gems/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-packages-rubygems-api-v1-gems',
  `Upload a gem`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/api/v1/gems`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-rubygems-api-v1-dependencies',
  `Fetch a list of dependencies`,
  {
    id: z.string(),
    gems: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/rubygems/api/v1/dependencies`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-repository-submodules-submodule',
  `Update existing submodule reference in repository`,
  {
    id: z.string(),
    submodule: z.string(),
  },
  async (args) => {
    try {
      const { id, submodule, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/submodules/${submodule}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-tags',
  `Get a project repository tags`,
  {
    id: z.string(),
    sort: z.string().optional(),
    order_by: z.string().optional(),
    search: z.string().optional(),
    page_token: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/tags`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-repository-tags',
  `Create a new repository tag`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/repository/tags`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-tags-tag-name',
  `Get a single repository tag`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/tags/${tag_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-repository-tags-tag-name',
  `Delete a repository tag`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/tags/${tag_name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-repository-tags-tag-name-signature',
  `Get a tag&#x27;s signature`,
  {
    id: z.string(),
    tag_name: z.string(),
  },
  async (args) => {
    try {
      const { id, tag_name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/repository/tags/${tag_name}/signature`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-terraform-modules-module-name-module-system',
  `Download the latest version of a module`,
  {
    id: z.string(),
    module_name: z.string(),
    module_system: z.string(),
    terraform-get: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/terraform/modules/${module_name}/${module_system}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version',
  `Download a specific version of a module`,
  {
    id: z.string(),
    module_name: z.string(),
    module_system: z.string(),
    module_version: z.string(),
    terraform-get: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/projects/${id}/packages/terraform/modules/${module_name}/${module_system}/*module_version`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version-file-authorize',
  `Workhorse authorize Terraform Module package file`,
  {
    id: z.string(),
    module_name: z.string(),
    module_system: z.string(),
  },
  async (args) => {
    try {
      const { id, module_name, module_system, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/terraform/modules/${module_name}/${module_system}/*module_version/file/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version-file',
  `Upload Terraform Module package file`,
  {
    id: z.string(),
    module_name: z.string(),
    module_system: z.string(),
  },
  async (args) => {
    try {
      const { id, module_name, module_system, ...requestData } = args
      const url = `/api/v4/projects/${id}/packages/terraform/modules/${module_name}/${module_system}/*module_version/file`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-terraform-state-name',
  `Get a Terraform state by its name`,
  {
    id: z.string(),
    name: z.string(),
    ID: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-terraform-state-name',
  `Add a new Terraform state or update an existing one`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...requestData } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-terraform-state-name',
  `Delete a Terraform state of a certain name`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-terraform-state-name-lock',
  `Lock a Terraform state of a certain name`,
  {
    id: z.string(),
    name: z.string(),
  },
  async (args) => {
    try {
      const { id, name, ...requestData } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}/lock`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-terraform-state-name-lock',
  `Unlock a Terraform state of a certain name`,
  {
    id: z.string(),
    name: z.string(),
    ID: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, name, ...queryParams } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}/lock`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-terraform-state-name-versions-serial',
  `Get a Terraform state version`,
  {
    id: z.string(),
    name: z.string(),
    serial: z.string(),
  },
  async (args) => {
    try {
      const { id, name, serial, ...queryParams } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}/versions/${serial}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-terraform-state-name-versions-serial',
  `Delete a Terraform state version`,
  {
    id: z.string(),
    name: z.string(),
    serial: z.string(),
  },
  async (args) => {
    try {
      const { id, name, serial, ...queryParams } = args
      const url = `/api/v4/projects/${id}/terraform/state/${name}/versions/${serial}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-wikis',
  `Get a list of wiki pages`,
  {
    id: z.string(),
    with_content: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/projects/${id}/wikis`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-wikis',
  `Create a wiki page`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/wikis`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-projects-id-wikis-slug',
  `Get a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
    version: z.string().optional(),
    render_html: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-projects-id-wikis-slug',
  `Update a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...requestData } = args
      const url = `/api/v4/projects/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-projects-id-wikis-slug',
  `Delete a wiki page`,
  {
    id: z.string(),
    slug: z.string(),
  },
  async (args) => {
    try {
      const { id, slug, ...queryParams } = args
      const url = `/api/v4/projects/${id}/wikis/${slug}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-projects-id-wikis-attachments',
  `Upload an attachment to the wiki repository`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/projects/${id}/wikis/attachments`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-batched-background-migrations-id',
  `Retrieve a batched background migration`,
  {
    id: z.string(),
    database: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/admin/batched_background_migrations/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-admin-batched-background-migrations-id-resume',
  `Resume a batched background migration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/admin/batched_background_migrations/${id}/resume`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-admin-batched-background-migrations-id-pause',
  `Pause a batched background migration`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/admin/batched_background_migrations/${id}/pause`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-batched-background-migrations',
  `Get the list of batched background migrations`,
  {
    database: z.string().optional(),
    job_class_name: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/admin/batched_background_migrations',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-ci-variables',
  `List all instance-level variables`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/admin/ci/variables',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-admin-ci-variables',
  `Create a new instance-level variable`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/admin/ci/variables',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-ci-variables-key',
  `Get the details of a specific instance-level variable`,
  {
    key: z.string(),
  },
  async (args) => {
    try {
      const { key, ...queryParams } = args
      const url = `/api/v4/admin/ci/variables/${key}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-admin-ci-variables-key',
  `Update an instance-level variable`,
  {
    key: z.string(),
  },
  async (args) => {
    try {
      const { key, ...requestData } = args
      const url = `/api/v4/admin/ci/variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-admin-ci-variables-key',
  `Delete an existing instance-level variable`,
  {
    key: z.string(),
  },
  async (args) => {
    try {
      const { key, ...queryParams } = args
      const url = `/api/v4/admin/ci/variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-databases-database-name-dictionary-tables-table-name',
  `Retrieve dictionary details`,
  {
    database_name: z.string(),
    table_name: z.string(),
  },
  async (args) => {
    try {
      const { database_name, table_name, ...queryParams } = args
      const url = `/api/v4/admin/databases/${database_name}/dictionary/tables/${table_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-clusters',
  `List instance clusters`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/admin/clusters',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-admin-clusters-cluster-id',
  `Get a single instance cluster`,
  {
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { cluster_id, ...queryParams } = args
      const url = `/api/v4/admin/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-admin-clusters-cluster-id',
  `Edit instance cluster`,
  {
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { cluster_id, ...requestData } = args
      const url = `/api/v4/admin/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-admin-clusters-cluster-id',
  `Delete instance cluster`,
  {
    cluster_id: z.string(),
  },
  async (args) => {
    try {
      const { cluster_id, ...queryParams } = args
      const url = `/api/v4/admin/clusters/${cluster_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-admin-clusters-add',
  `Add existing instance cluster`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/admin/clusters/add',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-admin-migrations-timestamp-mark',
  `Mark the migration as successfully executed`,
  {
    timestamp: z.string(),
  },
  async (args) => {
    try {
      const { timestamp, ...requestData } = args
      const url = `/api/v4/admin/migrations/${timestamp}/mark`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-broadcast-messages',
  `Get all broadcast messages`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/broadcast_messages',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-broadcast-messages',
  `Create a broadcast message`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/broadcast_messages',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-broadcast-messages-id',
  `Get a specific broadcast message`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/broadcast_messages/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-broadcast-messages-id',
  `Update a broadcast message`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/broadcast_messages/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-broadcast-messages-id',
  `Delete a broadcast message`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/broadcast_messages/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-applications',
  `Create a new application`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/applications',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-applications',
  `Get applications`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/applications',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-applications-id',
  `Delete an application`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/applications/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-applications-id-renew-secret',
  `Renew an application secret`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/applications/${id}/renew-secret`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-avatar',
  `Return avatar url for a user`,
  {
    email: z.string(),
    size: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/avatar',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-bulk-imports',
  `Start a new GitLab Migration`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/bulk_imports',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports',
  `List all GitLab Migrations`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/bulk_imports',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports-entities',
  `List all GitLab Migrations&#x27; entities`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
    sort: z.string().optional(),
    status: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/bulk_imports/entities',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports-import-id',
  `Get GitLab Migration details`,
  {
    import_id: z.string(),
  },
  async (args) => {
    try {
      const { import_id, ...queryParams } = args
      const url = `/api/v4/bulk_imports/${import_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports-import-id-entities',
  `List GitLab Migration entities`,
  {
    import_id: z.string(),
    status: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { import_id, ...queryParams } = args
      const url = `/api/v4/bulk_imports/${import_id}/entities`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports-import-id-entities-entity-id',
  `Get GitLab Migration entity details`,
  {
    import_id: z.string(),
    entity_id: z.string(),
  },
  async (args) => {
    try {
      const { import_id, entity_id, ...queryParams } = args
      const url = `/api/v4/bulk_imports/${import_id}/entities/${entity_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-bulk-imports-import-id-entities-entity-id-failures',
  `Get GitLab Migration entity failures`,
  {
    import_id: z.string(),
    entity_id: z.string(),
  },
  async (args) => {
    try {
      const { import_id, entity_id, ...queryParams } = args
      const url = `/api/v4/bulk_imports/${import_id}/entities/${entity_id}/failures`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-bulk-imports-import-id-cancel',
  `Cancel GitLab Migration`,
  {
    import_id: z.string(),
  },
  async (args) => {
    try {
      const { import_id, ...requestData } = args
      const url = `/api/v4/bulk_imports/${import_id}/cancel`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-job',
  `Get current job using job token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/job',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-job-allowed-agents',
  `Get current agents`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/job/allowed_agents',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-runners',
  `Register a new runner`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/runners',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-runners',
  `Delete a runner by authentication token`,
  {
    token: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: '/api/v4/runners',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-runners',
  `List available runners`,
  {
    scope: z.string().optional(),
    type: z.string().optional(),
    paused: z.string().optional(),
    status: z.string().optional(),
    tag_list: z.string().optional(),
    version_prefix: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/runners',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-runners-managers',
  `Internal endpoint that deletes a runner manager by authentication token and system ID.`,
  {
    token: z.string(),
    system_id: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: '/api/v4/runners/managers',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-runners-verify',
  `Verify authentication for a registered runner`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/runners/verify',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-runners-reset-authentication-token',
  `Reset runner authentication token with current token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/runners/reset_authentication_token',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-runners-all',
  `List all runners`,
  {
    scope: z.string().optional(),
    type: z.string().optional(),
    paused: z.string().optional(),
    status: z.string().optional(),
    tag_list: z.string().optional(),
    version_prefix: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/runners/all',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-runners-id',
  `Get runner&#x27;s details`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/runners/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-runners-id',
  `Update details of a runner`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/runners/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-runners-id',
  `Delete a runner`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/runners/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-runners-id-managers',
  `Get a list of all runner&#x27;s managers`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/runners/${id}/managers`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-runners-id-jobs',
  `List runner&#x27;s jobs`,
  {
    id: z.string(),
    system_id: z.string().optional(),
    status: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    cursor: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/runners/${id}/jobs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-runners-id-reset-authentication-token',
  `Reset runner&#x27;s authentication token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/runners/${id}/reset_authentication_token`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-runners-reset-registration-token',
  `Reset instance&#x27;s runner registration token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/runners/reset_registration_token',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-jobs-request',
  `Request a job`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/jobs/request',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-jobs-id',
  `Update a job`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/jobs/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'patch-api-v4-jobs-id-trace',
  `Append a patch to the job trace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/jobs/${id}/trace`
      
      const response = await apiClient.request({
        method: 'PATCH',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-jobs-id-artifacts-authorize',
  `Authorize uploading job artifact`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/jobs/${id}/artifacts/authorize`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-jobs-id-artifacts',
  `Upload a job artifact`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/jobs/${id}/artifacts`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-jobs-id-artifacts',
  `Download the artifacts file for job`,
  {
    id: z.string(),
    token: z.string().optional(),
    direct_download: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/jobs/${id}/artifacts`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-group-id-packages-composer-packages',
  `Composer packages endpoint at group level`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/group/${id}/-/packages/composer/packages`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-group-id-packages-composer-psha',
  `Composer packages endpoint at group level for packages list`,
  {
    id: z.string(),
    sha: z.string(),
  },
  async (args) => {
    try {
      const { id, sha, ...queryParams } = args
      const url = `/api/v4/group/${id}/-/packages/composer/p/${sha}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-group-id-packages-composer-p2*package-name',
  `Composer v2 packages p2 endpoint at group level for package versions metadata`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/group/${id}/-/packages/composer/p2/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-group-id-packages-composer*package-name',
  `Composer packages endpoint at group level for package versions metadata`,
  {
    id: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/group/${id}/-/packages/composer/*package_name`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-users-authenticate',
  `Authenticate user against conan CLI`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/conan/v1/users/authenticate',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-users-check-credentials',
  `Check for valid user credentials per conan CLI`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/conan/v1/users/check_credentials',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-search',
  `Search for packages`,
  {
    q: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/conan/v1/conans/search',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-search',
  `Get package references metadata`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/search`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-ping',
  `Ping the Conan API`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/conan/v1/ping',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference',
  `Package Snapshot`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel',
  `Recipe Snapshot`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel',
  `Delete Package`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-digest',
  `Package Digest`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/digest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-digest',
  `Recipe Digest`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/digest`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-download-urls',
  `Package Download Urls`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, conan_package_reference, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/download_urls`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-download-urls',
  `Recipe Download Urls`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/download_urls`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-upload-urls',
  `Package Upload Urls`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    conan_package_reference: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, conan_package_reference, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/packages/${conan_package_reference}/upload_urls`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-upload-urls',
  `Recipe Upload Urls`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/conans/${package_name}/${package_version}/${package_username}/${package_channel}/upload_urls`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name',
  `Download recipe files`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name',
  `Upload recipe package files`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name-authorize',
  `Workhorse authorize the conan recipe file`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, file_name, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/export/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name',
  `Download package files`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...queryParams } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name',
  `Upload package files`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name-authorize',
  `Workhorse authorize the conan package file`,
  {
    package_name: z.string(),
    package_version: z.string(),
    package_username: z.string(),
    package_channel: z.string(),
    recipe_revision: z.string(),
    conan_package_reference: z.string(),
    package_revision: z.string(),
    file_name: z.string(),
  },
  async (args) => {
    try {
      const { package_name, package_version, package_username, package_channel, recipe_revision, conan_package_reference, package_revision, file_name, ...requestData } = args
      const url = `/api/v4/packages/conan/v1/files/${package_name}/${package_version}/${package_username}/${package_channel}/${recipe_revision}/package/${conan_package_reference}/${package_revision}/${file_name}/authorize`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-maven*path-file-name',
  `Download the maven package file at instance level`,
  {
    file_name: z.string(),
    path: z.string(),
  },
  async (args) => {
    try {
      const { file_name, ...queryParams } = args
      const url = `/api/v4/packages/maven/*path/${file_name}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-npm-package*package-name-dist-tags',
  `Get all tags for a given an NPM package`,
  {
    package_name: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/npm/-/package/*package_name/dist-tags',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-packages-npm-package*package-name-dist-tags-tag',
  `Create or Update the given tag for the given NPM package and version`,
  {
    tag: z.string(),
  },
  async (args) => {
    try {
      const { tag, ...requestData } = args
      const url = `/api/v4/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-packages-npm-package*package-name-dist-tags-tag',
  `Deletes the given tag`,
  {
    tag: z.string(),
    package_name: z.string(),
  },
  async (args) => {
    try {
      const { tag, ...queryParams } = args
      const url = `/api/v4/packages/npm/-/package/*package_name/dist-tags/${tag}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-packages-npm-npm-v1-security-advisories-bulk',
  `NPM registry bulk advisory endpoint`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/packages/npm/-/npm/v1/security/advisories/bulk',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-packages-npm-npm-v1-security-audits-quick',
  `NPM registry quick audit endpoint`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/packages/npm/-/npm/v1/security/audits/quick',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-npm*package-name',
  `NPM registry metadata endpoint`,
  {
    package_name: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/packages/npm/*package_name',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system-versions',
  `List versions for a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}/versions`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system-download',
  `Get download location for the latest version of a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system',
  `Get details about the latest version of a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version-download',
  `Get download location for specific version of a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
    module_version: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}/*module_version/download`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version-file',
  `Download specific version of a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
    module_version: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}/*module_version/file`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version',
  `Get details about specific version of a module`,
  {
    module_namespace: z.string(),
    module_name: z.string(),
    module_system: z.string(),
    module_version: z.string(),
  },
  async (args) => {
    try {
      const { module_namespace, module_name, module_system, ...queryParams } = args
      const url = `/api/v4/packages/terraform/modules/v1/${module_namespace}/${module_name}/${module_system}/*module_version`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-container-registry-event-events',
  `Receives notifications from the container registry when an operation occurs`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/container_registry_event/events',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-registry-repositories-id',
  `Get a container repository`,
  {
    id: z.string(),
    tags: z.string().optional(),
    tags_count: z.string().optional(),
    size: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/registry/repositories/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-events',
  `List currently authenticated user&#x27;s events`,
  {
    scope: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    action: z.string().optional(),
    target_type: z.string().optional(),
    before: z.string().optional(),
    after: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/events',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-users-id-events',
  `Get the contribution events of a specified user`,
  {
    id: z.string(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    action: z.string().optional(),
    target_type: z.string().optional(),
    before: z.string().optional(),
    after: z.string().optional(),
    sort: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/users/${id}/events`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-users-user-id-projects',
  `Get a user projects`,
  {
    user_id: z.string(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    search_namespaces: z.string().optional(),
    owned: z.string().optional(),
    starred: z.string().optional(),
    imported: z.string().optional(),
    membership: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    with_programming_language: z.string().optional(),
    min_access_level: z.string().optional(),
    id_after: z.string().optional(),
    id_before: z.string().optional(),
    last_activity_after: z.string().optional(),
    last_activity_before: z.string().optional(),
    repository_storage: z.string().optional(),
    topic: z.string().optional(),
    topic_id: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
    include_pending_delete: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    wiki_checksum_failed: z.string().optional(),
    repository_checksum_failed: z.string().optional(),
    include_hidden: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    simple: z.string().optional(),
    statistics: z.string().optional(),
    with_custom_attributes: z.string().optional(),
  },
  async (args) => {
    try {
      const { user_id, ...queryParams } = args
      const url = `/api/v4/users/${user_id}/projects`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-users-user-id-contributed-projects',
  `Get projects that a user has contributed to`,
  {
    user_id: z.string(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    simple: z.string().optional(),
  },
  async (args) => {
    try {
      const { user_id, ...queryParams } = args
      const url = `/api/v4/users/${user_id}/contributed_projects`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-users-user-id-starred-projects',
  `Get projects starred by a user`,
  {
    user_id: z.string(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    archived: z.string().optional(),
    visibility: z.string().optional(),
    search: z.string().optional(),
    search_namespaces: z.string().optional(),
    owned: z.string().optional(),
    starred: z.string().optional(),
    imported: z.string().optional(),
    membership: z.string().optional(),
    with_issues_enabled: z.string().optional(),
    with_merge_requests_enabled: z.string().optional(),
    with_programming_language: z.string().optional(),
    min_access_level: z.string().optional(),
    id_after: z.string().optional(),
    id_before: z.string().optional(),
    last_activity_after: z.string().optional(),
    last_activity_before: z.string().optional(),
    repository_storage: z.string().optional(),
    topic: z.string().optional(),
    topic_id: z.string().optional(),
    updated_before: z.string().optional(),
    updated_after: z.string().optional(),
    include_pending_delete: z.string().optional(),
    marked_for_deletion_on: z.string().optional(),
    active: z.string().optional(),
    wiki_checksum_failed: z.string().optional(),
    repository_checksum_failed: z.string().optional(),
    include_hidden: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    simple: z.string().optional(),
    statistics: z.string().optional(),
  },
  async (args) => {
    try {
      const { user_id, ...queryParams } = args
      const url = `/api/v4/users/${user_id}/starred_projects`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-features',
  `List all features`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/features',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-features-definitions',
  `List all feature definitions`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/features/definitions',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-features-name',
  `Set or create a feature`,
  {
    name: z.string(),
  },
  async (args) => {
    try {
      const { name, ...requestData } = args
      const url = `/api/v4/features/${name}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-features-name',
  `Delete a feature`,
  {
    name: z.string(),
  },
  async (args) => {
    try {
      const { name, ...queryParams } = args
      const url = `/api/v4/features/${name}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-geo-proxy',
  `Determine if a Geo site should proxy requests`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/geo/proxy',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-geo-retrieve-replicable-name-replicable-id',
  `Internal endpoint that returns a replicable file`,
  {
    replicable_name: z.string(),
    replicable_id: z.string(),
  },
  async (args) => {
    try {
      const { replicable_name, replicable_id, ...queryParams } = args
      const url = `/api/v4/geo/retrieve/${replicable_name}/${replicable_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-geo-repositories-gl-repository-pipeline-refs',
  `Used by secondary runners to verify the secondary instance has the very latest version`,
  {
    gl_repository: z.string(),
  },
  async (args) => {
    try {
      const { gl_repository, ...queryParams } = args
      const url = `/api/v4/geo/repositories/${gl_repository}/pipeline_refs`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-status',
  `Internal endpoint that posts the current node status`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/geo/status',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-proxy-git-ssh-info-refs-upload-pack',
  `Internal endpoint that returns info refs upload pack for git clone/pull`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/geo/proxy_git_ssh/info_refs_upload_pack',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-proxy-git-ssh-upload-pack',
  `Internal endpoint that posts git-upload-pack for git clone/pull`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/geo/proxy_git_ssh/upload_pack',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-proxy-git-ssh-info-refs-receive-pack',
  `Internal endpoint that returns git-received-pack output for git push`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/geo/proxy_git_ssh/info_refs_receive_pack',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-proxy-git-ssh-receive-pack',
  `Internal endpoint that posts git-receive-pack for git push`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/geo/proxy_git_ssh/receive_pack',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-geo-node-proxy-id-graphql',
  `Query the GraphQL endpoint of an existing Geo node`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/geo/node_proxy/${id}/graphql`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-integrations-slack-events',
  `Receive Slack events`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/integrations/slack/events',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-integrations-slack-interactions',
  `POST /api/v4/integrations/slack/interactions`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/integrations/slack/interactions',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-integrations-slack-options',
  `POST /api/v4/integrations/slack/options`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/integrations/slack/options',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-integrations-jira-connect-subscriptions',
  `Subscribe a namespace to a JiraConnectInstallation`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/integrations/jira_connect/subscriptions',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-keys-id',
  `Get single ssh key by id. Only available to admin users`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/keys/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-keys',
  `Get user by fingerprint of SSH key`,
  {
    fingerprint: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/keys',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-markdown',
  `Render an arbitrary Markdown document`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/markdown',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-merge-requests',
  `List merge requests`,
  {
    author_id: z.string().optional(),
    author_username: z.string().optional(),
    assignee_id: z.string().optional(),
    assignee_username: z.string().optional(),
    reviewer_username: z.string().optional(),
    labels: z.string().optional(),
    milestone: z.string().optional(),
    my_reaction_emoji: z.string().optional(),
    reviewer_id: z.string().optional(),
    state: z.string().optional(),
    order_by: z.string().optional(),
    sort: z.string().optional(),
    with_labels_details: z.string().optional(),
    with_merge_status_recheck: z.string().optional(),
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    updated_after: z.string().optional(),
    updated_before: z.string().optional(),
    view: z.string().optional(),
    scope: z.string().optional(),
    source_branch: z.string().optional(),
    source_project_id: z.string().optional(),
    target_branch: z.string().optional(),
    search: z.string().optional(),
    in: z.string().optional(),
    wip: z.string().optional(),
    not[author_id]: z.string().optional(),
    not[author_username]: z.string().optional(),
    not[assignee_id]: z.string().optional(),
    not[assignee_username]: z.string().optional(),
    not[reviewer_username]: z.string().optional(),
    not[labels]: z.string().optional(),
    not[milestone]: z.string().optional(),
    not[my_reaction_emoji]: z.string().optional(),
    not[reviewer_id]: z.string().optional(),
    deployed_before: z.string().optional(),
    deployed_after: z.string().optional(),
    environment: z.string().optional(),
    approved: z.string().optional(),
    merge_user_id: z.string().optional(),
    merge_user_username: z.string().optional(),
    approver_ids: z.string().optional(),
    approved_by_ids: z.string().optional(),
    approved_by_usernames: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/merge_requests',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-namespaces-id',
  `[DEPRECATED] Update a namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/namespaces/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-namespaces-id',
  `Get namespace by ID`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/namespaces/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-namespaces-id-gitlab-subscription',
  `Returns the subscription for the namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/namespaces/${id}/gitlab_subscription`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-namespaces-id-storage-limit-exclusion',
  `Creates a storage limit exclusion for a Namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/namespaces/${id}/storage/limit_exclusion`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-namespaces-id-storage-limit-exclusion',
  `Removes a storage limit exclusion for a Namespace`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/namespaces/${id}/storage/limit_exclusion`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-namespaces-storage-limit-exclusions',
  `Retrieve all limit exclusions`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/namespaces/storage/limit_exclusions',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-namespaces',
  `List namespaces`,
  {
    search: z.string().optional(),
    owned_only: z.string().optional(),
    top_level_only: z.string().optional(),
    full_path_search: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    requested_hosted_plan: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/namespaces',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-namespaces-id-exists',
  `Get existence of a namespace`,
  {
    id: z.string(),
    parent_id: z.string().optional(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/namespaces/${id}/exists`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-organizations',
  `Create an organization`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/organizations',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-pages-domains',
  `Get all pages domains`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/pages/domains',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-personal-access-tokens-self',
  `Get single personal access token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/personal_access_tokens/self',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-personal-access-tokens-self',
  `Revoke a personal access token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: '/api/v4/personal_access_tokens/self',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-personal-access-tokens-self-associations',
  `Return personal access token associations`,
  {
    min_access_level: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/personal_access_tokens/self/associations',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-personal-access-tokens-self-rotate',
  `Rotate a personal access token`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/personal_access_tokens/self/rotate',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-personal-access-tokens',
  `List personal access tokens`,
  {
    user_id: z.string().optional(),
    revoked: z.string().optional(),
    state: z.string().optional(),
    created_before: z.string().optional(),
    created_after: z.string().optional(),
    last_used_before: z.string().optional(),
    last_used_after: z.string().optional(),
    expires_before: z.string().optional(),
    expires_after: z.string().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/personal_access_tokens',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-personal-access-tokens-id',
  `Get single personal access token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/personal_access_tokens/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-personal-access-tokens-id',
  `Revoke a personal access token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/personal_access_tokens/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-personal-access-tokens-id-rotate',
  `Rotate personal access token`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/personal_access_tokens/${id}/rotate`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets',
  `Get a snippets list for an authenticated user`,
  {
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/snippets',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-snippets',
  `Create new snippet`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/snippets',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-public',
  `List all public personal snippets current_user has access to`,
  {
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/snippets/public',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-all',
  `List all snippets current_user has access to`,
  {
    created_after: z.string().optional(),
    created_before: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
    repository_storage: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/snippets/all',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-id',
  `Get a single snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/snippets/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-snippets-id',
  `Update an existing snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/snippets/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-snippets-id',
  `Remove snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/snippets/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-id-raw',
  `Get a raw snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/snippets/${id}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-id-files-ref-file-path-raw',
  `Get raw snippet file contents from the repository`,
  {
    id: z.string(),
    ref: z.string(),
    file_path: z.string(),
  },
  async (args) => {
    try {
      const { id, ref, file_path, ...queryParams } = args
      const url = `/api/v4/snippets/${id}/files/${ref}/${file_path}/raw`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-snippets-id-user-agent-detail',
  `Get the user agent details for a snippet`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/snippets/${id}/user_agent_detail`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-suggestions-id-apply',
  `Apply suggestion patch in the Merge Request it was created`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/suggestions/${id}/apply`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-suggestions-batch-apply',
  `Apply multiple suggestion patches in the Merge Request where they were created`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'PUT',
        url: '/api/v4/suggestions/batch_apply',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-hooks-hook-id-url-variables-key',
  `Set a url variable`,
  {
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, key, ...requestData } = args
      const url = `/api/v4/hooks/${hook_id}/url_variables/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-hooks-hook-id-url-variables-key',
  `Un-Set a url variable`,
  {
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, key, ...queryParams } = args
      const url = `/api/v4/hooks/${hook_id}/url_variables/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-hooks-hook-id-custom-headers-key',
  `Set a custom header`,
  {
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, key, ...requestData } = args
      const url = `/api/v4/hooks/${hook_id}/custom_headers/${key}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-hooks-hook-id-custom-headers-key',
  `Un-Set a custom header`,
  {
    hook_id: z.string(),
    key: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, key, ...queryParams } = args
      const url = `/api/v4/hooks/${hook_id}/custom_headers/${key}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-hooks',
  `List system hooks`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/hooks',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-hooks',
  `Add new system hook`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/hooks',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-hooks-hook-id',
  `Get system hook`,
  {
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, ...queryParams } = args
      const url = `/api/v4/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-hooks-hook-id',
  `Edit system hook`,
  {
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, ...requestData } = args
      const url = `/api/v4/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-hooks-hook-id',
  `POST /api/v4/hooks/{hook_id}`,
  {
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, ...requestData } = args
      const url = `/api/v4/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-hooks-hook-id',
  `Delete system hook`,
  {
    hook_id: z.string(),
  },
  async (args) => {
    try {
      const { hook_id, ...queryParams } = args
      const url = `/api/v4/hooks/${hook_id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-feature-flags-unleash-project-id',
  `GET /api/v4/feature_flags/unleash/{project_id}`,
  {
    project_id: z.string(),
    instance_id: z.string().optional(),
    app_name: z.string().optional(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/feature_flags/unleash/${project_id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-feature-flags-unleash-project-id-features',
  `Get a list of features (deprecated, v2 client support)`,
  {
    project_id: z.string(),
    instance_id: z.string().optional(),
    app_name: z.string().optional(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/feature_flags/unleash/${project_id}/features`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-feature-flags-unleash-project-id-client-features',
  `Get a list of features`,
  {
    project_id: z.string(),
    instance_id: z.string().optional(),
    app_name: z.string().optional(),
  },
  async (args) => {
    try {
      const { project_id, ...queryParams } = args
      const url = `/api/v4/feature_flags/unleash/${project_id}/client/features`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-feature-flags-unleash-project-id-client-register',
  `POST /api/v4/feature_flags/unleash/{project_id}/client/register`,
  {
    project_id: z.string(),
  },
  async (args) => {
    try {
      const { project_id, ...requestData } = args
      const url = `/api/v4/feature_flags/unleash/${project_id}/client/register`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-feature-flags-unleash-project-id-client-metrics',
  `POST /api/v4/feature_flags/unleash/{project_id}/client/metrics`,
  {
    project_id: z.string(),
  },
  async (args) => {
    try {
      const { project_id, ...requestData } = args
      const url = `/api/v4/feature_flags/unleash/${project_id}/client/metrics`
      
      const response = await apiClient.request({
        method: 'POST',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-usage-data-increment-counter',
  `Track usage data event`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/usage_data/increment_counter',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-usage-data-increment-unique-users',
  `Track usage data event for the current user`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/usage_data/increment_unique_users',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-usage-data-track-events',
  `Track multiple gitlab internal events`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/usage_data/track_events',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-usage-data-metric-definitions',
  `Get a list of all metric definitions`,
  {
    include_paths: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/usage_data/metric_definitions',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-usage-data-service-ping',
  `Get the latest ServicePing payload`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/usage_data/service_ping',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-usage-data-track-event',
  `Track gitlab internal events`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/usage_data/track_event',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-usage-data-non-sql-metrics',
  `Get Non SQL usage ping metrics`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/usage_data/non_sql_metrics',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-usage-data-queries',
  `Get raw SQL queries for usage data SQL metrics`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/usage_data/queries',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-user-counts',
  `Return the user specific counts`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/user_counts',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-user-runners',
  `Create a runner owned by currently authenticated user`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/user/runners',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-application-plan-limits',
  `Get current plan limits`,
  {
    plan_name: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/application/plan_limits',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-application-plan-limits',
  `Change plan limits`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'PUT',
        url: '/api/v4/application/plan_limits',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-application-appearance',
  `Get the current appearance`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/application/appearance',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-application-appearance',
  `Modify appearance`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'PUT',
        url: '/api/v4/application/appearance',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-application-statistics',
  `Get the current application statistics`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/application/statistics',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-discover-cert-based-clusters',
  `Discover all descendant certificate-based clusters in a group`,
  {
    group_id: z.string(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/discover-cert-based-clusters',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-deploy-keys',
  `List all deploy keys`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
    public: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/deploy_keys',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-deploy-keys',
  `Create a deploy key`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/deploy_keys',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-deploy-tokens',
  `List all deploy tokens`,
  {
    page: z.string().optional(),
    per_page: z.string().optional(),
    active: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/deploy_tokens',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-import-bitbucket',
  `Import a BitBucket Cloud repository`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/import/bitbucket',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-import-bitbucket-server',
  `Import a BitBucket Server repository`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/import/bitbucket_server',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-import-github',
  `Import a GitHub project`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/import/github',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-import-github-cancel',
  `Cancel GitHub project import`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/import/github/cancel',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-import-github-gists',
  `Import User Gists`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/import/github/gists',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-slack-trigger',
  `Trigger a global slack command`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/slack/trigger',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-metadata',
  `Retrieve metadata information for this GitLab instance`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/metadata',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-version',
  `Retrieves version information for the GitLab instance`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/version',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-topics',
  `Get topics`,
  {
    search: z.string().optional(),
    without_projects: z.string().optional(),
    organization_id: z.string().optional(),
    page: z.string().optional(),
    per_page: z.string().optional(),
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/topics',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-topics',
  `Create a topic`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/topics',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-topics-id',
  `Get topic`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/topics/${id}`
      
      const response = await apiClient.request({
        method: 'GET',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'put-api-v4-topics-id',
  `Update a topic`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...requestData } = args
      const url = `/api/v4/topics/${id}`
      
      const response = await apiClient.request({
        method: 'PUT',
        url: url,
        data: requestData
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-api-v4-topics-id',
  `Delete a topic`,
  {
    id: z.string(),
  },
  async (args) => {
    try {
      const { id, ...queryParams } = args
      const url = `/api/v4/topics/${id}`
      
      const response = await apiClient.request({
        method: 'DELETE',
        url: url,
        params: queryParams
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-api-v4-topics-merge',
  `Merge topics`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'POST',
        url: '/api/v4/topics/merge',
        data: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-api-v4-web-commits-public-key',
  `Get the public key for web commits`,
  {
  },
  async (args) => {
    try {
      
      const response = await apiClient.request({
        method: 'GET',
        url: '/api/v4/web_commits/public_key',
        params: args
      })
      
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

