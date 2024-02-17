---
title: S3 buckets should require requests to use Secure Socket Layer
date: 2023-06-12T00:00:00.000Z
draft: false
featured: false
tags:
  - S3
  - S3 Best practice
  - AWS Security Hubs
image:
  filename: featured
  focal_point: Smart
  preview_only: false
---

另一個在 `AWS Security Hubs` 遇到既建意係  
`S3 buckets should require requests to use Secure Socket Layer`  

![S3 buckets should require requests to use Secure Socket Layer](/media/2023/s3-require-requests-to-use-ssl.png  "S3 buckets should require requests to use Secure Socket Layer")    
主要係要用https 來 access 這個bucket  

**解決方法**  
我們只需要去`IAM`更新可以`access` 這個 `Bucket` 既`policy`   
加入以下 condition 便可 `"aws:SecureTransport": "true"`  
```json
"Condition": {
				"Bool": {
					"aws:SecureTransport": "true"
				}
			}
```

E.g.  
```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "bucket-access-policy-1",
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:GetObjectAttributes",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::[bucket-name]/*",
			"Condition": {
				"Bool": {
					"aws:SecureTransport": "true"
				}
			}
		}
	]
}
```

Hope you find it useful
