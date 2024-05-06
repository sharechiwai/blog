---
title: How to set environment variable globally on Linux - 在Linux 上如何設定環境變數
subtitle: Set up Environment Variable for all user on Linux
draft: true

# Summary for listings and search engines
summary: Set up Environment Variable for all user on Linux

# Link this post with a project
projects: []

# Date published
date: '2024-05-01T00:00:00Z'

# Date updated
lastmod: '2024-05-01T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

authors:
  - admin

tags:
  - Linux
  - System Admin

categories:
  - Linux
  - System Admin
---


**解法方法:**  
```
sudo nano /etc/environment
```

e.g.  
```
ENV_1=abcxyz
ENV_SECRET="This is the secret"
```

之後reboot 個 System

```
sudo reboot now
```

用以下指令去試下有沒有成功加這個新的 `environment variable`  
```
echo $ENV_1
```

Hope you find it useful
