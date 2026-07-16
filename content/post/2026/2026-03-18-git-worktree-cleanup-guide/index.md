---
title: Git Worktree Cleanup Guide
date: 2026-03-18
authors:
  - admin
summary: 學習如何檢查和清理已合併的 git worktree，包括批量刪除腳本和最佳實踐，避免 worktree 堆積影響開發效率。
tags:
  - git
  - git troubleshooting
  - git worktree
categories:
  - Development
---

當你使用 GitHub Copilot 或者其他工具建立 git worktree 之後，隨著時間推移，worktree 會越積越多。呢篇文章會教你點樣檢查邊啲 worktree 已經合併，同埋點樣批量清理佢哋。

## 點解要清理 Worktree？

Worktree 唔會自動刪除，即使相關嘅 Pull Request 已經合併。如果你唔定期清理：

- Worktree 會堆積，佔用磁碟空間
- 你會繼續遇到 "branch is already used by worktree" 錯誤
- `git worktree list` 會變得越來越長，難以管理

## 檢查邊個 Worktree 已經合併

### 方法一：手動檢查

```bash
# 1. 列出所有 worktree
git worktree list

# 2. 檢查邊啲 branch 已經合併到 main
git branch --merged main
```

對比兩個輸出，你就可以知道邊個 worktree 係安全可以刪除嘅。

### 方法二：一覽表

用呢個命令顯示每個 worktree 嘅合併狀態：

```bash
git worktree list --porcelain | grep -E "^(worktree|branch)" | while read line; do
  if [[ $line == worktree* ]]; then
    path=${line#worktree }
  else
    branch=${line#branch }
    branch_name=${branch#refs/heads/}
    if git branch --merged main | grep -q "$branch_name"; then
      echo "✓ MERGED: $path ($branch_name)"
    else
      echo "✗ ACTIVE: $path ($branch_name)"
    fi
  fi
done
```

輸出會好似咁：

```
✓ MERGED: C:/Users/chi/Documents/git/copilot-worktrees/frontend/task-1 (sharechiwai-task-1)
✗ ACTIVE: C:/Users/chi/Documents/git/copilot-worktrees/frontend/task-2 (sharechiwai-task-2)
✓ MERGED: C:/Users/chi/Documents/git/copilot-worktrees/frontend/task-3 (sharechiwai-task-3)
```

標記 ✓ MERGED 嘅就係可以安全刪除嘅 worktree。

## 刪除 Worktree 同 Branch

### 重要概念

`git worktree remove` **只會刪除 worktree**，唔會刪除 branch。你需要分開處理：

```bash
# 1. 刪除 worktree（刪除工作目錄）
git worktree remove C:/Users/chi/Documents/git/copilot-worktrees/frontend/sharechiwai-task-1

# 2. 刪除 branch（刪除 branch 引用）
git branch -d sharechiwai-task-1

# 如果 branch 未合併但你想強制刪除（小心使用）
git branch -D sharechiwai-task-1
```

### 批量清理腳本（Bash）

呢個腳本會自動刪除所有已合併嘅 worktree 同 branch：

```bash
#!/bin/bash
# 刪除所有已合併到 main 嘅 worktree

git worktree list --porcelain | awk '
/^worktree / { path=$2 }
/^branch / { 
    branch=$2
    gsub("refs/heads/", "", branch)
    print path "|" branch
}' | while IFS='|' read -r wt_path wt_branch; do
    # 跳過 main/master branch
    if [[ "$wt_branch" == "main" || "$wt_branch" == "master" ]]; then
        continue
    fi
    
    # 檢查 branch 是否已合併
    if git branch --merged main | grep -q "$wt_branch"; then
        echo "Removing merged worktree: $wt_path ($wt_branch)"
        git worktree remove "$wt_path"
        git branch -d "$wt_branch"
    fi
done

# 清理 stale references
git worktree prune
echo "Cleanup complete!"
```

### 批量清理腳本（PowerShell）

Windows 用戶可以用呢個 PowerShell 版本：

```powershell
# 刪除所有已合併到 main 嘅 worktree

$worktrees = git worktree list --porcelain
$currentPath = ""
$toRemove = @()

foreach ($line in $worktrees) {
    if ($line -match "^worktree (.+)") {
        $currentPath = $matches[1]
    }
    elseif ($line -match "^branch refs/heads/(.+)") {
        $branch = $matches[1]
        
        # 跳過 main/master
        if ($branch -eq "main" -or $branch -eq "master") { continue }
        
        # 檢查是否已合併
        $merged = git branch --merged main
        if ($merged -match $branch) {
            $toRemove += [PSCustomObject]@{
                Path = $currentPath
                Branch = $branch
            }
        }
    }
}

foreach ($item in $toRemove) {
    Write-Host "Removing: $($item.Path) ($($item.Branch))"
    git worktree remove $item.Path
    git branch -d $item.Branch
}

git worktree prune
Write-Host "Cleanup complete!"
```

## 最佳實踐

### 1. 定期清理

建議每次合併 PR 之後都檢查下同清理 worktree。你可以將呢個加入你嘅 post-merge routine。

### 2. 建立 Alias

喺 `.gitconfig` 加入 alias 方便清理：

```ini
[alias]
    wt-cleanup = "!f() { git worktree list --porcelain | awk '/^worktree/{p=$2}/^branch/{b=$2;gsub(\"refs/heads/\",\"\",b);print p\"|\"b}' | while IFS='|' read p b; do [[ \"$b\" != \"main\" && \"$b\" != \"master\" ]] && git branch --merged main | grep -q \"$b\" && echo \"Removing $p ($b)\" && git worktree remove \"$p\" && git branch -d \"$b\"; done && git worktree prune && echo \"Cleanup complete!\"; }; f"
```

之後只需要行 `git wt-cleanup` 就可以自動清理。

### 3. 清理前檢查

執行批量刪除之前，建議先 review 下個 list：

```bash
# 先睇下邊個會被刪除
git worktree list --porcelain | grep -E "^(worktree|branch)" | while read line; do
  if [[ $line == worktree* ]]; then
    path=${line#worktree }
  else
    branch=${line#branch }
    branch_name=${branch#refs/heads/}
    if git branch --merged main | grep -q "$branch_name"; then
      echo "Will remove: $path ($branch_name)"
    fi
  fi
done
```

確認無問題先至執行清理腳本。

## 總結

清理 git worktree 係保持 repository 整潔嘅重要步驟。用 `git branch --merged` 檢查邊個 worktree 已經合併，然後用 `git worktree remove` 同 `git branch -d` 分別刪除 worktree 同 branch。你可以用上面嘅腳本自動化呢個過程，節省時間同避免錯誤。

記住：**worktree 唔會自動刪除**，你需要手動清理。養成定期清理嘅習慣，可以避免好多不必要嘅問題。
