---
title: How to install PostgreSQL Client psql on AWS VM - 在AWS VM 上如何安裝 PostgreSQL Client
subtitle: How to install PostgreSQL Client on AWS EC2
draft: true

# Summary for listings and search engines
summary: How to install PostgreSQL Client on AWS EC2

# Link this post with a project
projects: []

# Date published
date: '2024-01-02T00:00:00Z'

# Date updated
lastmod: '2024-01-02T00:00:00Z'

# Is this an unpublished draft?
draft: false

# Show this page in the Featured widget?
featured: false

# Featured image
# Place an image named `featured.jpg/png` in this page's folder and customize its options here.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/CpkOjOcXdUY)'
#   focal_point: ''
#   placement: 2
#   preview_only: false

authors:
  - admin

tags:
  - AWS
  - Linux
  - AWS VM
  - PostgreSQL

categories:
  - AWS
  - Postgresql
  - 教程
---

之前用開 Azure 係上面開左隻 Ubuntu VM 去做 Database backup and upload to Azure  
轉左工之後用到 `AWS` 多  
而EC2 上面的 VM 是這個 version 的 `Amazon Linux 2023 AMI for the EC2`  
所以安裝 `PostgreSQL Client` 的方法也有些不同  

**解決方法**
可以執行以下指拎到安裝 (我的是 PostgreSQL Client 15)
```bash
sudo dnf install postgresql15
```

Hope you find it useful

