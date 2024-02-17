---
title: NodeJs - SyntaxError Cannot use import statement outside a module
date: 2023-02-03T00:00:00.000Z
draft: false
featured: false
tags:
  - NodeJs
  - NodeJs Troubleshooting
  - Javascript
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

嘗試起個新既 `NodeJs` project 用 `import` rather than `require` 時出現以下 `Exception`..  
`SyntaxError: Cannot use import statement outside a module`  

*解決方法:*  
原來只要係 `package.json` 上 加返以下 property 便可..  

```bash
"type": "module",
```

hope you find it useful  
