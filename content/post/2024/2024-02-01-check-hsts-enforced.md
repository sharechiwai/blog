---
title: How to check if your website has Enforcing HTTP Strict Transport Security
subtitle: How to install PostgreSQL Client on AWS EC2
draft: true

# Summary for listings and search engines
summary: How to check if your website has Enforcing HTTP Strict Transport Security

# Link this post with a project
projects: []

# Date published
date: '2024-02-01T00:00:00Z'

# Date updated
lastmod: '2024-02-01T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

authors:
  - admin

tags:
  - Cybersecurity
  - CURL
  - Troubleshooting

categories:
  - Cybersecurity
  - CURL
  - Troubleshooting
---


**解法方法:**  
可以用 `CURL` 來看看你的 Server / website 有無 `Strict-Transport-Security:` 這個 header  
```
curl -s -D- https://sharechiwai.com | grep -i strict-transport-security:
```

e.g.  
![Check strick-transport-security header](/media/2024/curl-hsts.png  "check hsts") 

Hope you find it useful
