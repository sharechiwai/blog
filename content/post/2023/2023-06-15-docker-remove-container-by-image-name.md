---
title: Docker remove container by image name
date: 2023-06-15T00:00:00.000Z
draft: true
featured: false
tags:
  - Docker
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

```bash
docker ps -a --filter "ancestor=[docker image name]" --format "{{.ID}}" | xargs docker rm
```

**解決方法**


Hope you find it useful