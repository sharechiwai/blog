---
title: Codecov upload coverage report without GitHub Action
date: 2023-03-01T00:00:00.000Z
draft: false
featured: false
tags:
  - Codecov
  - Code Coverage
  - Unit Test
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

終於有時間玩返D 自己想玩既野  
好耐之前自己用 `nodejs express` 整左個 project  
用 `Jest` 做 `Unit Test` 之後 upload 個 report 去 [Codecov](https://docs.codecov.com/docs){:target="_blank"}
放便睇返個coverage report  

最近想幫岩岩起既 `NextJs` project 做 `Unit Test` 同 upload report 去 `Codecov`  
發現佢 recommend 用 `GitHub Action` 或其他 build 既 pipeline 去 upload report ...  
對我呢D 資源比較短缺既 dev 用 `GitHub Action` 會用到 `Build` 既minutes  
所以可以local upload report 會比較化算  
但係唔係好清楚要點做...  

最後終於找到解決方法 (Windows 機)
我們可以使用以下方法去 download `codecov.exe` 
去 https://uploader.codecov.io/
或在powershell 執行
```powershell
Invoke-WebRequest -Uri https://uploader.codecov.io/latest/windows/codecov.exe 
-Outfile codecov.exe
```

將 `codecov.exe` 加到 `Environment Variable` 個 `path` 上面  
之後將 Codecov project 既 token 加到 environment variable 上
e.g. 
```bash
export CODECOV_TOKEN="{TOKEN}"
```

最後只要在 你的 `NextJs` / `ReactJs` 等等的project 上 執行
```bash
codecov
```
便會把你的coverage report upload 到 `Codecov`上面  

Hope you find it useful
