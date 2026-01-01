---
title: "Sendgrid Api Setup to send Email and read Quota Info"
date: 2026-01-22
authors:
  - admin
summary: "最近開始認真地使用 SendGrid Email API 來send Email。現在明白到cybersecurity 既重要性1, 所以便重新去setup 我的SendGrid API Key。"
tags:
  - sendgrid
  - permissions
  - cybersecurity
  - email-quota
categories:
  - sendgrid
  - cybersecurity
---

最近開始認真地使用 **SendGrid Email API** 來**send Email**

之前都是為了快可以開始 所以API 都是選擇 **full control**

現在明白到**cybersecurity** 既重要性1, 所以便重新去setup 我的**SendGrid API Key**

要做到我想實現的功能我只需要以下**permission**

- **Mail Send** - **FULL**
- **Stats** - **READ**
- **Email Activity** - **READ**

![SendGrid API Setting for send email and read quota info](sendgrid-api-settings.png)

便可以做到

**Send Email** 和看看 **Email Quota** 還有多少

Hope you find it useful
