---
title: PostgresSQL database maintenance script
date: 2022-08-13T00:00:00.000Z
draft: false
featured: false
tags:
  - postgresql
  - Database Maintenance
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

今日想同大家分享一個 PostgresSQL Database maintenance script 用來 reclaim 返 D space

**解決方法**:

```bash
VACUUM (FULL, FREEZE, VERBOSE, ANALYZE, SKIP_LOCKED, INDEX_CLEANUP, TRUNCATE);
```

hope you find it useful
