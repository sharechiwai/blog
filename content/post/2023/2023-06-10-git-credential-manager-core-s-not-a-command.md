---
title: Git credential-manager-core is not a git command
date: 2023-06-10T00:00:00.000Z
draft: false
featured: false
tags:
  - Git
  - Git Troubleshooting
  - Troubleshooting
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

最近set up 左新電腦  
Copy 了原本用開既電腦既 `.gitconfig` 
(檔案路徑: C:\Users\%username%\.gitconfig)  
當我run `git pull` 既時候出現了以下錯誤信息  
`git 'credential-manager-core' is not a git command. See 'git ==help'`

![git 'credential-manager-core' is not a git command](/media/2023/git-credential-manager-core-issue.png "git 'credential-manager-core' is not a git command")  

**解決方法**
我們只需要更新 `.gitconfig` 移除或comment out 以下的 config 便可  

```yaml
[credential]
  helper= manager-core
```
![git 'credential-manager-core' is not a git command FIX](/media/2023/git-credential-manager-core-fix.png "git 'credential-manager-core' is not a git command FIX")  

Hope you find it useful