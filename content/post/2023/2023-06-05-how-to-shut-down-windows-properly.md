---
title: Docker daemon conflict unable to remove repository reference (must force)
date: 2023-06-05T00:00:00.000Z
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

玩Docker 時嘗試`docker compose up` 時佢又唔識用update 左既 config  
所以諗住 remove 左個 image 去再build 過..  
`docker image rm vite-reactjs-nodejs-app`  
但係又出現左以下呢個問題..  
```bash
Error response from daemon: conflict: unable to remove repository reference "vite-reactjs-nodejs-app" (must force) - container c6b836b25910 is using its referenced image ec13f6a9159a
```

最後終於找到解決方法


只需要 stop 左個 container. 之後 remove 埋佢...  
便可以執行`docker image rm [container name]` 這個command 了

如果想睇下電腦上有那些 containers 可以執行這個command  
`docker container ls`  

如果想睇下電腦上有那些 images 可以執行這個command  
`docker image ls`  

Hope you find it useful