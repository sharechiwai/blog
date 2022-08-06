---
title: docker-compose up with specific file 
date: 2022-08-05T00:00:00.000Z
draft: false
featured: false
tags:
  - Docker
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
最近又開始用多左docker 到玩唔同既野...  
有時候都係用黎試D tools, 都係run 一次build 左個 container  
就唔洗再 `docker-compose up`  
今日想同大家分享既係.. 點樣用docker-compose up 去 run 唔係`docker-compose.yml`  

**解決方法**  
我地只要specific 個檔案名便可  
e.g. 我個project 有2 個docker file  
1. `docker-compose.yml`  
2. `docker-compose-sonarqube.yml`  
我只需要加 `-f` 這支flag 便可以specific 用 docker compose 執行那一個 `docker-compose` 檔案  
```bash
docker-compose -f docker-compose-sonarqube.yml up
## 
docker-compose -f docker-compose.yml down
```

hope you find it useful