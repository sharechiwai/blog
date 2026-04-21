---
title: "How to query json field in Postgresql"
date: 2026-02-03T00:00:00+08:00
author: ShareChiWai
categories:
  - PostgreSQL
tags:
  - PostgreSQL
  - JSON
  - Database
---

JSON 是一種常見的數據格式，Database 已經可以支援儲存同Query JSON 數據類型

今日就要係postgresql 度query 個 JSON field 睇返D log 同埋做返D data analysis

如何query JSON field in PostgreSQL 呢?

PostgreSQL 提供了兩個主要的操作符來查詢 JSON 數據：

- `->` - 獲取 JSON 對象欄位（返回 JSON 類型）
- `->>` - 獲取 JSON 對象欄位（返回 TEXT 類型）

## 查詢範例

假設我們有一個 `users` 表，其中 `profile` 欄位是 JSONB 類型：

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    profile JSONB
);

INSERT INTO users (name, profile) VALUES
('Alice', '{"age": 30, "city": "Hong Kong", "skills": ["JavaScript", "Python"]}'),
('Bob', '{"age": 25, "city": "Taipei", "skills": ["Java", "Go"]}');
```

### 1. 查詢特定欄位值

```sql
-- 使用 ->> 返回文本
SELECT name, profile->>'city' AS city FROM users;

-- 使用 -> 返回 JSON 對象
SELECT name, profile->'city' AS city FROM users;
```

### 2. WHERE 條件查詢

```sql
-- 查詢特定城市的使用者
SELECT * FROM users WHERE profile->>'city' = 'Hong Kong';

-- 數值比較（需要類型轉換）
SELECT * FROM users WHERE (profile->>'age')::int > 28;
```

### 3. 查詢嵌套 JSON

```sql
-- 嵌套對象查詢
INSERT INTO users (name, profile) VALUES
('Charlie', '{"age": 35, "address": {"street": "123 Main St", "district": "Central"}}');

SELECT name, profile->'address'->>'street' AS street FROM users;
```

### 4. 查詢 JSON 陣列

```sql
-- 檢查陣列中是否包含特定元素
SELECT * FROM users WHERE profile->'skills' ? 'JavaScript';

-- 獲取陣列中的特定索引（從 0 開始）
SELECT name, profile->'skills'->>0 AS first_skill FROM users;
```

### 5. 使用 JSON 函數

```sql
-- 獲取所有鍵
SELECT jsonb_object_keys(profile->'address') FROM users WHERE profile->'address' IS NOT NULL;

-- 檢查鍵是否存在
SELECT * FROM users WHERE profile ? 'skills';

-- 陣列長度
SELECT name, jsonb_array_length(profile->'skills') AS skill_count FROM users;
```

## 進階查詢：使用 JSON Path

PostgreSQL 12+ 支援 JSON Path 查詢：

```sql
-- 使用 jsonb_path_query
SELECT name, jsonb_path_query(profile, '$.city') AS city FROM users;

-- JSON Path 條件查詢
SELECT * FROM users WHERE jsonb_path_exists(profile, '$.age ? (@ > 28)');
```

## 建立索引提升效能

對於經常查詢的 JSON 欄位，可以建立索引：

```sql
-- GIN 索引適用於 JSONB
CREATE INDEX idx_users_city ON users USING GIN ((profile->'city'));

-- 或者使用表達式索引
CREATE INDEX idx_users_city_expr ON users ((profile->>'city'));

-- 為整個 JSONB 欄位建立索引
CREATE INDEX idx_users_profile ON users USING GIN (profile);
```

## 注意事項

1. 使用 `->>` 返回 TEXT，比較時可能需要類型轉換
2. `JSONB` 會移除重複鍵和保留空白，但不保留鍵的順序
3. 大量數據查詢時，記得建立適當的索引
4. 避免在 WHERE 條件中對整個 JSON 進行全文搜索，效能較差

Hope you find it useful!
