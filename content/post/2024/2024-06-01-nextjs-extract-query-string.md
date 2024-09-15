---
title: How to extract query string from NextJs
subtitle:  How to parse query string from NextJs
draft: true

# Summary for listings and search engines
summary: NextJs API Query String

# Link this post with a project
projects: []

# Date published
date: '2024-06-01T00:00:00Z'

# Date updated
lastmod: '2024-06-01T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

authors:
  - admin

tags:
  - NextJS
  - API

categories:
  - NextJs
  - Coding
---

# 在 Next.js 14 中提取 API 路由的查詢字符串

在 Next.js 14 中，你可以使用 `export async function GET(request)` 來創建 API 路由並提取查詢字符串。這種方法讓我們可以更方便地處理 HTTP 請求。下面是具體的步驟。

1. **創建 API Endpoint**

   首先，在你的 Next.js 專案中創建一個 API route。在 `src/api/hello` 目錄下創建一個檔案，例如 `src/api/hello/route.js`：

   ```javascript
   // app/api/hello/route.js
   export async function GET(request) {
       // 解析 URL 中的查詢字符串
       const { searchParams } = new URL(request.url);
       const name = searchParams.get('name');

       // 回應客戶端
       return new Response(JSON.stringify({ message: `Hello, ${name || 'World'}!` }), {
           status: 200,
           headers: {
               'Content-Type': 'application/json'
           }
       });
   }
   ```

2. **Testing**
  可以嘗試在browser 上執行以下 Url  
  ```javascript
  http://localhost:3000/api/hello?name=sharechiwai
  ```

3. **Result** 
```json
{
    "message": "Hello, sharechiwai!"
}
```

Hope you find it useful