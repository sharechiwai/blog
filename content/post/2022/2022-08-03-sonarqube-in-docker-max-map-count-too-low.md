---
title: SonarQube - max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
date: 2022-08-03T00:00:00.000Z
draft: false
featured: false
tags:
  - SonarQube
  - Code Quality
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
公司個project 開始成形... 
係時候要用D tools 去 做多D checking 去 ensure D `code quality` 係 OK...  
朋友介紹可以用 SonarQube run D test 去Scan 下個project 有無 potential issue  
`bugs` / `vulnerability` / `code smell` 等等  
為左唔好係部電腦上 install 太多野..
所以都用docker 係local 度run `SonarQube`  
當我嘗試 `docker-compose` 時 出現左以下個 error message

`max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]`

**解決方法**  
只要係部機/VM 度 allocate 足夠 memory 便可  
由於我個docker host 係 Ubuntu 所以我可以執行下面個command 便可
```bash
sudo sysctl -w vm.max_map_count=262144
```

hope you find it useful