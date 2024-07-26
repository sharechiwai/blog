---
title: Ngrok Alternative Cloudflare Tunnel - Ngrok 同 Cloudflare Tunnel 介紹
subtitle: Ngrok 同 Cloudflare Tunnel 介紹
draft: true

# Summary for listings and search engines
summary: ngrok vs cloudflare tunnel

# Link this post with a project
projects: []

# Date published
date: '2024-05-09T00:00:00Z'

# Date updated
lastmod: '2024-05-09T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

authors:
  - admin

tags:
  - Tunneling
  - ngrok
  - cloudflare

categories:
  - dev tools
---

## Ngrok 同 Cloudflare Tunnel 介紹

喺開發過程中，有時需要將本地伺服器暴露到互聯網上，呢個時候 **Ngrok** 同 **Cloudflare Tunnel** 就可以派上用場。今次我會簡單介紹一下佢哋之間嘅分別同各自嘅長處。

### Ngrok

**Ngrok** 係一個簡單易用嘅隧道工具，可以將本地應用程式暴露到公共互聯網。佢有以下優點：

- **易於設置**：只需安裝並運行命令，就可以快速生成一個網址。
- **支援多種協議**：可以用於 HTTP、HTTPS 同 TCP。
- **即時查看日誌**：提供一個直觀嘅網頁介面，方便查看請求日誌。

### Cloudflare Tunnel

**Cloudflare Tunnel**（之前叫 Argo Tunnel）則係由 Cloudflare 提供，主要用於安全地將本地伺服器連接到 Cloudflare 網絡。佢嘅優勢包括：

- **安全性更高**：通過 Cloudflare 的網絡，提供 DDoS 保護同防火牆功能。
- **無需公開 IP**：可以將伺服器隱藏，減少安全風險。
- **全球 CDN 支援**：可以利用 Cloudflare 嘅 CDN 加速服務。

### 如何選擇

1. **如果需要快速測試**：可以選擇 Ngrok，因為佢設置簡單，適合快速開發。
2. **如果需要長期使用或者考慮安全性**：建議使用 Cloudflare Tunnel，因為佢有更強嘅安全性同支援。

總結來講，Ngrok 更加適合短期測試，而 Cloudflare Tunnel 則適合需要長期穩定運行嘅情況。根據你嘅需求選擇合適嘅工具，會更加高效！