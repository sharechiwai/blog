---
title: NextJs - How to change port
date: 2023-02-05T00:00:00.000Z
draft: false
featured: false
tags:
  - NodeJs
  - NextJs
  - Javascript
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

最近想 Upgrade 現有的 NextJs Project  
所以諗住用 `npx create-next-app@latest` 來建立一個新的 project 來做 migration  

問題出現了... NextJs 的 default port 是 `3000` 
那麼怎樣可以更改其中一個project 的 starting port 呢?  

**解決方法**
我們只需要更新 `package.json` 上的  
`dev` script 加 `-p [PORT_NUMBER]` 便可  

e.g.
```
  "scripts": {
    "dev": "next dev -p 3333",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

Hope you find it useful