const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const contentDir = 'C:\\Users\\chi\\Documents\\git\\blog\\content';

function getAllMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(getAllMdFiles(filePath));
    } else if (file.endsWith('.md') && file !== '_index.md') {
      results.push(filePath);
    }
  }
  
  return results;
}

function cleanFrontmatter(content) {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) return { content, modified: false };
  
  let frontmatter = frontmatterMatch[1];
  const body = content.substring(frontmatterMatch[0].length);
  let modified = false;
  
  const originalFrontmatter = frontmatter;
  const lines = frontmatter.split(/\r?\n/);
  const cleanedLines = [];
  let skipUntilNextField = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if we should skip this line (part of a multi-line array we're removing)
    if (skipUntilNextField) {
      // If line starts with whitespace and -, it's part of an array - skip it
      if (/^\s+-/.test(line)) {
        continue;
      }
      // If line matches a field pattern or is empty, we've exited the array
      skipUntilNextField = false;
    }
    
    // Remove empty categories: "categories:" followed by "  -" (empty dash)
    if (/^categories:$/.test(line) && i + 1 < lines.length && /^\s+-\s*$/.test(lines[i + 1])) {
      // Skip both the categories: line and the empty dash
      i++; // Skip the next line (empty dash)
      modified = true;
      continue;
    }
    
    // Remove 'layout: post'
    if (/^layout:\s*post\s*$/.test(line)) {
      modified = true;
      continue;
    }
    
    // Remove WordPress/Blogger metadata fields
    if (/^(guid|permalink):/.test(line)) {
      modified = true;
      continue;
    }
    
    // Remove blogger_* fields (including their array values)
    if (/^blogger_(blog|author|[a-f0-9]+_permalink):/.test(line)) {
      modified = true;
      skipUntilNextField = true;
      continue;
    }
    
    // Remove jabber_published field (including its array values)
    if (/^jabber_published:/.test(line)) {
      modified = true;
      skipUntilNextField = true;
      continue;
    }
    
    cleanedLines.push(line);
  }
  
  if (modified) {
    // Remove trailing empty lines from cleanedLines
    while (cleanedLines.length > 0 && cleanedLines[cleanedLines.length - 1].trim() === '') {
      cleanedLines.pop();
    }
    
    return {
      content: `---\n${cleanedLines.join('\n')}\n---\n${body}`,
      modified
    };
  }
  
  return { content, modified: false };
}

const files = getAllMdFiles(contentDir);
let modifiedCount = 0;

for (const filePath of files) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, modified } = cleanFrontmatter(content);
    
    if (modified) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      modifiedCount++;
      console.log(`✓ Cleaned: ${path.relative(contentDir, filePath)}`);
    }
  } catch (err) {
    console.error(`✗ Error processing ${filePath}: ${err.message}`);
  }
}

console.log(`\n✅ Total files modified: ${modifiedCount}`);
