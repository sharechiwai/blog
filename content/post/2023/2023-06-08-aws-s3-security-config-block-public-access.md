---
title: AWS S3 Bucket Security config - Block public access
date: 2023-06-08T00:00:00.000Z
draft: false
featured: false
tags:
  - AWS
  - S3
  - AWS S3 config
  - Security Hub
  - Best Practice
  - AWS Best Practice
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

終於要接觸 Security related既野...
今日想同大家分享一些 S3 既config  
run 左 AWS 既 `Security Hub` 之後發現有以下的 問題...  
- S3 buckets should prohibit public read access
- S3 Block Public Access setting should be enabled at the bucket-level
- s3-bucket-public-read-prohibited
- s3-bucket-level-public-access-prohibited

![S3 should block public access](/media/2023/s3-prohibit-public-access.png "S3 should block public access")  

之後自己便每個 S3 Bucket 去檢查一下...  
發現有些`bucket` 真的是set 了public access 的  
![S3 public access](/media/2023/s3-public-access.png "S3 public access")  

**解決方法**
我們只需要 在S3 的 `Setting` 上
Enable Block public access (bucket settings) 便可
![S3 block public access](/media/2023/s3-block-public-access.png "S3 block public access") 
之後那個warning 便消失了

之前不太了解 S3 Bucket config 既時候以為set 了 `Block Public Access`的話..  
用API 也不能讀取檔案  
原來不是的..  

Hope you find it useful