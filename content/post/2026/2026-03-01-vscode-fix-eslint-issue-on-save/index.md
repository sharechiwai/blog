---
title: "VSCode Fix ESLint Issue on Save"
date: 2026-03-01T00:00:00+08:00
author: ShareChiWai
categories:
  - VSCode
  - ESLint
tags:
  - VSCode
  - ESLint
  - Developer Tools
---

在日常開發中，我們經常需要使用 ESLint 來保持代碼質量和一致性。每次手動修復 ESLint 問題會很麻煩，但我們可以配置 VSCode 在保存文件時自動修復 ESLint 問題。

## 配置 VSCode 自動修復 ESLint 問題

### 1. 安裝 ESLint 擴展

首先，確保你已經安裝了 [ESLint 擴展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

### 2. 配置 settings.json

打開 VSCode 的設定檔案（`settings.json`），添加以下配置：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "svelte"
  ],
  "eslint.format.enable": true
}
```

### 3. 配置說明

- **`editor.codeActionsOnSave`**: 當保存文件時，VSCode 會自動執行指定的 code actions。`source.fixAll.eslint` 會讓 ESLint 自動修復所有可修復的問題。
  
- **`eslint.validate`**: 指定 ESLint 應該驗證哪些文件類型。根據你的項目需求添加或移除。

- **`eslint.format.enable`**: 啟用 ESLint 作為格式化程序。

### 4. 項目級別配置

如果你只想在特定項目中啟用此功能，可以在項目根目錄創建 `.vscode/settings.json` 檔案：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

這樣設定只會對該項目生效，不會影響其他項目。

## 注意事項

1. **自動修復的限制**: 不是所有 ESLint 問題都可以自動修復。有些問題（如缺失的 JSDoc）仍需手動處理。

2. **與 Prettier 的衝突**: 如果同時使用 Prettier，請確保 ESLint 和 Prettier 的規則不會衝突。可以使用 `eslint-config-prettier` 來禁用 ESLint 中與 Prettier 衝突的規則。

3. **性能影響**: 對於大型項目，自動修復可能會稍微增加保存時間。如果感覺保存變慢，可以考慮只在特定文件類型上啟用。

4. **Git Hooks 整合**: 建議配合 `lint-staged` 和 `husky`，在提交前自動修復 ESLint 問題，確保代碼庫的一致性。

## 總結

配置 VSCode 在保存時自動修復 ESLint 問題可以大大提高開發效率，減少手動修復的繁瑣工作。希望這個設定能幫助你保持代碼質量！

Hope you find it useful!
