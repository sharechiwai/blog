---
title: How to check all table size in postgresql - 在PostgreSQL 如何查詢資料庫所有Table的大小
subtitle: Check table size in postgresql
draft: true

# Summary for listings and search engines
summary: query all table size in postgresql

# Link this post with a project
projects: []

# Date published
date: '2024-05-06T00:00:00Z'

# Date updated
lastmod: '2024-05-06T00:00:00Z'

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
之前介紹了如何查詢[PostgreSQL資料庫Table大小](https://sharechiwai.com/post/2024/2024-05-05-check-postgresql-table-size/)   
但是如果想一次過睇曬..應該會方便一點  
所以便找了一個 SQL Statement 來查詢所有Table 的大小  


**解法方法:**  
```
SELECT 
  "table_name",
  pg_size_pretty(pg_total_relation_size(quote_ident("table_name"))),
  pg_total_relation_size(quote_ident("table_name"))
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY 3 DESC;
```

![Query to check PostgreSQL all table size](/media/2024/all-table-size.png  "Query to check PostgreSQL all table size") 

Hope you find it useful
