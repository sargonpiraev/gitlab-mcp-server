# GitLab API MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/gitlab-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/gitlab-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/gitlab-mcp-server)
![pipeline status](https://gitlab.com/sargonpiraev/gitlab-mcp-server/badges/main/pipeline.svg)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/gitlab-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
[![Join Discord](https://img.shields.io/discord/1331631275464671347?color=7289da&label=Discord&logo=discord)](https://discord.gg/ZsWGxRGj)

## Features

- 🔌 **Seamless AI Integration**: Direct GitLab API API access from Claude, Cursor, and VS Code
- 🤖 **Automated Workflows**: Automate GitLab API operations and data access
- 📊 **Complete API Coverage**: 1069+ tools covering all major GitLab API features
- ⚡ **Real-time Access**: Access GitLab API data instantly from AI assistants
- 🔧 **Professional Integration**: Error handling, validation, and comprehensive logging

## Get Your Credentials

Before installation, you'll need a GitLab API API key:

1. Open GitLab API app or web interface
2. Go to **Settings → Account → API Access**
3. Generate new API key or copy existing one
4. Save this key for the installation steps below

## Requirements

- Node.js >= v18.0.0
- GitLab API API key
- Cursor, VS Code, Claude Desktop or another MCP Client

## Installation

<details>
<summary><b>Installing via Smithery</b></summary>

To install GitLab API MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli@latest install @sargonpiraev/gitlab-mcp-server --client <CLIENT_NAME>
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

#### Cursor One-Click Installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=@sargonpiraev/gitlab-mcp-server&config=)

#### Manual Configuration

Add to your Cursor `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "gitlab-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/gitlab-mcp-server"],
      "env": {
        "GITLAB_API_KEY": "your-gitlab_api_key"
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
        "GITLAB_API_KEY": "your-gitlab_api_key"
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
        "GITLAB_API_KEY": "your-gitlab_api_key"
      }
    }
  }
}
```

</details>

## Available Tools

- **`get-api-v4-groups-id-access-requests`**: Gets a list of access requests for a group.
- **`post-api-v4-groups-id-access-requests`**: Requests access for the authenticated user to a group.
- **`put-api-v4-groups-id-access-requests-user-id-approve`**: Approves an access request for the given user.
- **`delete-api-v4-groups-id-access-requests-user-id`**: Denies an access request for the given user.
- **`get-api-v4-groups-id-epics-epic-iid-award-emoji`**: List an awardable&#x27;s emoji reactions for groups
- **`post-api-v4-groups-id-epics-epic-iid-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-groups-id-epics-epic-iid-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-groups-id-epics-epic-iid-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji`**: List an awardable&#x27;s emoji reactions for groups
- **`post-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-groups-id-epics-epic-iid-notes-note-id-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-groups-id-badges`**: Gets a list of group badges viewable by the authenticated user.
- **`post-api-v4-groups-id-badges`**: Adds a badge to a group.
- **`get-api-v4-groups-id-badges-render`**: Preview a badge from a group.
- **`get-api-v4-groups-id-badges-badge-id`**: Gets a badge of a group.
- **`put-api-v4-groups-id-badges-badge-id`**: Updates a badge of a group.
- **`delete-api-v4-groups-id-badges-badge-id`**: Removes a badge from the group.
- **`get-api-v4-groups-id-custom-attributes`**: Get all custom attributes on a group
- **`get-api-v4-groups-id-custom-attributes-key`**: Get a custom attribute on a group
- **`put-api-v4-groups-id-custom-attributes-key`**: Set a custom attribute on a group
- **`delete-api-v4-groups-id-custom-attributes-key`**: Delete a custom attribute on a group
- **`get-api-v4-groups`**: Get a groups list
- **`post-api-v4-groups`**: Create a group. Available only for users who can create groups.
- **`put-api-v4-groups-id`**: Update a group. Available only for users who can administrate groups.
- **`get-api-v4-groups-id`**: Get a single group, with containing projects.
- **`delete-api-v4-groups-id`**: Remove a group.
- **`post-api-v4-groups-id-archive`**: Archive a group
- **`post-api-v4-groups-id-unarchive`**: Unarchive a group
- **`post-api-v4-groups-id-restore`**: Restore a group.
- **`get-api-v4-groups-id-groups-shared`**: Get a list of shared groups this group was invited to
- **`get-api-v4-groups-id-invited-groups`**: Get a list of invited groups in this group
- **`get-api-v4-groups-id-projects`**: Get a list of projects in this group.
- **`get-api-v4-groups-id-projects-shared`**: Get a list of shared projects in this group
- **`get-api-v4-groups-id-subgroups`**: Get a list of subgroups in this group.
- **`get-api-v4-groups-id-descendant-groups`**: Get a list of descendant groups of this group.
- **`post-api-v4-groups-id-projects-project-id`**: Transfer a project to the group namespace. Available only for admin.
- **`get-api-v4-groups-id-transfer-locations`**: Get the groups to where the current group can be transferred to
- **`post-api-v4-groups-id-transfer`**: Transfer a group to a new parent group or promote a subgroup to a top-level group
- **`post-api-v4-groups-id-share`**: Share a group with a group
- **`delete-api-v4-groups-id-share-group-id`**: DELETE /api/v4/groups/{id}/share/{group_id}
- **`post-api-v4-groups-id-tokens-revoke`**: Revoke a single token
- **`post-api-v4-groups-id-ldap-sync`**: Sync a group with LDAP.
- **`get-api-v4-groups-id-audit-events`**: Get a list of audit events in this group.
- **`get-api-v4-groups-id-audit-events-audit-event-id`**: Get a specific audit event in this group.
- **`get-api-v4-groups-id-saml-users`**: Get a list of SAML users of the group
- **`get-api-v4-groups-id-provisioned-users`**: Get a list of users provisioned by the group
- **`get-api-v4-groups-id-users`**: Get a list of users for the group
- **`get-api-v4-groups-id-ssh-certificates`**: Get a list of Groups::SshCertificate for a Group.
- **`post-api-v4-groups-id-ssh-certificates`**: Add a Groups::SshCertificate.
- **`delete-api-v4-groups-id-ssh-certificates-ssh-certificates-id`**: Removes an ssh certificate from a group.
- **`get-api-v4-groups-id-runners`**: List group&#x27;s runners
- **`post-api-v4-groups-id-runners-reset-registration-token`**: Reset the runner registration token for a group
- **`get-api-v4-groups-id-packages-debian-dists*distribution-release-gpg`**: The Release file signature
- **`get-api-v4-groups-id-packages-debian-dists*distribution-release`**: The unsigned Release file
- **`get-api-v4-groups-id-packages-debian-dists*distribution-inrelease`**: The signed Release file
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-packages`**: The installer (udeb) binary files index
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-by-hash-sha256-file-sha256`**: The installer (udeb) binary files index by hash
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-source-sources`**: The source files index
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-source-by-hash-sha256-file-sha256`**: The source files index by hash
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-binary-architecture-packages`**: The binary files index
- **`get-api-v4-groups-id-packages-debian-dists*distribution-component-binary-architecture-by-hash-sha256-file-sha256`**: The binary files index by hash
- **`get-api-v4-groups-id-packages-debian-pool-distribution-project-id-letter-package-name-package-version-file-name`**: Download Debian package
- **`delete-api-v4-groups-id-dependency-proxy-cache`**: Purge the dependency proxy for a group
- **`get-api-v4-groups-id-deploy-tokens`**: List group deploy tokens
- **`post-api-v4-groups-id-deploy-tokens`**: Create a group deploy token
- **`get-api-v4-groups-id-deploy-tokens-token-id`**: Get a group deploy token
- **`delete-api-v4-groups-id-deploy-tokens-token-id`**: Delete a group deploy token
- **`get-api-v4-groups-id-avatar`**: Download the group avatar
- **`get-api-v4-groups-id-clusters`**: List group clusters
- **`get-api-v4-groups-id-clusters-cluster-id`**: Get a single group cluster
- **`put-api-v4-groups-id-clusters-cluster-id`**: Edit group cluster
- **`delete-api-v4-groups-id-clusters-cluster-id`**: Delete group cluster
- **`post-api-v4-groups-id-clusters-user`**: Add existing cluster to group
- **`get-api-v4-groups-id-registry-repositories`**: List registry repositories within a group
- **`post-api-v4-groups-id-debian-distributions`**: Create a Debian Distribution
- **`get-api-v4-groups-id-debian-distributions`**: Get a list of Debian Distributions
- **`get-api-v4-groups-id-debian-distributions-codename`**: Get a Debian Distribution
- **`put-api-v4-groups-id-debian-distributions-codename`**: Update a Debian Distribution
- **`delete-api-v4-groups-id-debian-distributions-codename`**: Delete a Debian Distribution
- **`get-api-v4-groups-id-debian-distributions-codename-key-asc`**: Get a Debian Distribution Key
- **`get-api-v4-groups-id-export-download`**: Download export
- **`post-api-v4-groups-id-export`**: Start export
- **`post-api-v4-groups-id-export-relations`**: Start relations export
- **`get-api-v4-groups-id-export-relations-download`**: Download relations export
- **`get-api-v4-groups-id-export-relations-status`**: Relations export status
- **`post-api-v4-groups-import-authorize`**: Workhorse authorize the group import upload
- **`post-api-v4-groups-import`**: Create a new group import
- **`get-api-v4-groups-id-packages`**: List packages within a group
- **`get-api-v4-groups-id-placeholder-reassignments`**: Download the list of pending placeholder assignments for a group
- **`post-api-v4-groups-id-placeholder-reassignments`**: POST /api/v4/groups/{id}/placeholder_reassignments
- **`post-api-v4-groups-id-placeholder-reassignments-authorize`**: Workhorse authorization for the reassignment CSV file
- **`get-api-v4-groups-id-variables`**: Get a list of group-level variables
- **`post-api-v4-groups-id-variables`**: Create a new variable in a group
- **`get-api-v4-groups-id-variables-key`**: Get the details of a group’s specific variable
- **`put-api-v4-groups-id-variables-key`**: Update an existing variable from a group
- **`delete-api-v4-groups-id-variables-key`**: Delete an existing variable from a group
- **`get-api-v4-groups-id-integrations`**: List all active integrations
- **`put-api-v4-groups-id-integrations-apple-app-store`**: Create/Edit Apple App Store integration
- **`put-api-v4-groups-id-integrations-asana`**: Create/Edit Asana integration
- **`put-api-v4-groups-id-integrations-assembla`**: Create/Edit Assembla integration
- **`put-api-v4-groups-id-integrations-bamboo`**: Create/Edit Bamboo integration
- **`put-api-v4-groups-id-integrations-bugzilla`**: Create/Edit Bugzilla integration
- **`put-api-v4-groups-id-integrations-buildkite`**: Create/Edit Buildkite integration
- **`put-api-v4-groups-id-integrations-campfire`**: Create/Edit Campfire integration
- **`put-api-v4-groups-id-integrations-confluence`**: Create/Edit Confluence integration
- **`put-api-v4-groups-id-integrations-custom-issue-tracker`**: Create/Edit Custom Issue Tracker integration
- **`put-api-v4-groups-id-integrations-datadog`**: Create/Edit Datadog integration
- **`put-api-v4-groups-id-integrations-diffblue-cover`**: Create/Edit Diffblue Cover integration
- **`put-api-v4-groups-id-integrations-discord`**: Create/Edit Discord integration
- **`put-api-v4-groups-id-integrations-drone-ci`**: Create/Edit Drone Ci integration
- **`put-api-v4-groups-id-integrations-emails-on-push`**: Create/Edit Emails On Push integration
- **`put-api-v4-groups-id-integrations-external-wiki`**: Create/Edit External Wiki integration
- **`put-api-v4-groups-id-integrations-gitlab-slack-application`**: Create/Edit Gitlab Slack Application integration
- **`put-api-v4-groups-id-integrations-google-play`**: Create/Edit Google Play integration
- **`put-api-v4-groups-id-integrations-hangouts-chat`**: Create/Edit Hangouts Chat integration
- **`put-api-v4-groups-id-integrations-harbor`**: Create/Edit Harbor integration
- **`put-api-v4-groups-id-integrations-irker`**: Create/Edit Irker integration
- **`put-api-v4-groups-id-integrations-jenkins`**: Create/Edit Jenkins integration
- **`put-api-v4-groups-id-integrations-jira`**: Create/Edit Jira integration
- **`put-api-v4-groups-id-integrations-jira-cloud-app`**: Create/Edit Jira Cloud App integration
- **`put-api-v4-groups-id-integrations-matrix`**: Create/Edit Matrix integration
- **`put-api-v4-groups-id-integrations-mattermost-slash-commands`**: Create/Edit Mattermost Slash Commands integration
- **`put-api-v4-groups-id-integrations-slack-slash-commands`**: Create/Edit Slack Slash Commands integration
- **`put-api-v4-groups-id-integrations-packagist`**: Create/Edit Packagist integration
- **`put-api-v4-groups-id-integrations-phorge`**: Create/Edit Phorge integration
- **`put-api-v4-groups-id-integrations-pipelines-email`**: Create/Edit Pipelines Email integration
- **`put-api-v4-groups-id-integrations-pivotaltracker`**: Create/Edit Pivotaltracker integration
- **`put-api-v4-groups-id-integrations-pumble`**: Create/Edit Pumble integration
- **`put-api-v4-groups-id-integrations-pushover`**: Create/Edit Pushover integration
- **`put-api-v4-groups-id-integrations-redmine`**: Create/Edit Redmine integration
- **`put-api-v4-groups-id-integrations-ewm`**: Create/Edit Ewm integration
- **`put-api-v4-groups-id-integrations-youtrack`**: Create/Edit Youtrack integration
- **`put-api-v4-groups-id-integrations-clickup`**: Create/Edit Clickup integration
- **`put-api-v4-groups-id-integrations-slack`**: Create/Edit Slack integration
- **`put-api-v4-groups-id-integrations-microsoft-teams`**: Create/Edit Microsoft Teams integration
- **`put-api-v4-groups-id-integrations-mattermost`**: Create/Edit Mattermost integration
- **`put-api-v4-groups-id-integrations-teamcity`**: Create/Edit Teamcity integration
- **`put-api-v4-groups-id-integrations-telegram`**: Create/Edit Telegram integration
- **`put-api-v4-groups-id-integrations-unify-circuit`**: Create/Edit Unify Circuit integration
- **`put-api-v4-groups-id-integrations-webex-teams`**: Create/Edit Webex Teams integration
- **`put-api-v4-groups-id-integrations-zentao`**: Create/Edit Zentao integration
- **`put-api-v4-groups-id-integrations-squash-tm`**: Create/Edit Squash Tm integration
- **`put-api-v4-groups-id-integrations-github`**: Create/Edit Github integration
- **`put-api-v4-groups-id-integrations-git-guardian`**: Create/Edit Git Guardian integration
- **`put-api-v4-groups-id-integrations-google-cloud-platform-artifact-registry`**: Create/Edit Google Cloud Platform Artifact Registry integration
- **`put-api-v4-groups-id-integrations-google-cloud-platform-workload-identity-federation`**: Create/Edit Google Cloud Platform Workload Identity Federation integration
- **`put-api-v4-groups-id-integrations-mock-ci`**: Create/Edit Mock Ci integration
- **`put-api-v4-groups-id-integrations-mock-monitoring`**: Create/Edit Mock Monitoring integration
- **`delete-api-v4-groups-id-integrations-slug`**: Disable an integration
- **`get-api-v4-groups-id-integrations-slug`**: Get an integration settings
- **`post-api-v4-groups-id-invitations`**: Invite non-members by email address to a group or project.
- **`get-api-v4-groups-id-invitations`**: Get a list of group or project invitations viewable by the authenticated user
- **`put-api-v4-groups-id-invitations-email`**: Updates a group or project invitation.
- **`delete-api-v4-groups-id-invitations-email`**: Removes an invitation from a group or project.
- **`get-api-v4-groups-id-uploads`**: Get the list of uploads of a group
- **`get-api-v4-groups-id-uploads-upload-id`**: Download a single group upload by ID
- **`delete-api-v4-groups-id-uploads-upload-id`**: Delete a single group upload
- **`get-api-v4-groups-id-uploads-secret-filename`**: Download a single project upload by secret and filename
- **`delete-api-v4-groups-id-uploads-secret-filename`**: Delete a single group upload by secret and filename
- **`get-api-v4-groups-id-packages-maven*path-file-name`**: Download the maven package file at a group level
- **`get-api-v4-groups-id-members`**: Gets a list of group or project members viewable by the authenticated user.
- **`post-api-v4-groups-id-members`**: Adds a member to a group or project.
- **`get-api-v4-groups-id-members-all`**: Gets a list of group or project members viewable by the authenticated user, including those who gained membership through ancestor group.
- **`get-api-v4-groups-id-members-user-id`**: Gets a member of a group or project.
- **`put-api-v4-groups-id-members-user-id`**: Updates a member of a group or project.
- **`delete-api-v4-groups-id-members-user-id`**: Removes a user from a group or project.
- **`get-api-v4-groups-id-members-all-user-id`**: Gets a member of a group or project, including those who gained membership through ancestor group
- **`post-api-v4-groups-id-members-user-id-override`**: Overrides the access level of an LDAP group member.
- **`delete-api-v4-groups-id-members-user-id-override`**: Remove an LDAP group member access level override.
- **`put-api-v4-groups-id-members-member-id-approve`**: Approves a pending member
- **`post-api-v4-groups-id-members-approve-all`**: Approves all pending members
- **`get-api-v4-groups-id-pending-members`**: Lists all pending members for a group including invited users
- **`get-api-v4-groups-id-billable-members`**: Gets a list of billable users of top-level group.
- **`put-api-v4-groups-id-members-user-id-state`**: Changes the state of the memberships of a user in the group
- **`get-api-v4-groups-id-billable-members-user-id-memberships`**: Get the direct memberships of a billable user of a top-level group.
- **`get-api-v4-groups-id-billable-members-user-id-indirect`**: Get the indirect memberships of a billable user of a top-level group.
- **`delete-api-v4-groups-id-billable-members-user-id`**: Removes a billable member from a group or project.
- **`get-api-v4-groups-id-merge-requests`**: List group merge requests
- **`get-api-v4-groups-id-packages-npm-package*package-name-dist-tags`**: Get all tags for a given an NPM package
- **`put-api-v4-groups-id-packages-npm-package*package-name-dist-tags-tag`**: Create or Update the given tag for the given NPM package and version
- **`delete-api-v4-groups-id-packages-npm-package*package-name-dist-tags-tag`**: Deletes the given tag
- **`post-api-v4-groups-id-packages-npm-npm-v1-security-advisories-bulk`**: NPM registry bulk advisory endpoint
- **`post-api-v4-groups-id-packages-npm-npm-v1-security-audits-quick`**: NPM registry quick audit endpoint
- **`get-api-v4-groups-id-packages-npm*package-name`**: NPM registry metadata endpoint
- **`get-api-v4-groups-id-packages-nuget-index`**: The NuGet V3 Feed Service Index
- **`get-api-v4-groups-id-packages-nuget-symbolfiles*file-name*signature*same-file-name`**: The NuGet Symbol File Download Endpoint
- **`get-api-v4-groups-id-packages-nuget-v2`**: The NuGet V2 Feed Service Index
- **`get-api-v4-groups-id-packages-nuget-v2$metadata`**: The NuGet V2 Feed Package $metadata endpoint
- **`get-api-v4-groups-id-packages-nuget-metadata*package-name-index`**: The NuGet Metadata Service - Package name level
- **`get-api-v4-groups-id-packages-nuget-metadata*package-name*package-version`**: The NuGet Metadata Service - Package name and version level
- **`get-api-v4-groups-id-packages-nuget-query`**: The NuGet Search Service
- **`get-api-v4-groups-id-packages-pypi-files-sha256*file-identifier`**: Download a package file from a group
- **`get-api-v4-groups-id-packages-pypi-simple`**: The PyPi Simple Group Index Endpoint
- **`get-api-v4-groups-id-packages-pypi-simple*package-name`**: The PyPi Simple Group Package Endpoint
- **`get-api-v4-groups-id-releases`**: List group releases
- **`post-api-v4-groups-id-access-tokens-self-rotate`**: Rotate a resource access token
- **`get-api-v4-groups-id-wikis`**: Get a list of wiki pages
- **`post-api-v4-groups-id-wikis`**: Create a wiki page
- **`get-api-v4-groups-id-wikis-slug`**: Get a wiki page
- **`put-api-v4-groups-id-wikis-slug`**: Update a wiki page
- **`delete-api-v4-groups-id-wikis-slug`**: Delete a wiki page
- **`post-api-v4-groups-id-wikis-attachments`**: Upload an attachment to the wiki repository
- **`get-api-v4-projects-id-access-requests`**: Gets a list of access requests for a project.
- **`post-api-v4-projects-id-access-requests`**: Requests access for the authenticated user to a project.
- **`put-api-v4-projects-id-access-requests-user-id-approve`**: Approves an access request for the given user.
- **`delete-api-v4-projects-id-access-requests-user-id`**: Denies an access request for the given user.
- **`post-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-authorize`**: Workhorse authorize metric image file upload
- **`post-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images`**: Upload a metric image for an alert
- **`get-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images`**: Metric Images for alert
- **`put-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-metric-image-id`**: Update a metric image for an alert
- **`delete-api-v4-projects-id-alert-management-alerts-alert-iid-metric-images-metric-image-id`**: Remove a metric image for an alert
- **`get-api-v4-projects-id-issues-issue-iid-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-issues-issue-iid-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-issues-issue-iid-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-issues-issue-iid-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-issues-issue-iid-notes-note-id-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-merge-requests-merge-request-iid-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-merge-requests-merge-request-iid-notes-note-id-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-snippets-snippet-id-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-snippets-snippet-id-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-snippets-snippet-id-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-snippets-snippet-id-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji`**: List an awardable&#x27;s emoji reactions for projects
- **`post-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji`**: Add a new emoji reaction
- **`get-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji-award-id`**: Get a single emoji reaction
- **`delete-api-v4-projects-id-snippets-snippet-id-notes-note-id-award-emoji-award-id`**: Delete an emoji reaction
- **`get-api-v4-projects-id-badges`**: Gets a list of project badges viewable by the authenticated user.
- **`post-api-v4-projects-id-badges`**: Adds a badge to a project.
- **`get-api-v4-projects-id-badges-render`**: Preview a badge from a project.
- **`get-api-v4-projects-id-badges-badge-id`**: Gets a badge of a project.
- **`put-api-v4-projects-id-badges-badge-id`**: Updates a badge of a project.
- **`delete-api-v4-projects-id-badges-badge-id`**: Removes a badge from the project.
- **`get-api-v4-projects-id-repository-branches`**: Get a project repository branches
- **`post-api-v4-projects-id-repository-branches`**: Create branch
- **`get-api-v4-projects-id-repository-branches-branch`**: Get a single repository branch
- **`delete-api-v4-projects-id-repository-branches-branch`**: Delete a branch
- **`put-api-v4-projects-id-repository-branches-branch-protect`**: Protect a single branch
- **`put-api-v4-projects-id-repository-branches-branch-unprotect`**: Unprotect a single branch
- **`delete-api-v4-projects-id-repository-merged-branches`**: Delete all merged branches
- **`post-api-v4-projects-id-catalog-publish`**: Publish a new component project release as version to the CI/CD catalog
- **`get-api-v4-projects-id-jobs-artifacts-ref-name-download`**: Download the artifacts archive from a job
- **`get-api-v4-projects-id-jobs-artifacts-ref-name-raw*artifact-path`**: Download a specific file from artifacts archive from a ref
- **`get-api-v4-projects-id-jobs-job-id-artifacts`**: Download the artifacts archive from a job
- **`delete-api-v4-projects-id-jobs-job-id-artifacts`**: Delete the artifacts files from a job
- **`get-api-v4-projects-id-jobs-job-id-artifacts*artifact-path`**: Download a specific file from artifacts archive
- **`post-api-v4-projects-id-jobs-job-id-artifacts-keep`**: Keep the artifacts to prevent them from being deleted
- **`delete-api-v4-projects-id-artifacts`**: Expire the artifacts files from a project
- **`get-api-v4-projects-id-jobs`**: Get a projects jobs
- **`get-api-v4-projects-id-jobs-job-id`**: Get a specific job of a project
- **`get-api-v4-projects-id-jobs-job-id-trace`**: Get a trace of a specific job of a project
- **`post-api-v4-projects-id-jobs-job-id-cancel`**: Cancel a specific job of a project
- **`post-api-v4-projects-id-jobs-job-id-retry`**: Retry a specific job of a project
- **`post-api-v4-projects-id-jobs-job-id-erase`**: Erase job (remove artifacts and the trace)
- **`post-api-v4-projects-id-jobs-job-id-play`**: Trigger an actionable job (manual, delayed, etc)
- **`get-api-v4-projects-id-resource-groups`**: Get all resource groups for a project
- **`get-api-v4-projects-id-resource-groups-key`**: Get a specific resource group
- **`put-api-v4-projects-id-resource-groups-key`**: Edit an existing resource group
- **`get-api-v4-projects-id-resource-groups-key-upcoming-jobs`**: List upcoming jobs for a specific resource group
- **`get-api-v4-projects-id-runners`**: List project&#x27;s runners
- **`post-api-v4-projects-id-runners`**: Assign a runner to project
- **`delete-api-v4-projects-id-runners-runner-id`**: Unassign a project runner from the project
- **`post-api-v4-projects-id-runners-reset-registration-token`**: Reset the runner registration token for a project
- **`get-api-v4-projects-id-secure-files`**: Get list of secure files in a project
- **`post-api-v4-projects-id-secure-files`**: Create a secure file
- **`get-api-v4-projects-id-secure-files-secure-file-id`**: Get the details of a specific secure file in a project
- **`delete-api-v4-projects-id-secure-files-secure-file-id`**: Remove a secure file
- **`get-api-v4-projects-id-secure-files-secure-file-id-download`**: Download secure file
- **`get-api-v4-projects-id-pipelines`**: Get all Pipelines of the project
- **`post-api-v4-projects-id-pipeline`**: Create a new pipeline
- **`get-api-v4-projects-id-pipelines-latest`**: Gets the latest pipeline for the project branch
- **`get-api-v4-projects-id-pipelines-pipeline-id`**: Gets a specific pipeline for the project
- **`delete-api-v4-projects-id-pipelines-pipeline-id`**: Deletes a pipeline
- **`get-api-v4-projects-id-pipelines-pipeline-id-jobs`**: Get pipeline jobs
- **`get-api-v4-projects-id-pipelines-pipeline-id-bridges`**: Get pipeline bridge jobs
- **`get-api-v4-projects-id-pipelines-pipeline-id-variables`**: Gets the variables for a given pipeline
- **`get-api-v4-projects-id-pipelines-pipeline-id-test-report`**: Gets the test report for a given pipeline
- **`get-api-v4-projects-id-pipelines-pipeline-id-test-report-summary`**: Gets the test report summary for a given pipeline
- **`put-api-v4-projects-id-pipelines-pipeline-id-metadata`**: Updates pipeline metadata
- **`post-api-v4-projects-id-pipelines-pipeline-id-retry`**: Retry builds in the pipeline
- **`post-api-v4-projects-id-pipelines-pipeline-id-cancel`**: Cancel all builds in the pipeline
- **`get-api-v4-projects-id-pipeline-schedules`**: Get all pipeline schedules
- **`post-api-v4-projects-id-pipeline-schedules`**: Create a new pipeline schedule
- **`get-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id`**: Get a single pipeline schedule
- **`put-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id`**: Edit a pipeline schedule
- **`delete-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id`**: Delete a pipeline schedule
- **`get-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-pipelines`**: Get all pipelines triggered from a pipeline schedule
- **`post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-take-ownership`**: Take ownership of a pipeline schedule
- **`post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-play`**: Play a scheduled pipeline immediately
- **`post-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables`**: Create a new pipeline schedule variable
- **`put-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables-key`**: Edit a pipeline schedule variable
- **`delete-api-v4-projects-id-pipeline-schedules-pipeline-schedule-id-variables-key`**: Delete a pipeline schedule variable
- **`post-api-v4-projects-id(ref-ref)trigger-pipeline`**: Trigger a GitLab project pipeline
- **`get-api-v4-projects-id-triggers`**: Get trigger tokens list
- **`post-api-v4-projects-id-triggers`**: Create a trigger token
- **`get-api-v4-projects-id-triggers-trigger-id`**: Get specific trigger token of a project
- **`put-api-v4-projects-id-triggers-trigger-id`**: Update a trigger token
- **`delete-api-v4-projects-id-triggers-trigger-id`**: Delete a trigger token
- **`get-api-v4-projects-id-variables`**: Get project variables
- **`post-api-v4-projects-id-variables`**: Create a new variable in a project
- **`get-api-v4-projects-id-variables-key`**: Get the details of a single variable from a project
- **`put-api-v4-projects-id-variables-key`**: Update an existing variable from a project
- **`delete-api-v4-projects-id-variables-key`**: Delete an existing variable from a project
- **`get-api-v4-projects-id-cluster-agents-agent-id-tokens`**: List tokens for an agent
- **`post-api-v4-projects-id-cluster-agents-agent-id-tokens`**: Create an agent token
- **`get-api-v4-projects-id-cluster-agents-agent-id-tokens-token-id`**: Get a single agent token
- **`delete-api-v4-projects-id-cluster-agents-agent-id-tokens-token-id`**: Revoke an agent token
- **`get-api-v4-projects-id-cluster-agents`**: List the agents for a project
- **`post-api-v4-projects-id-cluster-agents`**: Register an agent with a project
- **`get-api-v4-projects-id-cluster-agents-agent-id`**: Get details about an agent
- **`delete-api-v4-projects-id-cluster-agents-agent-id`**: Delete a registered agent
- **`get-api-v4-projects-id-packages-cargo-config-json`**: Get config.json
- **`get-api-v4-projects-id-repository-commits`**: Get a project repository commits
- **`post-api-v4-projects-id-repository-commits`**: Commit multiple file changes as one commit
- **`get-api-v4-projects-id-repository-commits-sha`**: Get a specific commit of a project
- **`get-api-v4-projects-id-repository-commits-sha-diff`**: Get the diff for a specific commit of a project
- **`get-api-v4-projects-id-repository-commits-sha-comments`**: Get a commit&#x27;s comments
- **`post-api-v4-projects-id-repository-commits-sha-comments`**: Post comment to commit
- **`get-api-v4-projects-id-repository-commits-sha-sequence`**: Get the sequence count of a commit SHA
- **`post-api-v4-projects-id-repository-commits-sha-cherry-pick`**: Cherry pick commit into a branch
- **`post-api-v4-projects-id-repository-commits-sha-revert`**: Revert a commit in a branch
- **`get-api-v4-projects-id-repository-commits-sha-refs`**: Get all references a commit is pushed to
- **`get-api-v4-projects-id-repository-commits-sha-merge-requests`**: Get Merge Requests associated with a commit
- **`get-api-v4-projects-id-repository-commits-sha-signature`**: Get a commit&#x27;s signature
- **`get-api-v4-projects-id-repository-commits-sha-statuses`**: Get a commit&#x27;s statuses
- **`post-api-v4-projects-id-statuses-sha`**: Post status to a commit
- **`post-api-v4-projects-id-packages-composer`**: Composer packages endpoint for registering packages
- **`get-api-v4-projects-id-packages-composer-archives*package-name`**: Composer package endpoint to download a package archive
- **`get-api-v4-projects-id-packages-conan-v1-users-authenticate`**: Authenticate user against conan CLI
- **`get-api-v4-projects-id-packages-conan-v1-users-check-credentials`**: Check for valid user credentials per conan CLI
- **`get-api-v4-projects-id-packages-conan-v1-conans-search`**: Search for packages
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-search`**: Get package references metadata
- **`get-api-v4-projects-id-packages-conan-v1-ping`**: Ping the Conan API
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference`**: Package Snapshot
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel`**: Recipe Snapshot
- **`delete-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel`**: Delete Package
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-digest`**: Package Digest
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-digest`**: Recipe Digest
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-download-urls`**: Package Download Urls
- **`get-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-download-urls`**: Recipe Download Urls
- **`post-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-upload-urls`**: Package Upload Urls
- **`post-api-v4-projects-id-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-upload-urls`**: Recipe Upload Urls
- **`get-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name`**: Download recipe files
- **`put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name`**: Upload recipe package files
- **`put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name-authorize`**: Workhorse authorize the conan recipe file
- **`get-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name`**: Download package files
- **`put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name`**: Upload package files
- **`put-api-v4-projects-id-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name-authorize`**: Workhorse authorize the conan package file
- **`get-api-v4-projects-id-packages-conan-v2-users-authenticate`**: Authenticate user against conan CLI
- **`get-api-v4-projects-id-packages-conan-v2-users-check-credentials`**: Check for valid user credentials per conan CLI
- **`get-api-v4-projects-id-packages-conan-v2-conans-search`**: Search for packages
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-search`**: Get package references metadata
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-latest`**: Get the latest recipe revision
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions`**: Get the list of revisions
- **`delete-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision`**: Delete recipe revision
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files`**: List recipe files
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name`**: Download recipe files
- **`put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name`**: Upload recipe package files
- **`put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-files-file-name-authorize`**: Workhorse authorize the conan recipe file
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-search`**: Get package references metadata
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-latest`**: Get the latest package revision
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions`**: Get the list of package revisions
- **`delete-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision`**: Delete package revision
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files`**: List package files
- **`get-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name`**: Download package files
- **`put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name`**: Upload package files
- **`put-api-v4-projects-id-packages-conan-v2-conans-package-name-package-version-package-username-package-channel-revisions-recipe-revision-packages-conan-package-reference-revisions-package-revision-files-file-name-authorize`**: Workhorse authorize the conan package file
- **`get-api-v4-projects-id-packages-debian-dists*distribution-release-gpg`**: The Release file signature
- **`get-api-v4-projects-id-packages-debian-dists*distribution-release`**: The unsigned Release file
- **`get-api-v4-projects-id-packages-debian-dists*distribution-inrelease`**: The signed Release file
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-packages`**: The installer (udeb) binary files index
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-debian-installer-binary-architecture-by-hash-sha256-file-sha256`**: The installer (udeb) binary files index by hash
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-source-sources`**: The source files index
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-source-by-hash-sha256-file-sha256`**: The source files index by hash
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-binary-architecture-packages`**: The binary files index
- **`get-api-v4-projects-id-packages-debian-dists*distribution-component-binary-architecture-by-hash-sha256-file-sha256`**: The binary files index by hash
- **`get-api-v4-projects-id-packages-debian-pool-distribution-letter-package-name-package-version-file-name`**: Download Debian package
- **`put-api-v4-projects-id-packages-debian-file-name`**: Upload Debian package
- **`put-api-v4-projects-id-packages-debian-file-name-authorize`**: Authorize Debian package upload
- **`get-api-v4-projects-id-deploy-keys`**: List deploy keys for project
- **`post-api-v4-projects-id-deploy-keys`**: Add deploy key
- **`get-api-v4-projects-id-deploy-keys-key-id`**: Get a single deploy key
- **`put-api-v4-projects-id-deploy-keys-key-id`**: Update deploy key
- **`delete-api-v4-projects-id-deploy-keys-key-id`**: Delete deploy key
- **`post-api-v4-projects-id-deploy-keys-key-id-enable`**: Enable a deploy key
- **`get-api-v4-projects-id-deploy-tokens`**: List project deploy tokens
- **`post-api-v4-projects-id-deploy-tokens`**: Create a project deploy token
- **`get-api-v4-projects-id-deploy-tokens-token-id`**: Get a project deploy token
- **`delete-api-v4-projects-id-deploy-tokens-token-id`**: Delete a project deploy token
- **`get-api-v4-projects-id-deployments`**: List project deployments
- **`post-api-v4-projects-id-deployments`**: Create a deployment
- **`get-api-v4-projects-id-deployments-deployment-id`**: Get a specific deployment
- **`put-api-v4-projects-id-deployments-deployment-id`**: Update a deployment
- **`delete-api-v4-projects-id-deployments-deployment-id`**: Delete a specific deployment
- **`get-api-v4-projects-id-deployments-deployment-id-merge-requests`**: List of merge requests associated with a deployment
- **`post-api-v4-projects-id-deployments-deployment-id-approval`**: Approve or reject a blocked deployment
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes`**: Get a list of merge request draft notes
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes`**: Create a new draft note
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id`**: Get a single draft note
- **`put-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id`**: Modify an existing draft note
- **`delete-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id`**: Delete a draft note
- **`put-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-draft-note-id-publish`**: Publish a pending draft note
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-draft-notes-bulk-publish`**: Bulk publish all pending draft notes
- **`get-api-v4-projects-id-environments`**: List environments
- **`post-api-v4-projects-id-environments`**: Create a new environment
- **`put-api-v4-projects-id-environments-environment-id`**: Update an existing environment
- **`delete-api-v4-projects-id-environments-environment-id`**: Delete an environment
- **`get-api-v4-projects-id-environments-environment-id`**: Get a specific environment
- **`delete-api-v4-projects-id-environments-review-apps`**: Delete multiple stopped review apps
- **`post-api-v4-projects-id-environments-environment-id-stop`**: Stop an environment
- **`post-api-v4-projects-id-environments-stop-stale`**: Stop stale environments
- **`get-api-v4-projects-id-error-tracking-client-keys`**: List project client keys
- **`post-api-v4-projects-id-error-tracking-client-keys`**: Create a client key
- **`delete-api-v4-projects-id-error-tracking-client-keys-key-id`**: Delete a client key
- **`get-api-v4-projects-id-error-tracking-settings`**: Get Error Tracking settings
- **`patch-api-v4-projects-id-error-tracking-settings`**: Enable or disable the Error Tracking project settings
- **`put-api-v4-projects-id-error-tracking-settings`**: Update Error Tracking project settings. Available in GitLab 15.10 and later.
- **`get-api-v4-projects-id-feature-flags`**: List feature flags for a project
- **`post-api-v4-projects-id-feature-flags`**: Create a new feature flag
- **`get-api-v4-projects-id-feature-flags-feature-flag-name`**: Get a single feature flag
- **`put-api-v4-projects-id-feature-flags-feature-flag-name`**: Update a feature flag
- **`delete-api-v4-projects-id-feature-flags-feature-flag-name`**: Delete a feature flag
- **`get-api-v4-projects-id-feature-flags-user-lists`**: List all feature flag user lists for a project
- **`post-api-v4-projects-id-feature-flags-user-lists`**: Create a feature flag user list
- **`get-api-v4-projects-id-feature-flags-user-lists-iid`**: Get a feature flag user list
- **`put-api-v4-projects-id-feature-flags-user-lists-iid`**: Update a feature flag user list
- **`delete-api-v4-projects-id-feature-flags-user-lists-iid`**: Delete feature flag user list
- **`get-api-v4-projects-id-repository-files-file-path-blame`**: Get blame file from the repository
- **`get-api-v4-projects-id-repository-files-file-path-raw`**: Get raw file contents from the repository
- **`get-api-v4-projects-id-repository-files-file-path`**: Get a file from the repository
- **`post-api-v4-projects-id-repository-files-file-path`**: Create new file in repository
- **`put-api-v4-projects-id-repository-files-file-path`**: Update existing file in repository
- **`delete-api-v4-projects-id-repository-files-file-path`**: Delete an existing file in repository
- **`get-api-v4-projects-id-freeze-periods`**: List freeze periods
- **`post-api-v4-projects-id-freeze-periods`**: Create a freeze period
- **`get-api-v4-projects-id-freeze-periods-freeze-period-id`**: Get a freeze period
- **`put-api-v4-projects-id-freeze-periods-freeze-period-id`**: Update a freeze period
- **`delete-api-v4-projects-id-freeze-periods-freeze-period-id`**: Delete a freeze period
- **`put-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name-authorize`**: Workhorse authorize generic package file
- **`put-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name`**: Upload package file
- **`get-api-v4-projects-id-packages-generic-package-name*package-version(*path)file-name`**: Download package file
- **`get-api-v4-projects-id-packages-go*module-name@v-list`**: List
- **`get-api-v4-projects-id-packages-go*module-name@v-module-version-info`**: Version metadata
- **`get-api-v4-projects-id-packages-go*module-name@v-module-version-mod`**: Download module file
- **`get-api-v4-projects-id-packages-go*module-name@v-module-version-zip`**: Download module source
- **`get-api-v4-projects-id-packages-helm-channel-index-yaml`**: Download a chart index
- **`get-api-v4-projects-id-packages-helm-channel-charts-file-name-tgz`**: Download a chart
- **`post-api-v4-projects-id-packages-helm-api-channel-charts-authorize`**: Authorize a chart upload from workhorse
- **`post-api-v4-projects-id-packages-helm-api-channel-charts`**: Upload a chart
- **`get-api-v4-projects-id-services`**: List all active integrations
- **`put-api-v4-projects-id-services-apple-app-store`**: Create/Edit Apple App Store integration
- **`put-api-v4-projects-id-services-asana`**: Create/Edit Asana integration
- **`put-api-v4-projects-id-services-assembla`**: Create/Edit Assembla integration
- **`put-api-v4-projects-id-services-bamboo`**: Create/Edit Bamboo integration
- **`put-api-v4-projects-id-services-bugzilla`**: Create/Edit Bugzilla integration
- **`put-api-v4-projects-id-services-buildkite`**: Create/Edit Buildkite integration
- **`put-api-v4-projects-id-services-campfire`**: Create/Edit Campfire integration
- **`put-api-v4-projects-id-services-confluence`**: Create/Edit Confluence integration
- **`put-api-v4-projects-id-services-custom-issue-tracker`**: Create/Edit Custom Issue Tracker integration
- **`put-api-v4-projects-id-services-datadog`**: Create/Edit Datadog integration
- **`put-api-v4-projects-id-services-diffblue-cover`**: Create/Edit Diffblue Cover integration
- **`put-api-v4-projects-id-services-discord`**: Create/Edit Discord integration
- **`put-api-v4-projects-id-services-drone-ci`**: Create/Edit Drone Ci integration
- **`put-api-v4-projects-id-services-emails-on-push`**: Create/Edit Emails On Push integration
- **`put-api-v4-projects-id-services-external-wiki`**: Create/Edit External Wiki integration
- **`put-api-v4-projects-id-services-gitlab-slack-application`**: Create/Edit Gitlab Slack Application integration
- **`put-api-v4-projects-id-services-google-play`**: Create/Edit Google Play integration
- **`put-api-v4-projects-id-services-hangouts-chat`**: Create/Edit Hangouts Chat integration
- **`put-api-v4-projects-id-services-harbor`**: Create/Edit Harbor integration
- **`put-api-v4-projects-id-services-irker`**: Create/Edit Irker integration
- **`put-api-v4-projects-id-services-jenkins`**: Create/Edit Jenkins integration
- **`put-api-v4-projects-id-services-jira`**: Create/Edit Jira integration
- **`put-api-v4-projects-id-services-jira-cloud-app`**: Create/Edit Jira Cloud App integration
- **`put-api-v4-projects-id-services-matrix`**: Create/Edit Matrix integration
- **`put-api-v4-projects-id-services-mattermost-slash-commands`**: Create/Edit Mattermost Slash Commands integration
- **`put-api-v4-projects-id-services-slack-slash-commands`**: Create/Edit Slack Slash Commands integration
- **`put-api-v4-projects-id-services-packagist`**: Create/Edit Packagist integration
- **`put-api-v4-projects-id-services-phorge`**: Create/Edit Phorge integration
- **`put-api-v4-projects-id-services-pipelines-email`**: Create/Edit Pipelines Email integration
- **`put-api-v4-projects-id-services-pivotaltracker`**: Create/Edit Pivotaltracker integration
- **`put-api-v4-projects-id-services-pumble`**: Create/Edit Pumble integration
- **`put-api-v4-projects-id-services-pushover`**: Create/Edit Pushover integration
- **`put-api-v4-projects-id-services-redmine`**: Create/Edit Redmine integration
- **`put-api-v4-projects-id-services-ewm`**: Create/Edit Ewm integration
- **`put-api-v4-projects-id-services-youtrack`**: Create/Edit Youtrack integration
- **`put-api-v4-projects-id-services-clickup`**: Create/Edit Clickup integration
- **`put-api-v4-projects-id-services-slack`**: Create/Edit Slack integration
- **`put-api-v4-projects-id-services-microsoft-teams`**: Create/Edit Microsoft Teams integration
- **`put-api-v4-projects-id-services-mattermost`**: Create/Edit Mattermost integration
- **`put-api-v4-projects-id-services-teamcity`**: Create/Edit Teamcity integration
- **`put-api-v4-projects-id-services-telegram`**: Create/Edit Telegram integration
- **`put-api-v4-projects-id-services-unify-circuit`**: Create/Edit Unify Circuit integration
- **`put-api-v4-projects-id-services-webex-teams`**: Create/Edit Webex Teams integration
- **`put-api-v4-projects-id-services-zentao`**: Create/Edit Zentao integration
- **`put-api-v4-projects-id-services-squash-tm`**: Create/Edit Squash Tm integration
- **`put-api-v4-projects-id-services-github`**: Create/Edit Github integration
- **`put-api-v4-projects-id-services-git-guardian`**: Create/Edit Git Guardian integration
- **`put-api-v4-projects-id-services-google-cloud-platform-artifact-registry`**: Create/Edit Google Cloud Platform Artifact Registry integration
- **`put-api-v4-projects-id-services-google-cloud-platform-workload-identity-federation`**: Create/Edit Google Cloud Platform Workload Identity Federation integration
- **`put-api-v4-projects-id-services-mock-ci`**: Create/Edit Mock Ci integration
- **`put-api-v4-projects-id-services-mock-monitoring`**: Create/Edit Mock Monitoring integration
- **`delete-api-v4-projects-id-services-slug`**: Disable an integration
- **`get-api-v4-projects-id-services-slug`**: Get an integration settings
- **`post-api-v4-projects-id-services-mattermost-slash-commands-trigger`**: Trigger a slash command for mattermost-slash-commands
- **`post-api-v4-projects-id-services-slack-slash-commands-trigger`**: Trigger a slash command for slack-slash-commands
- **`get-api-v4-projects-id-integrations`**: List all active integrations
- **`put-api-v4-projects-id-integrations-apple-app-store`**: Create/Edit Apple App Store integration
- **`put-api-v4-projects-id-integrations-asana`**: Create/Edit Asana integration
- **`put-api-v4-projects-id-integrations-assembla`**: Create/Edit Assembla integration
- **`put-api-v4-projects-id-integrations-bamboo`**: Create/Edit Bamboo integration
- **`put-api-v4-projects-id-integrations-bugzilla`**: Create/Edit Bugzilla integration
- **`put-api-v4-projects-id-integrations-buildkite`**: Create/Edit Buildkite integration
- **`put-api-v4-projects-id-integrations-campfire`**: Create/Edit Campfire integration
- **`put-api-v4-projects-id-integrations-confluence`**: Create/Edit Confluence integration
- **`put-api-v4-projects-id-integrations-custom-issue-tracker`**: Create/Edit Custom Issue Tracker integration
- **`put-api-v4-projects-id-integrations-datadog`**: Create/Edit Datadog integration
- **`put-api-v4-projects-id-integrations-diffblue-cover`**: Create/Edit Diffblue Cover integration
- **`put-api-v4-projects-id-integrations-discord`**: Create/Edit Discord integration
- **`put-api-v4-projects-id-integrations-drone-ci`**: Create/Edit Drone Ci integration
- **`put-api-v4-projects-id-integrations-emails-on-push`**: Create/Edit Emails On Push integration
- **`put-api-v4-projects-id-integrations-external-wiki`**: Create/Edit External Wiki integration
- **`put-api-v4-projects-id-integrations-gitlab-slack-application`**: Create/Edit Gitlab Slack Application integration
- **`put-api-v4-projects-id-integrations-google-play`**: Create/Edit Google Play integration
- **`put-api-v4-projects-id-integrations-hangouts-chat`**: Create/Edit Hangouts Chat integration
- **`put-api-v4-projects-id-integrations-harbor`**: Create/Edit Harbor integration
- **`put-api-v4-projects-id-integrations-irker`**: Create/Edit Irker integration
- **`put-api-v4-projects-id-integrations-jenkins`**: Create/Edit Jenkins integration
- **`put-api-v4-projects-id-integrations-jira`**: Create/Edit Jira integration
- **`put-api-v4-projects-id-integrations-jira-cloud-app`**: Create/Edit Jira Cloud App integration
- **`put-api-v4-projects-id-integrations-matrix`**: Create/Edit Matrix integration
- **`put-api-v4-projects-id-integrations-mattermost-slash-commands`**: Create/Edit Mattermost Slash Commands integration
- **`put-api-v4-projects-id-integrations-slack-slash-commands`**: Create/Edit Slack Slash Commands integration
- **`put-api-v4-projects-id-integrations-packagist`**: Create/Edit Packagist integration
- **`put-api-v4-projects-id-integrations-phorge`**: Create/Edit Phorge integration
- **`put-api-v4-projects-id-integrations-pipelines-email`**: Create/Edit Pipelines Email integration
- **`put-api-v4-projects-id-integrations-pivotaltracker`**: Create/Edit Pivotaltracker integration
- **`put-api-v4-projects-id-integrations-pumble`**: Create/Edit Pumble integration
- **`put-api-v4-projects-id-integrations-pushover`**: Create/Edit Pushover integration
- **`put-api-v4-projects-id-integrations-redmine`**: Create/Edit Redmine integration
- **`put-api-v4-projects-id-integrations-ewm`**: Create/Edit Ewm integration
- **`put-api-v4-projects-id-integrations-youtrack`**: Create/Edit Youtrack integration
- **`put-api-v4-projects-id-integrations-clickup`**: Create/Edit Clickup integration
- **`put-api-v4-projects-id-integrations-slack`**: Create/Edit Slack integration
- **`put-api-v4-projects-id-integrations-microsoft-teams`**: Create/Edit Microsoft Teams integration
- **`put-api-v4-projects-id-integrations-mattermost`**: Create/Edit Mattermost integration
- **`put-api-v4-projects-id-integrations-teamcity`**: Create/Edit Teamcity integration
- **`put-api-v4-projects-id-integrations-telegram`**: Create/Edit Telegram integration
- **`put-api-v4-projects-id-integrations-unify-circuit`**: Create/Edit Unify Circuit integration
- **`put-api-v4-projects-id-integrations-webex-teams`**: Create/Edit Webex Teams integration
- **`put-api-v4-projects-id-integrations-zentao`**: Create/Edit Zentao integration
- **`put-api-v4-projects-id-integrations-squash-tm`**: Create/Edit Squash Tm integration
- **`put-api-v4-projects-id-integrations-github`**: Create/Edit Github integration
- **`put-api-v4-projects-id-integrations-git-guardian`**: Create/Edit Git Guardian integration
- **`put-api-v4-projects-id-integrations-google-cloud-platform-artifact-registry`**: Create/Edit Google Cloud Platform Artifact Registry integration
- **`put-api-v4-projects-id-integrations-google-cloud-platform-workload-identity-federation`**: Create/Edit Google Cloud Platform Workload Identity Federation integration
- **`put-api-v4-projects-id-integrations-mock-ci`**: Create/Edit Mock Ci integration
- **`put-api-v4-projects-id-integrations-mock-monitoring`**: Create/Edit Mock Monitoring integration
- **`delete-api-v4-projects-id-integrations-slug`**: Disable an integration
- **`get-api-v4-projects-id-integrations-slug`**: Get an integration settings
- **`post-api-v4-projects-id-integrations-mattermost-slash-commands-trigger`**: Trigger a slash command for mattermost-slash-commands
- **`post-api-v4-projects-id-integrations-slack-slash-commands-trigger`**: Trigger a slash command for slack-slash-commands
- **`post-api-v4-projects-id-invitations`**: Invite non-members by email address to a group or project.
- **`get-api-v4-projects-id-invitations`**: Get a list of group or project invitations viewable by the authenticated user
- **`put-api-v4-projects-id-invitations-email`**: Updates a group or project invitation.
- **`delete-api-v4-projects-id-invitations-email`**: Removes an invitation from a group or project.
- **`get-api-v4-projects-id-issues-issue-iid-links`**: List issue relations
- **`post-api-v4-projects-id-issues-issue-iid-links`**: Create an issue link
- **`get-api-v4-projects-id-issues-issue-iid-links-issue-link-id`**: Get an issue link
- **`delete-api-v4-projects-id-issues-issue-iid-links-issue-link-id`**: Delete an issue link
- **`get-api-v4-projects-id-ci-lint`**: Validates a CI YAML configuration with a namespace
- **`post-api-v4-projects-id-ci-lint`**: Validate a CI YAML configuration with a namespace
- **`post-api-v4-projects-id-uploads-authorize`**: Workhorse authorize the file upload
- **`post-api-v4-projects-id-uploads`**: Upload a file
- **`get-api-v4-projects-id-uploads`**: Get the list of uploads of a project
- **`get-api-v4-projects-id-uploads-upload-id`**: Download a single project upload by ID
- **`delete-api-v4-projects-id-uploads-upload-id`**: Delete a single project upload by ID
- **`get-api-v4-projects-id-uploads-secret-filename`**: Download a single project upload by secret and filename
- **`delete-api-v4-projects-id-uploads-secret-filename`**: Delete a single project upload by secret and filename
- **`get-api-v4-projects-id-packages-maven*path-file-name`**: Download the maven package file at a project level
- **`put-api-v4-projects-id-packages-maven*path-file-name`**: Upload the maven package file
- **`put-api-v4-projects-id-packages-maven*path-file-name-authorize`**: Workhorse authorize the maven package file upload
- **`get-api-v4-projects-id-members`**: Gets a list of group or project members viewable by the authenticated user.
- **`post-api-v4-projects-id-members`**: Adds a member to a group or project.
- **`get-api-v4-projects-id-members-all`**: Gets a list of group or project members viewable by the authenticated user, including those who gained membership through ancestor group.
- **`get-api-v4-projects-id-members-user-id`**: Gets a member of a group or project.
- **`put-api-v4-projects-id-members-user-id`**: Updates a member of a group or project.
- **`delete-api-v4-projects-id-members-user-id`**: Removes a user from a group or project.
- **`get-api-v4-projects-id-members-all-user-id`**: Gets a member of a group or project, including those who gained membership through ancestor group
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-approvals`**: List approvals for merge request
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-approvals`**: Deprecated in 16.0: Use the merge request approvals API instead. Change approval-related configuration
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-approve`**: Approve a merge request
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-unapprove`**: Remove an approval from a merge request
- **`put-api-v4-projects-id-merge-requests-merge-request-iid-reset-approvals`**: Remove all merge request approvals
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-approval-state`**: Get approval state of merge request
- **`post-api-v4-projects-id-create-ci-config`**: Creates merge request for missing ci config in project
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-time-estimate`**: Set a time estimate for a merge_request
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-reset-time-estimate`**: Reset the time estimate for a project merge_request
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-add-spent-time`**: Add spent time for a merge_request
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-reset-spent-time`**: Reset spent time for a merge_request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-time-stats`**: Get time tracking stats
- **`get-api-v4-projects-id-merge-requests`**: List project merge requests
- **`post-api-v4-projects-id-merge-requests`**: Create merge request
- **`delete-api-v4-projects-id-merge-requests-merge-request-iid`**: Delete a merge request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid`**: Get single merge request
- **`put-api-v4-projects-id-merge-requests-merge-request-iid`**: Update merge request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-participants`**: Get single merge request participants
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-reviewers`**: Get single merge request reviewers
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-commits`**: Get single merge request commits
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-context-commits`**: List merge request context commits
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-context-commits`**: Create merge request context commits
- **`delete-api-v4-projects-id-merge-requests-merge-request-iid-context-commits`**: Delete merge request context commits
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-changes`**: Get single merge request changes
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-diffs`**: Get the merge request diffs
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-raw-diffs`**: Get the merge request raw diffs
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-pipelines`**: Get single merge request pipelines
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-pipelines`**: Create merge request pipeline
- **`put-api-v4-projects-id-merge-requests-merge-request-iid-merge`**: Merge a merge request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-merge-ref`**: Returns the up to date merge-ref HEAD commit
- **`post-api-v4-projects-id-merge-requests-merge-request-iid-cancel-merge-when-pipeline-succeeds`**: Cancel Merge When Pipeline Succeeds
- **`put-api-v4-projects-id-merge-requests-merge-request-iid-rebase`**: Rebase a merge request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-closes-issues`**: List issues that close on merge
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-related-issues`**: List issues related to merge request
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-versions`**: Get a list of merge request diff versions
- **`get-api-v4-projects-id-merge-requests-merge-request-iid-versions-version-id`**: Get a single merge request diff version
- **`put-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name-authorize`**: Workhorse authorize model package file
- **`put-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name`**: Workhorse upload model package file
- **`get-api-v4-projects-id-packages-ml-models-model-version-id-files(*path)file-name`**: Download an ml_model package file
- **`get-api-v4-projects-id-packages-npm-package*package-name-dist-tags`**: Get all tags for a given an NPM package
- **`put-api-v4-projects-id-packages-npm-package*package-name-dist-tags-tag`**: Create or Update the given tag for the given NPM package and version
- **`delete-api-v4-projects-id-packages-npm-package*package-name-dist-tags-tag`**: Deletes the given tag
- **`post-api-v4-projects-id-packages-npm-npm-v1-security-advisories-bulk`**: NPM registry bulk advisory endpoint
- **`post-api-v4-projects-id-packages-npm-npm-v1-security-audits-quick`**: NPM registry quick audit endpoint
- **`get-api-v4-projects-id-packages-npm*package-name-*file-name`**: Download the NPM tarball
- **`put-api-v4-projects-id-packages-npm-package-name`**: Create or deprecate NPM package
- **`get-api-v4-projects-id-packages-npm*package-name`**: NPM registry metadata endpoint
- **`get-api-v4-projects-id-packages-nuget-index`**: The NuGet V3 Feed Service Index
- **`get-api-v4-projects-id-packages-nuget-symbolfiles*file-name*signature*same-file-name`**: The NuGet Symbol File Download Endpoint
- **`get-api-v4-projects-id-packages-nuget-v2`**: The NuGet V2 Feed Service Index
- **`put-api-v4-projects-id-packages-nuget-v2`**: The NuGet V2 Feed Package Publish endpoint
- **`get-api-v4-projects-id-packages-nuget-v2$metadata`**: The NuGet V2 Feed Package $metadata endpoint
- **`get-api-v4-projects-id-packages-nuget-metadata*package-name-index`**: The NuGet Metadata Service - Package name level
- **`get-api-v4-projects-id-packages-nuget-metadata*package-name*package-version`**: The NuGet Metadata Service - Package name and version level
- **`get-api-v4-projects-id-packages-nuget-query`**: The NuGet Search Service
- **`get-api-v4-projects-id-packages-nuget-download*package-name-index`**: The NuGet Content Service - index request
- **`get-api-v4-projects-id-packages-nuget-download*package-name*package-version*package-filename`**: The NuGet Content Service - content request
- **`put-api-v4-projects-id-packages-nuget`**: The NuGet V3 Feed Package Publish endpoint
- **`put-api-v4-projects-id-packages-nuget-authorize`**: The NuGet Package Authorize endpoint
- **`put-api-v4-projects-id-packages-nuget-symbolpackage`**: The NuGet Symbol Package Publish endpoint
- **`put-api-v4-projects-id-packages-nuget-symbolpackage-authorize`**: The NuGet Symbol Package Authorize endpoint
- **`delete-api-v4-projects-id-packages-nuget*package-name*package-version`**: The NuGet Package Delete endpoint
- **`put-api-v4-projects-id-packages-nuget-v2-authorize`**: The NuGet V2 Feed Package Authorize endpoint
- **`get-api-v4-projects-project-id-packages-nuget-v2-findpackagesbyid\(\)`**: The NuGet V2 Feed Find Packages by ID endpoint
- **`get-api-v4-projects-project-id-packages-nuget-v2-packages\(\)`**: The NuGet V2 Feed Enumerate Packages endpoint
- **`get-api-v4-projects-project-id-packages-nuget-v2-packages\(id&#x3D;&#x27;*package-name&#x27;,version&#x3D;&#x27;*package-version&#x27;\)`**: The NuGet V2 Feed Single Package Metadata endpoint
- **`get-api-v4-projects-id-packages-package-id-package-files`**: List package files
- **`delete-api-v4-projects-id-packages-package-id-package-files-package-file-id`**: Delete a package file
- **`delete-api-v4-projects-id-pages`**: Unpublish pages
- **`patch-api-v4-projects-id-pages`**: Update pages settings
- **`get-api-v4-projects-id-pages`**: Get pages settings
- **`get-api-v4-projects-id-pages-domains`**: Get all pages domains
- **`post-api-v4-projects-id-pages-domains`**: Create a new pages domain
- **`get-api-v4-projects-id-pages-domains-domain`**: Get a single pages domain
- **`put-api-v4-projects-id-pages-domains-domain`**: Updates a pages domain
- **`delete-api-v4-projects-id-pages-domains-domain`**: Delete a pages domain
- **`put-api-v4-projects-id-pages-domains-domain-verify`**: Verify a pages domain
- **`get-api-v4-projects-id-avatar`**: Download a project avatar
- **`get-api-v4-projects-id-clusters`**: List project clusters
- **`get-api-v4-projects-id-clusters-cluster-id`**: Get a single project cluster
- **`put-api-v4-projects-id-clusters-cluster-id`**: Edit project cluster
- **`delete-api-v4-projects-id-clusters-cluster-id`**: Delete project cluster
- **`post-api-v4-projects-id-clusters-user`**: Add existing cluster to project
- **`get-api-v4-projects-id-registry-repositories`**: List container repositories within a project
- **`delete-api-v4-projects-id-registry-repositories-repository-id`**: Delete repository
- **`get-api-v4-projects-id-registry-repositories-repository-id-tags`**: List tags of a repository
- **`delete-api-v4-projects-id-registry-repositories-repository-id-tags`**: Delete repository tags (in bulk)
- **`get-api-v4-projects-id-registry-repositories-repository-id-tags-tag-name`**: Get details about a repository tag
- **`delete-api-v4-projects-id-registry-repositories-repository-id-tags-tag-name`**: Delete repository tag
- **`get-api-v4-projects-id-registry-protection-repository-rules`**: Get list of container registry protection rules for a project
- **`post-api-v4-projects-id-registry-protection-repository-rules`**: Create a container protection rule for a project
- **`patch-api-v4-projects-id-registry-protection-repository-rules-protection-rule-id`**: Update a container protection rule for a project
- **`delete-api-v4-projects-id-registry-protection-repository-rules-protection-rule-id`**: Delete container protection rule
- **`post-api-v4-projects-id-debian-distributions`**: Create a Debian Distribution
- **`get-api-v4-projects-id-debian-distributions`**: Get a list of Debian Distributions
- **`get-api-v4-projects-id-debian-distributions-codename`**: Get a Debian Distribution
- **`put-api-v4-projects-id-debian-distributions-codename`**: Update a Debian Distribution
- **`delete-api-v4-projects-id-debian-distributions-codename`**: Delete a Debian Distribution
- **`get-api-v4-projects-id-debian-distributions-codename-key-asc`**: Get a Debian Distribution Key
- **`get-api-v4-projects-id-events`**: List a project&#x27;s visible events
- **`get-api-v4-projects-id-export`**: Get export status
- **`post-api-v4-projects-id-export`**: Start export
- **`get-api-v4-projects-id-export-download`**: Download export
- **`post-api-v4-projects-id-export-relations`**: Start relations export
- **`get-api-v4-projects-id-export-relations-download`**: Download relations export
- **`get-api-v4-projects-id-export-relations-status`**: Relations export status
- **`put-api-v4-projects-id-hooks-hook-id-url-variables-key`**: Set a url variable
- **`delete-api-v4-projects-id-hooks-hook-id-url-variables-key`**: Un-Set a url variable
- **`put-api-v4-projects-id-hooks-hook-id-custom-headers-key`**: Set a custom header
- **`delete-api-v4-projects-id-hooks-hook-id-custom-headers-key`**: Un-Set a custom header
- **`get-api-v4-projects-id-hooks`**: List project hooks
- **`post-api-v4-projects-id-hooks`**: Add project hook
- **`get-api-v4-projects-id-hooks-hook-id`**: Get project hook
- **`put-api-v4-projects-id-hooks-hook-id`**: Edit project hook
- **`delete-api-v4-projects-id-hooks-hook-id`**: Delete a project hook
- **`get-api-v4-projects-id-hooks-hook-id-events`**: Get events for a given hook id
- **`post-api-v4-projects-id-hooks-hook-id-test-trigger`**: Triggers a hook test
- **`post-api-v4-projects-id-hooks-hook-id-events-hook-log-id-resend`**: Resend a webhook event
- **`post-api-v4-projects-import-authorize`**: Workhorse authorize the project import upload
- **`post-api-v4-projects-import`**: Create a new project import
- **`get-api-v4-projects-id-import`**: Get a project import status
- **`post-api-v4-projects-remote-import`**: Create a new project import using a remote object storage path
- **`post-api-v4-projects-import-relation-authorize`**: Workhorse authorize the project relation import upload
- **`post-api-v4-projects-import-relation`**: Re-import a relation into a project
- **`get-api-v4-projects-id-relation-imports`**: Get the statuses of relation imports for specified project
- **`post-api-v4-projects-remote-import-s3`**: Create a new project import using a file from AWS S3
- **`get-api-v4-projects-id-job-token-scope`**: Fetch CI_JOB_TOKEN access settings.
- **`patch-api-v4-projects-id-job-token-scope`**: Patch CI_JOB_TOKEN access settings.
- **`get-api-v4-projects-id-job-token-scope-allowlist`**: Fetch project inbound allowlist for CI_JOB_TOKEN access settings.
- **`post-api-v4-projects-id-job-token-scope-allowlist`**: Add target project to allowlist.
- **`get-api-v4-projects-id-job-token-scope-groups-allowlist`**: Fetch project groups allowlist for CI_JOB_TOKEN access settings.
- **`post-api-v4-projects-id-job-token-scope-groups-allowlist`**: Add target group to allowlist.
- **`delete-api-v4-projects-id-job-token-scope-groups-allowlist-target-group-id`**: Delete target group from allowlist.
- **`delete-api-v4-projects-id-job-token-scope-allowlist-target-project-id`**: Delete project from allowlist.
- **`get-api-v4-projects-id-packages`**: Get a list of project packages
- **`get-api-v4-projects-id-packages-package-id`**: Get a single project package
- **`delete-api-v4-projects-id-packages-package-id`**: Delete a project package
- **`get-api-v4-projects-id-packages-package-id-pipelines`**: Get the pipelines for a single project package
- **`get-api-v4-projects-id-packages-protection-rules`**: Get list of package protection rules for a project
- **`post-api-v4-projects-id-packages-protection-rules`**: Create a package protection rule for a project
- **`patch-api-v4-projects-id-packages-protection-rules-package-protection-rule-id`**: Update a package protection rule for a project
- **`delete-api-v4-projects-id-packages-protection-rules-package-protection-rule-id`**: Delete package protection rule
- **`get-api-v4-projects-id-snapshot`**: Download a (possibly inconsistent) snapshot of a repository
- **`get-api-v4-projects-id-snippets`**: Get all project snippets
- **`post-api-v4-projects-id-snippets`**: Create a new project snippet
- **`get-api-v4-projects-id-snippets-snippet-id`**: Get a single project snippet
- **`put-api-v4-projects-id-snippets-snippet-id`**: Update an existing project snippet
- **`delete-api-v4-projects-id-snippets-snippet-id`**: Delete a project snippet
- **`get-api-v4-projects-id-snippets-snippet-id-raw`**: Get a raw project snippet
- **`get-api-v4-projects-id-snippets-snippet-id-files-ref-file-path-raw`**: Get raw project snippet file contents from the repository
- **`get-api-v4-projects-id-snippets-snippet-id-user-agent-detail`**: Get the user agent details for a project snippet
- **`get-api-v4-projects-id-statistics`**: Get the list of project fetch statistics for the last 30 days
- **`get-api-v4-projects-id-templates-type`**: Get a list of templates available to this project
- **`get-api-v4-projects-id-templates-type-name`**: Download a template available to this project
- **`get-api-v4-projects-id-custom-attributes`**: Get all custom attributes on a project
- **`get-api-v4-projects-id-custom-attributes-key`**: Get a custom attribute on a project
- **`put-api-v4-projects-id-custom-attributes-key`**: Set a custom attribute on a project
- **`delete-api-v4-projects-id-custom-attributes-key`**: Delete a custom attribute on a project
- **`post-api-v4-projects-id-restore`**: Restore a project
- **`get-api-v4-projects`**: Get a list of visible projects for authenticated user
- **`post-api-v4-projects`**: Create new project
- **`post-api-v4-projects-user-user-id`**: Create new project for a specified user. Only available to admin users.
- **`get-api-v4-projects-id-share-locations`**: Returns group that can be shared with the given project
- **`get-api-v4-projects-id`**: Get a single project
- **`put-api-v4-projects-id`**: Update an existing project
- **`delete-api-v4-projects-id`**: Delete a project
- **`post-api-v4-projects-id-fork`**: Fork new project for the current user or provided namespace.
- **`delete-api-v4-projects-id-fork`**: Remove a forked_from relationship
- **`get-api-v4-projects-id-forks`**: List forks of this project
- **`get-api-v4-projects-id-pages-access`**: Check pages access of this project
- **`post-api-v4-projects-id-archive`**: Archive a project
- **`post-api-v4-projects-id-unarchive`**: Unarchive a project
- **`post-api-v4-projects-id-star`**: Star a project
- **`post-api-v4-projects-id-unstar`**: Unstar a project
- **`get-api-v4-projects-id-starrers`**: Get the users who starred a project
- **`get-api-v4-projects-id-languages`**: Get languages in project repository
- **`post-api-v4-projects-id-fork-forked-from-id`**: Mark this project as forked from another
- **`post-api-v4-projects-id-share`**: Share the project with a group
- **`delete-api-v4-projects-id-share-group-id`**: Remove a group share
- **`post-api-v4-projects-id-import-project-members-project-id`**: Import members from another project
- **`get-api-v4-projects-id-users`**: Get the users list of a project
- **`get-api-v4-projects-id-groups`**: Get ancestor and shared groups for a project
- **`get-api-v4-projects-id-invited-groups`**: Get a list of invited groups in this project
- **`post-api-v4-projects-id-housekeeping`**: Start the housekeeping task for a project
- **`post-api-v4-projects-id-repository-size`**: Start a task to recalculate repository size for a project
- **`put-api-v4-projects-id-transfer`**: Transfer a project to a new namespace
- **`get-api-v4-projects-id-transfer-locations`**: Get the namespaces to where the project can be transferred
- **`get-api-v4-projects-id-storage`**: Show the storage information
- **`get-api-v4-projects-id-audit-events`**: Get a list of audit events in this project.
- **`get-api-v4-projects-id-audit-events-audit-event-id`**: Get a specific audit event in this project.
- **`get-api-v4-projects-id-protected-branches`**: Get a project&#x27;s protected branches
- **`post-api-v4-projects-id-protected-branches`**: Protect a single branch
- **`get-api-v4-projects-id-protected-branches-name`**: Get a single protected branch
- **`patch-api-v4-projects-id-protected-branches-name`**: Update a protected branch
- **`delete-api-v4-projects-id-protected-branches-name`**: Unprotect a single branch
- **`get-api-v4-projects-id-protected-tags`**: Get a project&#x27;s protected tags
- **`post-api-v4-projects-id-protected-tags`**: Protect a single tag or wildcard
- **`get-api-v4-projects-id-protected-tags-name`**: Get a single protected tag
- **`delete-api-v4-projects-id-protected-tags-name`**: Unprotect a single tag
- **`get-api-v4-projects-id-packages-pypi-files-sha256*file-identifier`**: The PyPi package download endpoint
- **`get-api-v4-projects-id-packages-pypi-simple`**: The PyPi Simple Project Index Endpoint
- **`get-api-v4-projects-id-packages-pypi-simple*package-name`**: The PyPi Simple Project Package Endpoint
- **`post-api-v4-projects-id-packages-pypi`**: The PyPi Package upload endpoint
- **`post-api-v4-projects-id-packages-pypi-authorize`**: Authorize the PyPi package upload from workhorse
- **`get-api-v4-projects-id-releases`**: List Releases
- **`post-api-v4-projects-id-releases`**: Create a release
- **`get-api-v4-projects-id-releases-tag-name`**: Get a release by a tag name
- **`put-api-v4-projects-id-releases-tag-name`**: Update a release
- **`delete-api-v4-projects-id-releases-tag-name`**: Delete a release
- **`get-api-v4-projects-id-releases-tag-name-downloads*direct-asset-path`**: Download a project release asset file
- **`get-api-v4-projects-id-releases-permalink-latest()(*suffix-path)`**: Get the latest project release
- **`post-api-v4-projects-id-releases-tag-name-evidence`**: Collect release evidence
- **`get-api-v4-projects-id-releases-tag-name-assets-links`**: List links of a release
- **`post-api-v4-projects-id-releases-tag-name-assets-links`**: Create a release link
- **`get-api-v4-projects-id-releases-tag-name-assets-links-link-id`**: Get a release link
- **`put-api-v4-projects-id-releases-tag-name-assets-links-link-id`**: Update a release link
- **`delete-api-v4-projects-id-releases-tag-name-assets-links-link-id`**: Delete a release link
- **`get-api-v4-projects-id-remote-mirrors`**: List the project&#x27;s remote mirrors
- **`post-api-v4-projects-id-remote-mirrors`**: Create remote mirror for a project
- **`get-api-v4-projects-id-remote-mirrors-mirror-id`**: Get a single remote mirror
- **`put-api-v4-projects-id-remote-mirrors-mirror-id`**: Update the attributes of a single remote mirror
- **`delete-api-v4-projects-id-remote-mirrors-mirror-id`**: Delete a single remote mirror
- **`post-api-v4-projects-id-remote-mirrors-mirror-id-sync`**: Triggers a push mirror operation
- **`get-api-v4-projects-id-remote-mirrors-mirror-id-public-key`**: Get the public key of a single remote mirror
- **`get-api-v4-projects-id-repository-tree`**: Get a project repository tree
- **`get-api-v4-projects-id-repository-blobs-sha-raw`**: Get raw blob contents from the repository
- **`get-api-v4-projects-id-repository-blobs-sha`**: Get a blob from the repository
- **`get-api-v4-projects-id-repository-archive`**: Get an archive of the repository
- **`get-api-v4-projects-id-repository-compare`**: Compare two branches, tags, or commits
- **`get-api-v4-projects-id-repository-health`**: Get repository health
- **`get-api-v4-projects-id-repository-contributors`**: Get repository contributors
- **`get-api-v4-projects-id-repository-merge-base`**: Get the common ancestor between commits
- **`get-api-v4-projects-id-repository-changelog`**: Generates a changelog section for a release and returns it
- **`post-api-v4-projects-id-repository-changelog`**: Generates a changelog section for a release and commits it in a changelog file
- **`post-api-v4-projects-id-access-tokens-self-rotate`**: Rotate a resource access token
- **`get-api-v4-projects-id-issues-eventable-id-resource-milestone-events`**: List project Issue milestone events
- **`get-api-v4-projects-id-issues-eventable-id-resource-milestone-events-event-id`**: Get single Issue milestone event
- **`get-api-v4-projects-id-merge-requests-eventable-id-resource-milestone-events`**: List project Merge request milestone events
- **`get-api-v4-projects-id-merge-requests-eventable-id-resource-milestone-events-event-id`**: Get single Merge request milestone event
- **`get-api-v4-projects-id-packages-rpm-repodata*file-name`**: Download repository metadata files
- **`get-api-v4-projects-id-packages-rpm*package-file-id*file-name`**: Download RPM package files
- **`post-api-v4-projects-id-packages-rpm`**: Upload a RPM package
- **`post-api-v4-projects-id-packages-rpm-authorize`**: Authorize package upload from workhorse
- **`get-api-v4-projects-id-packages-rubygems-file-name`**: Download the spec index file
- **`get-api-v4-projects-id-packages-rubygems-quick-marshal48-file-name`**: Download the gemspec file
- **`get-api-v4-projects-id-packages-rubygems-gems-file-name`**: Download the .gem package
- **`post-api-v4-projects-id-packages-rubygems-api-v1-gems-authorize`**: Authorize a gem upload from workhorse
- **`post-api-v4-projects-id-packages-rubygems-api-v1-gems`**: Upload a gem
- **`get-api-v4-projects-id-packages-rubygems-api-v1-dependencies`**: Fetch a list of dependencies
- **`put-api-v4-projects-id-repository-submodules-submodule`**: Update existing submodule reference in repository
- **`get-api-v4-projects-id-repository-tags`**: Get a project repository tags
- **`post-api-v4-projects-id-repository-tags`**: Create a new repository tag
- **`get-api-v4-projects-id-repository-tags-tag-name`**: Get a single repository tag
- **`delete-api-v4-projects-id-repository-tags-tag-name`**: Delete a repository tag
- **`get-api-v4-projects-id-repository-tags-tag-name-signature`**: Get a tag&#x27;s signature
- **`get-api-v4-projects-id-packages-terraform-modules-module-name-module-system`**: Download the latest version of a module
- **`get-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version`**: Download a specific version of a module
- **`put-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version-file-authorize`**: Workhorse authorize Terraform Module package file
- **`put-api-v4-projects-id-packages-terraform-modules-module-name-module-system*module-version-file`**: Upload Terraform Module package file
- **`get-api-v4-projects-id-terraform-state-name`**: Get a Terraform state by its name
- **`post-api-v4-projects-id-terraform-state-name`**: Add a new Terraform state or update an existing one
- **`delete-api-v4-projects-id-terraform-state-name`**: Delete a Terraform state of a certain name
- **`post-api-v4-projects-id-terraform-state-name-lock`**: Lock a Terraform state of a certain name
- **`delete-api-v4-projects-id-terraform-state-name-lock`**: Unlock a Terraform state of a certain name
- **`get-api-v4-projects-id-terraform-state-name-versions-serial`**: Get a Terraform state version
- **`delete-api-v4-projects-id-terraform-state-name-versions-serial`**: Delete a Terraform state version
- **`get-api-v4-projects-id-wikis`**: Get a list of wiki pages
- **`post-api-v4-projects-id-wikis`**: Create a wiki page
- **`get-api-v4-projects-id-wikis-slug`**: Get a wiki page
- **`put-api-v4-projects-id-wikis-slug`**: Update a wiki page
- **`delete-api-v4-projects-id-wikis-slug`**: Delete a wiki page
- **`post-api-v4-projects-id-wikis-attachments`**: Upload an attachment to the wiki repository
- **`get-api-v4-admin-batched-background-migrations-id`**: Retrieve a batched background migration
- **`put-api-v4-admin-batched-background-migrations-id-resume`**: Resume a batched background migration
- **`put-api-v4-admin-batched-background-migrations-id-pause`**: Pause a batched background migration
- **`get-api-v4-admin-batched-background-migrations`**: Get the list of batched background migrations
- **`get-api-v4-admin-ci-variables`**: List all instance-level variables
- **`post-api-v4-admin-ci-variables`**: Create a new instance-level variable
- **`get-api-v4-admin-ci-variables-key`**: Get the details of a specific instance-level variable
- **`put-api-v4-admin-ci-variables-key`**: Update an instance-level variable
- **`delete-api-v4-admin-ci-variables-key`**: Delete an existing instance-level variable
- **`get-api-v4-admin-databases-database-name-dictionary-tables-table-name`**: Retrieve dictionary details
- **`get-api-v4-admin-clusters`**: List instance clusters
- **`get-api-v4-admin-clusters-cluster-id`**: Get a single instance cluster
- **`put-api-v4-admin-clusters-cluster-id`**: Edit instance cluster
- **`delete-api-v4-admin-clusters-cluster-id`**: Delete instance cluster
- **`post-api-v4-admin-clusters-add`**: Add existing instance cluster
- **`post-api-v4-admin-migrations-timestamp-mark`**: Mark the migration as successfully executed
- **`get-api-v4-broadcast-messages`**: Get all broadcast messages
- **`post-api-v4-broadcast-messages`**: Create a broadcast message
- **`get-api-v4-broadcast-messages-id`**: Get a specific broadcast message
- **`put-api-v4-broadcast-messages-id`**: Update a broadcast message
- **`delete-api-v4-broadcast-messages-id`**: Delete a broadcast message
- **`post-api-v4-applications`**: Create a new application
- **`get-api-v4-applications`**: Get applications
- **`delete-api-v4-applications-id`**: Delete an application
- **`post-api-v4-applications-id-renew-secret`**: Renew an application secret
- **`get-api-v4-avatar`**: Return avatar url for a user
- **`post-api-v4-bulk-imports`**: Start a new GitLab Migration
- **`get-api-v4-bulk-imports`**: List all GitLab Migrations
- **`get-api-v4-bulk-imports-entities`**: List all GitLab Migrations&#x27; entities
- **`get-api-v4-bulk-imports-import-id`**: Get GitLab Migration details
- **`get-api-v4-bulk-imports-import-id-entities`**: List GitLab Migration entities
- **`get-api-v4-bulk-imports-import-id-entities-entity-id`**: Get GitLab Migration entity details
- **`get-api-v4-bulk-imports-import-id-entities-entity-id-failures`**: Get GitLab Migration entity failures
- **`post-api-v4-bulk-imports-import-id-cancel`**: Cancel GitLab Migration
- **`get-api-v4-job`**: Get current job using job token
- **`get-api-v4-job-allowed-agents`**: Get current agents
- **`post-api-v4-runners`**: Register a new runner
- **`delete-api-v4-runners`**: Delete a runner by authentication token
- **`get-api-v4-runners`**: List available runners
- **`delete-api-v4-runners-managers`**: Internal endpoint that deletes a runner manager by authentication token and system ID.
- **`post-api-v4-runners-verify`**: Verify authentication for a registered runner
- **`post-api-v4-runners-reset-authentication-token`**: Reset runner authentication token with current token
- **`get-api-v4-runners-all`**: List all runners
- **`get-api-v4-runners-id`**: Get runner&#x27;s details
- **`put-api-v4-runners-id`**: Update details of a runner
- **`delete-api-v4-runners-id`**: Delete a runner
- **`get-api-v4-runners-id-managers`**: Get a list of all runner&#x27;s managers
- **`get-api-v4-runners-id-jobs`**: List runner&#x27;s jobs
- **`post-api-v4-runners-id-reset-authentication-token`**: Reset runner&#x27;s authentication token
- **`post-api-v4-runners-reset-registration-token`**: Reset instance&#x27;s runner registration token
- **`post-api-v4-jobs-request`**: Request a job
- **`put-api-v4-jobs-id`**: Update a job
- **`patch-api-v4-jobs-id-trace`**: Append a patch to the job trace
- **`post-api-v4-jobs-id-artifacts-authorize`**: Authorize uploading job artifact
- **`post-api-v4-jobs-id-artifacts`**: Upload a job artifact
- **`get-api-v4-jobs-id-artifacts`**: Download the artifacts file for job
- **`get-api-v4-group-id-packages-composer-packages`**: Composer packages endpoint at group level
- **`get-api-v4-group-id-packages-composer-psha`**: Composer packages endpoint at group level for packages list
- **`get-api-v4-group-id-packages-composer-p2*package-name`**: Composer v2 packages p2 endpoint at group level for package versions metadata
- **`get-api-v4-group-id-packages-composer*package-name`**: Composer packages endpoint at group level for package versions metadata
- **`get-api-v4-packages-conan-v1-users-authenticate`**: Authenticate user against conan CLI
- **`get-api-v4-packages-conan-v1-users-check-credentials`**: Check for valid user credentials per conan CLI
- **`get-api-v4-packages-conan-v1-conans-search`**: Search for packages
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-search`**: Get package references metadata
- **`get-api-v4-packages-conan-v1-ping`**: Ping the Conan API
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference`**: Package Snapshot
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel`**: Recipe Snapshot
- **`delete-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel`**: Delete Package
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-digest`**: Package Digest
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-digest`**: Recipe Digest
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-download-urls`**: Package Download Urls
- **`get-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-download-urls`**: Recipe Download Urls
- **`post-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-packages-conan-package-reference-upload-urls`**: Package Upload Urls
- **`post-api-v4-packages-conan-v1-conans-package-name-package-version-package-username-package-channel-upload-urls`**: Recipe Upload Urls
- **`get-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name`**: Download recipe files
- **`put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name`**: Upload recipe package files
- **`put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-export-file-name-authorize`**: Workhorse authorize the conan recipe file
- **`get-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name`**: Download package files
- **`put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name`**: Upload package files
- **`put-api-v4-packages-conan-v1-files-package-name-package-version-package-username-package-channel-recipe-revision-package-conan-package-reference-package-revision-file-name-authorize`**: Workhorse authorize the conan package file
- **`get-api-v4-packages-maven*path-file-name`**: Download the maven package file at instance level
- **`get-api-v4-packages-npm-package*package-name-dist-tags`**: Get all tags for a given an NPM package
- **`put-api-v4-packages-npm-package*package-name-dist-tags-tag`**: Create or Update the given tag for the given NPM package and version
- **`delete-api-v4-packages-npm-package*package-name-dist-tags-tag`**: Deletes the given tag
- **`post-api-v4-packages-npm-npm-v1-security-advisories-bulk`**: NPM registry bulk advisory endpoint
- **`post-api-v4-packages-npm-npm-v1-security-audits-quick`**: NPM registry quick audit endpoint
- **`get-api-v4-packages-npm*package-name`**: NPM registry metadata endpoint
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system-versions`**: List versions for a module
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system-download`**: Get download location for the latest version of a module
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system`**: Get details about the latest version of a module
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version-download`**: Get download location for specific version of a module
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version-file`**: Download specific version of a module
- **`get-api-v4-packages-terraform-modules-v1-module-namespace-module-name-module-system*module-version`**: Get details about specific version of a module
- **`post-api-v4-container-registry-event-events`**: Receives notifications from the container registry when an operation occurs
- **`get-api-v4-registry-repositories-id`**: Get a container repository
- **`get-api-v4-events`**: List currently authenticated user&#x27;s events
- **`get-api-v4-users-id-events`**: Get the contribution events of a specified user
- **`get-api-v4-users-user-id-projects`**: Get a user projects
- **`get-api-v4-users-user-id-contributed-projects`**: Get projects that a user has contributed to
- **`get-api-v4-users-user-id-starred-projects`**: Get projects starred by a user
- **`get-api-v4-features`**: List all features
- **`get-api-v4-features-definitions`**: List all feature definitions
- **`post-api-v4-features-name`**: Set or create a feature
- **`delete-api-v4-features-name`**: Delete a feature
- **`get-api-v4-geo-proxy`**: Determine if a Geo site should proxy requests
- **`get-api-v4-geo-retrieve-replicable-name-replicable-id`**: Internal endpoint that returns a replicable file
- **`get-api-v4-geo-repositories-gl-repository-pipeline-refs`**: Used by secondary runners to verify the secondary instance has the very latest version
- **`post-api-v4-geo-status`**: Internal endpoint that posts the current node status
- **`post-api-v4-geo-proxy-git-ssh-info-refs-upload-pack`**: Internal endpoint that returns info refs upload pack for git clone/pull
- **`post-api-v4-geo-proxy-git-ssh-upload-pack`**: Internal endpoint that posts git-upload-pack for git clone/pull
- **`post-api-v4-geo-proxy-git-ssh-info-refs-receive-pack`**: Internal endpoint that returns git-received-pack output for git push
- **`post-api-v4-geo-proxy-git-ssh-receive-pack`**: Internal endpoint that posts git-receive-pack for git push
- **`post-api-v4-geo-node-proxy-id-graphql`**: Query the GraphQL endpoint of an existing Geo node
- **`post-api-v4-integrations-slack-events`**: Receive Slack events
- **`post-api-v4-integrations-slack-interactions`**: POST /api/v4/integrations/slack/interactions
- **`post-api-v4-integrations-slack-options`**: POST /api/v4/integrations/slack/options
- **`post-api-v4-integrations-jira-connect-subscriptions`**: Subscribe a namespace to a JiraConnectInstallation
- **`get-api-v4-keys-id`**: Get single ssh key by id. Only available to admin users
- **`get-api-v4-keys`**: Get user by fingerprint of SSH key
- **`post-api-v4-markdown`**: Render an arbitrary Markdown document
- **`get-api-v4-merge-requests`**: List merge requests
- **`put-api-v4-namespaces-id`**: [DEPRECATED] Update a namespace
- **`get-api-v4-namespaces-id`**: Get namespace by ID
- **`get-api-v4-namespaces-id-gitlab-subscription`**: Returns the subscription for the namespace
- **`post-api-v4-namespaces-id-storage-limit-exclusion`**: Creates a storage limit exclusion for a Namespace
- **`delete-api-v4-namespaces-id-storage-limit-exclusion`**: Removes a storage limit exclusion for a Namespace
- **`get-api-v4-namespaces-storage-limit-exclusions`**: Retrieve all limit exclusions
- **`get-api-v4-namespaces`**: List namespaces
- **`get-api-v4-namespaces-id-exists`**: Get existence of a namespace
- **`post-api-v4-organizations`**: Create an organization
- **`get-api-v4-pages-domains`**: Get all pages domains
- **`get-api-v4-personal-access-tokens-self`**: Get single personal access token
- **`delete-api-v4-personal-access-tokens-self`**: Revoke a personal access token
- **`get-api-v4-personal-access-tokens-self-associations`**: Return personal access token associations
- **`post-api-v4-personal-access-tokens-self-rotate`**: Rotate a personal access token
- **`get-api-v4-personal-access-tokens`**: List personal access tokens
- **`get-api-v4-personal-access-tokens-id`**: Get single personal access token
- **`delete-api-v4-personal-access-tokens-id`**: Revoke a personal access token
- **`post-api-v4-personal-access-tokens-id-rotate`**: Rotate personal access token
- **`get-api-v4-snippets`**: Get a snippets list for an authenticated user
- **`post-api-v4-snippets`**: Create new snippet
- **`get-api-v4-snippets-public`**: List all public personal snippets current_user has access to
- **`get-api-v4-snippets-all`**: List all snippets current_user has access to
- **`get-api-v4-snippets-id`**: Get a single snippet
- **`put-api-v4-snippets-id`**: Update an existing snippet
- **`delete-api-v4-snippets-id`**: Remove snippet
- **`get-api-v4-snippets-id-raw`**: Get a raw snippet
- **`get-api-v4-snippets-id-files-ref-file-path-raw`**: Get raw snippet file contents from the repository
- **`get-api-v4-snippets-id-user-agent-detail`**: Get the user agent details for a snippet
- **`put-api-v4-suggestions-id-apply`**: Apply suggestion patch in the Merge Request it was created
- **`put-api-v4-suggestions-batch-apply`**: Apply multiple suggestion patches in the Merge Request where they were created
- **`put-api-v4-hooks-hook-id-url-variables-key`**: Set a url variable
- **`delete-api-v4-hooks-hook-id-url-variables-key`**: Un-Set a url variable
- **`put-api-v4-hooks-hook-id-custom-headers-key`**: Set a custom header
- **`delete-api-v4-hooks-hook-id-custom-headers-key`**: Un-Set a custom header
- **`get-api-v4-hooks`**: List system hooks
- **`post-api-v4-hooks`**: Add new system hook
- **`get-api-v4-hooks-hook-id`**: Get system hook
- **`put-api-v4-hooks-hook-id`**: Edit system hook
- **`post-api-v4-hooks-hook-id`**: POST /api/v4/hooks/{hook_id}
- **`delete-api-v4-hooks-hook-id`**: Delete system hook
- **`get-api-v4-feature-flags-unleash-project-id`**: GET /api/v4/feature_flags/unleash/{project_id}
- **`get-api-v4-feature-flags-unleash-project-id-features`**: Get a list of features (deprecated, v2 client support)
- **`get-api-v4-feature-flags-unleash-project-id-client-features`**: Get a list of features
- **`post-api-v4-feature-flags-unleash-project-id-client-register`**: POST /api/v4/feature_flags/unleash/{project_id}/client/register
- **`post-api-v4-feature-flags-unleash-project-id-client-metrics`**: POST /api/v4/feature_flags/unleash/{project_id}/client/metrics
- **`post-api-v4-usage-data-increment-counter`**: Track usage data event
- **`post-api-v4-usage-data-increment-unique-users`**: Track usage data event for the current user
- **`post-api-v4-usage-data-track-events`**: Track multiple gitlab internal events
- **`get-api-v4-usage-data-metric-definitions`**: Get a list of all metric definitions
- **`get-api-v4-usage-data-service-ping`**: Get the latest ServicePing payload
- **`post-api-v4-usage-data-track-event`**: Track gitlab internal events
- **`get-api-v4-usage-data-non-sql-metrics`**: Get Non SQL usage ping metrics
- **`get-api-v4-usage-data-queries`**: Get raw SQL queries for usage data SQL metrics
- **`get-api-v4-user-counts`**: Return the user specific counts
- **`post-api-v4-user-runners`**: Create a runner owned by currently authenticated user
- **`get-api-v4-application-plan-limits`**: Get current plan limits
- **`put-api-v4-application-plan-limits`**: Change plan limits
- **`get-api-v4-application-appearance`**: Get the current appearance
- **`put-api-v4-application-appearance`**: Modify appearance
- **`get-api-v4-application-statistics`**: Get the current application statistics
- **`get-api-v4-discover-cert-based-clusters`**: Discover all descendant certificate-based clusters in a group
- **`get-api-v4-deploy-keys`**: List all deploy keys
- **`post-api-v4-deploy-keys`**: Create a deploy key
- **`get-api-v4-deploy-tokens`**: List all deploy tokens
- **`post-api-v4-import-bitbucket`**: Import a BitBucket Cloud repository
- **`post-api-v4-import-bitbucket-server`**: Import a BitBucket Server repository
- **`post-api-v4-import-github`**: Import a GitHub project
- **`post-api-v4-import-github-cancel`**: Cancel GitHub project import
- **`post-api-v4-import-github-gists`**: Import User Gists
- **`post-api-v4-slack-trigger`**: Trigger a global slack command
- **`get-api-v4-metadata`**: Retrieve metadata information for this GitLab instance
- **`get-api-v4-version`**: Retrieves version information for the GitLab instance
- **`get-api-v4-topics`**: Get topics
- **`post-api-v4-topics`**: Create a topic
- **`get-api-v4-topics-id`**: Get topic
- **`put-api-v4-topics-id`**: Update a topic
- **`delete-api-v4-topics-id`**: Delete a topic
- **`post-api-v4-topics-merge`**: Merge topics
- **`get-api-v4-web-commits-public-key`**: Get the public key for web commits

**Total: 1069 tools available** 🎯

## Support This Project

Hi! I'm Sargon, a software engineer passionate about AI tools and automation. I create open-source MCP servers to help developers integrate AI assistants with their favorite services.

Your support helps me continue developing and maintaining these tools, and motivates me to create new integrations that make AI assistants even more powerful! 🚀

[![Support on Boosty](https://img.shields.io/badge/Support-Boosty-orange?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://boosty.to/sargonpiraev)

## Connect with Author

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 💬 Join [Discord](https://discord.gg/ZsWGxRGj)
