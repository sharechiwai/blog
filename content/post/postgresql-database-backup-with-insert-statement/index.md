---
title: "PostgresSQL database backup with Insert Statement "
date: 2022-07-02T02:44:00.000Z
draft: false
featured: false
tags:
  - postgresql
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
如果想幫 PostgresSQL 做個database backup  
 之後係 SQL Editor 上..load 返呢個 SQL backup file  
我地可以用 pg_dump 去backup 個 database 用佢個 insert statement option 便可  

**解決方法**:
```bash
pg_dump --verbose --host=[`hostname`] --port=[`port`] --username=[`username`] --format=p --encoding=UTF-8 --inserts --no-owner --file [`filename`].sql -n "public" [`database_name`]

pg_dump --verbose --host=localhost --port=5432 --username=postgres --format=p --encoding=UTF-8 --inserts --no-owner --file dump-local-db-$(date '+%Y%m%d%H%M%S').sql -n "public" local-db

```

hope you find it useful