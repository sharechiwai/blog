---
title: Git Ignore new change after initial commit
date: 2023-02-01T00:00:00.000Z
draft: false
featured: false
tags:
  - git
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

個`NodeJs Express` project 為左要方便自己試野既關係...  
開左個新 `route` 放左係 `routes/poc.js`  
記住做完 initial commit 之後就可以 用 `.gitignore` 去 ignore 呢個 file...  
誰不知... commit 完之後 再用 gitignore 係唔 work 的  

*解決方法:*  
用左以下 git command 去 `--assume-unchanged` 去解決..  

```bash
git update-index --assume-unchanged routes/poc.js
```

hope you find it useful
