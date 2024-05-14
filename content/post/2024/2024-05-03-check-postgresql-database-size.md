---
title: How to check the size of database in postgresql - 在PostgreSQL 如何查詢資料庫大小
subtitle: Check database size in postgresql
draft: true

# Summary for listings and search engines
summary: query database size

# Link this post with a project
projects: []

# Date published
date: '2024-05-03T00:00:00Z'

# Date updated
lastmod: '2024-05-03T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

authors:
  - admin

tags:
  - PostgreSQL
  - DBA
  - Database Admin
  - Database Maintenance

categories:
  - PostgreSQL
  - DBA
---
最近發現 Database backup 越來越大...  
很怕Database Server 會用盡 storage...  
所以便想查詢資料庫佔用的大小...  

**解法方法:**  
```
select pg_size_pretty(pg_database_size('[DATABASE_NAME]'));
```

![Query to check PostgreSQL database size](/media/2024/db-size.png  "Query to check PostgreSQL database size") 

Hope you find it useful
