---
title: "如何檢查 website / web app 的response header"
summary: "用 curl 快速檢查 HTTP response header，並列出常見的安全 header 檢查清單"
date: 2025-08-12
authors:
  - admin
tags:
  - cybersecurity
  - curl
categories:
  - security
image:
  caption: ""
draft: false
---

很多時候做 pentest 時，測試人員會掃描 web app / website 的 HTTP response headers，確認是否符合一些安全或最佳實作（best practice）。

本文示範如何用 curl 快速檢查 response header，並列出你應該關注的常見 header，以及一些進階檢查小技巧。

## 為什麼要檢查 response header

Response header 常包含安全相關設定（例如 HSTS、CSP、Cookie flags 等），缺少或錯誤設定可能讓網站容易受到中間人攻擊、點擊劫持（clickjacking）、內容注入等風險。

簡單檢查 header 是快速評估網站安全姿態（security posture）的一步。

## 用 curl 檢查（最簡單的幾個指令）

1) 只看 header（HEAD 請求）

```bash
curl -I https://example.com
```

這會送出 HEAD 請求並只顯示 response headers（不會下載 body）。注意有些伺服器對 HEAD 回應行為不同，結果可能會與 GET 有差別。

2) 用 GET 並把 header 與 body 分開顯示（比較保險）

```bash
curl -s -D - -o /dev/null https://example.com
```

- `-s` 靜默輸出，`-D -` 將 response headers 輸出到 stdout，`-o /dev/null` 丟掉 body。

3) 顯示完整的 request/response（含 TLS/handshake 訊息）

```bash
curl -v https://example.com
```

4) 要檢查特定 header（例如查看 Set-Cookie）

```bash
curl -s -D - -o /dev/null https://example.com | grep -i "Set-Cookie"
```

5) 強制 HTTP/2（如果伺服器支援）

```bash
curl --http2 -I https://example.com
```

6) 本地測試特定 Host（測試 staging 或 SNI）

```bash
curl -s -D - -o /dev/null -H "Host: your.site.internal" https://1.2.3.4
```

## 常見要檢查的安全 header（檢查清單）

- Strict-Transport-Security (HSTS)
  - 範例: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - 用途: 強制 HTTPS，避免降級攻擊。

- Content-Security-Policy (CSP)
  - 範例: `Content-Security-Policy: default-src 'self'; script-src 'self'` 
  - 用途: 抑制 XSS 與不受信任的資源載入。

- X-Frame-Options 或 frame-ancestors（CSP）
  - 範例: `X-Frame-Options: DENY` 或 CSP 的 `frame-ancestors 'none'`
  - 用途: 預防點擊劫持（clickjacking）。

- X-Content-Type-Options
  - 範例: `X-Content-Type-Options: nosniff`
  - 用途: 阻止瀏覽器 MIME type 嗅探，避免內容被誤解析。

- Referrer-Policy
  - 範例: `Referrer-Policy: no-referrer-when-downgrade` 或更嚴格 `no-referrer`
  - 用途: 控制 Referer 資訊的外洩。

- Permissions-Policy（以前叫 Feature-Policy）
  - 範例: `Permissions-Policy: interest-cohort=()`
  - 用途: 控制網站是否允許某些瀏覽器功能。

- Set-Cookie flags
  - 檢查 Cookie 是否有 `Secure`, `HttpOnly`, `SameSite` 等標記
  - 用途: 減少 Cookie 被 JavaScript 存取或在非 TLS 連線洩漏。

## 進階檢查小技巧

- 有些 header 會在反向代理或 CDN 層添加或移除（例如 Cloudflare、Fastly）。檢查來源伺服器與 CDN 的行為是否一致。
- 若想看完整的 TLS 資訊（證書、協議版本），可以用更 verbose 的 curl 或 openssl 指令，或使用像 `sslyze` / `testssl.sh` 的工具。
- 用 `-H` 指定不同的 Host 或 User-Agent 測試是否會有不同的 header 回傳（測試某些環境條件下的行為差異）。

## 範例流程（快速檢查）

1. 先做一次簡單檢查：

```bash
curl -s -D - -o /dev/null https://example.com
```

2. 檢查特定安全 header 是否存在：

```bash
curl -s -D - -o /dev/null https://example.com | egrep -i "Strict-Transport-Security|Content-Security-Policy|X-Frame-Options|X-Content-Type-Options|Referrer-Policy|Permissions-Policy|Set-Cookie"
```

3. 若發現缺少或設定過寬，回報給開發團隊，並建議加入或加嚴對應 header。

## 結語

用 curl 檢查 response header 是一個快速、容易上手的第一步，能幫你立即發現常見的安全疏漏。對於完整的安全驗證，建議搭配瀏覽器開發者工具、專門的掃描器（如 OWASP ZAP）與手動驗證一起進行。

如果你希望，我可以幫你把常見的 header 檢查命令做成一個小腳本，或把檢查清單轉成自動化測試（CI step）。
