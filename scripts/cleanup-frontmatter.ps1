# PowerShell script to clean up Hugo blog frontmatter
# Fixes:
# 1. Remove empty categories entries (categories:\n  -)
# 2. Remove deprecated 'layout: post' field
# 3. Remove WordPress/Blogger legacy metadata (guid, blogger_*, jabber_published, permalink, jabber_published)

$ErrorActionPreference = "Stop"
$contentDir = "C:\Users\chi\Documents\git\blog\content"

# Get all markdown files
$files = Get-ChildItem -Path $contentDir -Recurse -Filter "*.md" -File

$modifiedCount = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $modified = $false

    # Split frontmatter from content (between --- markers)
    if ($content -match '^---\r?\n') {
        $endOfFrontmatter = $content.IndexOf("---", 3)
        if ($endOfFrontmatter -gt 0) {
            $frontmatter = $content.Substring(0, $endOfFrontmatter + 3)
            $body = $content.Substring($endOfFrontmatter + 3)
            
            $newFrontmatter = $frontmatter
            
            # 1. Remove empty categories entries: categories:\n  -\n (followed by another field or end)
            $newFrontmatter = $newFrontmatter -replace '(?m)^categories:\r?\n\s+-\s*\r?\n', ''
            
            # 2. Remove 'layout: post' line
            $newFrontmatter = $newFrontmatter -replace '(?m)^layout:\s*post\r?\n', ''
            
            # 3. Remove WordPress/B Blogger metadata
            $newFrontmatter = $newFrontmatter -replace '(?m)^guid:.*\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^blogger_blog:.*\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^blogger_author:.*\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^blogger_[a-f0-9]+_permalink:.*\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^jabber_published:\r?\n\s+-.*\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^jabber_published:\s*\[.*\]\r?\n', ''
            $newFrontmatter = $newFrontmatter -replace '(?m)^permalink:.*\r?\n', ''
            
            if ($newFrontmatter -ne $frontmatter) {
                $content = $newFrontmatter + $body
                $modified = $true
            }
        }
    }

    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $modifiedCount++
        Write-Host "Cleaned: $($file.Name)"
    }
}

Write-Host "`nTotal files modified: $modifiedCount"
