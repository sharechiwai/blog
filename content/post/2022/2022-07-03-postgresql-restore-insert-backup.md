---
title: PostgresSQL database import database backup from command
date: 2022-07-03T00:00:00.000Z
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
有時候個`SQL script` 太大.. 如果用 `SQL editor` 去 run 個 `.sql` file 好大機會 會crash\
我地可以用 command 來 execute 呢個 `.sql`    

我就用呢個方法去Restore database backup  

**解決方法**:

```bash
psql -h [`hostname`] -U [`username`] -d [`database_name`] -f [`sql_script.sql`]

psql -h localhost -U postgres -d local-db -f dump-local-db-20220701150001.sql
```

hope you find it useful