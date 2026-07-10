---
title: "fatal: Cannot rebase onto multiple branches."
date: 2026-03-12T00:00:00+08:00
authors:
  - admin
summary: "有次做 git rebase 點知彈個 error 出嚟：fatal: Cannot rebase onto multiple branches. 研究咗一陣先發現係幾簡單嘅問題，記低方便下次再遇到可以快速解決。"
tags:
  - git
categories:
  - Git
draft: false
featured: false
---

自從有左coding agent 之後 我便好貪心咁 同一時間開幾個VS code 去做野  
有時在唔同folder 做唔同既feature, 可能就係因為咁, 有D branch 會係唔同folder 都做過
有次做緊 feature branch，想 rebase 去 latest嘅 main branch，點知一 run 就彈呢個 error：

```
fatal: Cannot rebase onto multiple branches.
```

吓？rebase 去多個 branch？我明明只係指定咗一個 branch 喎。

## 點解會出現呢個 Error？

呢個 error 通常係因為你 rebase 嘅 target 解析到多過一個 branch。最常見嘅原因：

### 1. Branch 名有衝突

你可能有一個 branch 名同 remote tracking branch 同名，或者有個 branch 名同 tag 名一樣，搞到 Git 唔知你指嘅係邊個。

例如你有一個 local branch 叫 `feature`，同時 remote 都有一個 `origin/feature`，而你嘅 refspec 設定有問題，Git 就可能 confused。


呢個時候用 `git rebase` 就會話你 rebase onto multiple branches，因為 config 入面有兩個 `merge` entry。

## 點樣解決？

最直接嘅方法係明確話畀 Git 知你想 rebase 去邊：

```bash
git rebase origin/main
```

或
```bash
git fetch origin
git rebase origin/your-branch-name
```


Hope you find it useful!
