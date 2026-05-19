---
title: "OpenClaw Failed to start CLI: Error: Unknown command: openclaw restart"
date: 2026-02-10T00:00:00+08:00
author: ShareChiWai
tags:
  - openclaw
  - troubleshooting
---

Encountered an error when trying to restart OpenClaw:

```
Failed to start CLI: Error: Unknown command: openclaw restart. No built-in command or plugin CLI metadata owns "restart".
    at runCli (file:///home/admin/.npm-global/lib/node_modules/openclaw/dist/cli/run-main.js:310:29)
    at async runMainOrRootHelp (file:///home/admin/.npm-global/lib/node_modules/openclaw/dist/entry.js:468:3)
    at async file:///home/admin/.npm-global/lib/node_modules/openclaw/dist/entry.js:438:55
```

## Issue

The `openclaw restart` command is not a valid built-in command in OpenClaw. The CLI does not recognize "restart" as an available operation.

## Solution

Instead of using `openclaw restart`, try these alternatives:

```bash
# Check available commands
openclaw --help

# If you need to restart the gateway, use:
openclaw restart gateway

# Or restart the service via systemd (if applicable)
sudo systemctl restart openclaw
```

## Notes

- Always verify available commands with `--help` before running CLI operations
- The error indicates that no built-in command or plugin owns the "restart" action at the root level
- Some subcommands like `gateway` may support restart operations
