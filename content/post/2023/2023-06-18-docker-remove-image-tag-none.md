---
title: How to remove docker image with tag none
date: 2023-06-18T00:00:00.000Z
draft: false
featured: false
tags:
  - Docker
  - Docker Image
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---
最近成日係度試 docker 野  
之後發現行 `docker image ls` 時出現左好多 `<none>` 既 image  
![docker image ls](/media/2023/docker-image-ls.png  "docker image ls") 

覺得會唔會好浪費資源...  
所以想 移除佢地...  
但係又唔想一個個image 咁去 remove  

**解決方法**　　
我們可以用以下 command 去查看 有那些 `dangling` 既 image　　
```bash
docker image ls --filter="dangling=true"
```
![docker image ls filter dangling image](/media/2023/docker-image-ls-dangling.png  "docker image ls filter dangling image") 

之後可以用以下指令去移除他們　　
```bash
docker image prune --filter="dangling=true"
```
![docker image prune dangling image](/media/2023/docker-image-prune.png  "docker image prune dangling image") 

之後便不會見到那些沒有 tag 的 image 了　　

Hope you find it useful