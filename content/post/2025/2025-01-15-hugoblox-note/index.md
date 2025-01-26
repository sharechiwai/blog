---
title: "Hugo Blox Note - Hugo Blox筆記"
summary: 分享怎樣在localhost 執行 Hugo Blox
date: 2025-01-15

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com)'

authors:
  - admin
  - Ted

tags:
  - Notes
  - Hugo Blox
  - Markdown

categories:
  - Hugo Blox
---

最近開始認真學習怎樣使用 Hugo Blox 來寫blog  
之前都是deploy 之後才睇效果  
但是其實 local 試是容易debug 一點的  

如何在local run Hugo Blox?  

首先需要安裝 `hugo extend`  
```bash
# scoop
scoop install hugo-extended

# choco
choco install hugo-extended

# homebrew
brew install hugo --HEAD --with-extended

```

安裝完之後便可以在 root folder 執行
```bash
hugo serve
```

之便會安裝相關dependency 和執行 Hugo Blox 

可以到 http://localhost:1313 去看看了


