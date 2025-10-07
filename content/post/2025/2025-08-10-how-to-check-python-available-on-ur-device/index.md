---
title: "如何在你的電腦上檢查已安裝了哪些 Python 版本"
summary: "快速教你在 Windows / macOS / Linux 找出系統上已安裝的 Python 版本與位置，並示範 pyenv 與 where/which 等常用檢查方法。"
date: 2025-08-10

authors:
  - admin

tags:
  - Python
  - 環境
  - 檢查
  - Windows
  - macOS
  - Linux

categories:
  - Reference
  - Python
---

在寫 Python 或部署小工具時，常常需要知道電腦上到底安裝了哪些 Python 版本。


那麼怎樣才知道系統上安裝了哪些 Python 版本呢？

**解決放法:**
```bash
py -0
```
這個指令會列出所有安裝在系統上的 Python 版本。
![py -0 output](py-0-output.png)

如果想check 現在python 版本，可以用以下指令:
```bash
python --version
```

Hope you find it useful!

