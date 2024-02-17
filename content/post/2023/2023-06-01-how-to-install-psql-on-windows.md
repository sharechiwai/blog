---
title: How to install psql PostgreSQL Client Tools on Windows / 如何在Windows 上安裝 PSQL
date: 2023-06-01T00:00:00.000Z
draft: false
featured: false
tags:
  - Postgres
  - PostgreSQL
  - psql
  - PostgreSQL Client Tools
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

由於公司現在是用 `Postgres Database` 既關係...  
很多時都會用到 Postgres 的 `PSQL` tools 來做一些 operations...  
當有新同事 / 新 intern 開始接觸公司的project 時多數都會遇到安裝問題...  
我們會用docker 來 run Postgres Database 的  
所以不用在主機安裝 `Postgres Database Engine`  

**解決方法**  
我們只需要到以下網扯 https://www.enterprisedb.com/downloads/postgres-postgresql-downloads 下載  
之後在安裝過程選擇 `postgres sql client tools` 便可..
![Language as Infrastructure as Code](/media/2023/psql-tools.png "postgres sql client tools")  



這便不會安裝 Postgres SQL Server 到你的電腦了  
![psql commant](/media/2023/psql-login.png "psql cli")  
Hope you find it userful