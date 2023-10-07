---
title: Docker compose rebuild image
date: 2023-06-06T00:00:00.000Z
draft: false
featured: false
tags:
  - Docker
  - Docker Troubleshooting
  - Troubleshooting
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

上一個post 分享了怎樣 用 docker command 去  
Stop and remove Docker image  
(因為嘗試用 `docker compose build` 時 docker image 沒有更新到) 
[Docker daemon conflict unable to remove repository reference (must force)](https://sharechiwai.com/post/2023/2023-06-05-docker-daemon-conflict-unable-remove-repo-ref/)  

今日終於找到了正確的解決方法:

原來我們可以使用 `docker compose up --build` 去rebuild 我們的 docker image  

Hope you find it useful