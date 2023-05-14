---
title: ESLint Auto Fix via CLI
date: 2023-02-08T00:00:00.000Z
draft: false
featured: false
tags:
  - NodeJs
  - ESLLint
  - Javascript
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

最近有時間執返好D code  
開始set 返好D `ESLint`  
發現 update 左 eslint config後..  
有很多files 要fix  
如果有command / function 可以一次過scan and fix 曬便好  


**解決方法**
我們只需要在 CLI 上執行這個 `eslint` command 便可    

```bash
npx eslint --fix --ext .js .
```

同埋可以在 `package.json` 的 script 上加多一個command 就會更放便  

```json
  "scripts": {
    "dev": "next dev -p 3333",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --fix --ext .js ."
  },
```

之後便可以行

```bash
npm run lint
```

Hope you find it useful