---
title: "How to Remove Passphrase on SSH Key"
date: 2026-03-03
tags:
  - raspberry pi
  - git
  - ssh
---

如何在 Raspberry Pi / linux 上移除 SSH key 上的（passphrase）。有兩種方式：

## 選項一：完全移除密碼片語（安全性較低，但更方便）

SSH 登入你的 Pi 後執行：

```bash
ssh-keygen -p -f ~/.ssh/id_ed25519
```

（如果你的金鑰檔名不同，請替換 `id_ed25519` — 可以用 `ls ~/.ssh` 查看）

系統會詢問：
1. 舊密碼片語（輸入你目前的密碼）
2. 新密碼片語（留空，直接按 `Enter`）
3. 確認新密碼片語（再按一次 `Enter`）

## 選項二：使用 ssh-agent（更安全 — 密碼片語快取在記憶體中）

在你的 Pi 的 `~/.bashrc` 或 `~/.profile` 中加入：

```bash
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_ed25519
```

你只需要在每次登入時輸入一次密碼片語，之後的 git 操作就不會再被提示，直到你登出為止。

Hope you find it useful!