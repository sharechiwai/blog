---
title: "PostgresSQL Get number of connection connected to server"
date: 2022-07-20T00:00:00.000Z
draft: false
featured: false
tags:
  - postgresql
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
之前 個Website down 之後發現原來係 PostgresSQL connection 爆左.. 
所以個server 唔可以再make connection...  
想知道個SQL D connection 用左幾多... 

Stackoverflow 完之後搵到一個 PSQL 既 query, 可以用黎 check 下用緊幾多connection  
同仲有幾多connection remain    
https://dba.stackexchange.com/questions/161760/number-of-active-connections-and-remaining-connections  

**解決方法**:
```sql
select max_conn,used,res_for_super,max_conn-used-res_for_super res_for_normal 
from 
  (select count(*) used from pg_stat_activity) t1,
  (select setting::int res_for_super from pg_settings where name=$$superuser_reserved_connections$$) t2,
  (select setting::int max_conn from pg_settings where name=$$max_connections$$) t3

```

hope you find it useful