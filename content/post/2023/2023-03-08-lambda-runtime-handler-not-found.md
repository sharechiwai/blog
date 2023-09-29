---
title: Runtime.HandlerNotFound index.handler is undefined or not exported
date: 2023-03-05T00:00:00.000Z
draft: false
featured: false
tags:
  - AWS
  - Amazon Web Service
  - Lambda
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
最近係公司度做返D house keeping 野...  
其中我地有一個service 係用`Lambda` 寫的...  

我地會 upload 一個Zip file 去 `S3` 度比 `Lambda` 去 deploy  

Deploy 完之後 出現左以下的 Error Message  
`Warning: Accessing non-existent property 'handler' of module exports inside circular dependency`

```bash
ERROR	Uncaught Exception 	
{
    "errorType": "Runtime.HandlerNotFound",
    "errorMessage": "index.handler is undefined or not exported",
    "stack": [
        "Runtime.HandlerNotFound: index.handler is undefined or not exported",
        "    at Object.module.exports.load (/var/runtime/UserFunction.js:304:11)",
        "    at Object.<anonymous> (/var/runtime/index.js:43:34)",
        "    at Module._compile (internal/modules/cjs/loader.js:1114:14)",
        "    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1143:10)",
        "    at Module.load (internal/modules/cjs/loader.js:979:32)",
        "    at Function.Module._load (internal/modules/cjs/loader.js:819:12)",
        "    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:75:12)",
        "    at internal/main/run_main_module.js:17:47"
    ]
}
```

原來問題是 zip 個 package 有多一個folder 所以認不到 index.js

**解決方法**
我們需要確保Upload 的那個zip file 的 root layer 是有 `index.js` 和入面有相關的功能便可...  

Hope you find it useful