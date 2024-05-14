---
title: How to check the size of table in postgresql - 在PostgreSQL 如何查詢資料庫Table大小
subtitle: Check table size in postgresql
draft: true

# Summary for listings and search engines
summary: query table size

# Link this post with a project
projects: []

# Date published
date: '2024-05-05T00:00:00Z'

# Date updated
lastmod: '2024-05-05T00:00:00Z'

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
之前介紹了如何查詢[PostgreSQL資料庫大小](https://sharechiwai.com/post/2024/2024-05-03-check-postgresql-database-size/)   
但是其實可能只是某幾個Table 佔用位置的大小會比較多  
所以便找了一個 SQL Statement 來查詢Table 的大小  


**解法方法:**  
```
select pg_size_pretty(pg_database_size('[TABLE_NAME]'));
```

![Query to check PostgreSQL table size](/media/2024/table-size.png  "Query to check PostgreSQL table size") 

Hope you find it useful
