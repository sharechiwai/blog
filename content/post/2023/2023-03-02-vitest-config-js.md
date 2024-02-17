---
title: vitest.config.js
date: 2023-03-02T00:00:00.000Z
draft: false
featured: false
tags:
  - vitesst
  - Code Coverage
  - Unit Test
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

岩岩接觸 `Vitest`  
由於我唔係好熟 `TypeScript`  
但係 `Vitest` 既 tutorial 同 documentation 多數係用 `TypeScript`  
所以唔知個 `vitest.config.js` 應該係有 D 咩...  

所以就係呢度 share 我個 initial config  

`vitest.config.js`  
```js
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "istanbul", // or 'c8'
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
```

Hope you find it useful
