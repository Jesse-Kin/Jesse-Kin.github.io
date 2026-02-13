// scripts/update-updated-only-staged.js
// 只更新这次 git commit 会包含的 source/ 目录下的 .md / .markdown 文件

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function getStagedMarkdownFilesInSource() {
  try {
    // 获取所有 staged 文件的相对路径
    const output = execSync(
      'git diff --cached --name-only --diff-filter=ACM',
      { encoding: 'utf-8' }
    ).trim();

    if (!output) {
      return [];
    }

    const allStaged = output.split(/\r?\n/);

    // 只保留 source/ 开头，且是 .md 或 .markdown 的文件
    const mdFiles = allStaged
      .map(file => file.trim())
      .filter(file => file.startsWith('source/'))
      .filter(file => /\.(md|markdown)$/i.test(file))
      .map(file => path.resolve(process.cwd(), file))
      .filter(fullPath => fs.existsSync(fullPath));

    return mdFiles;
  } catch (e) {
    console.error('无法获取 staged 文件列表：', e.message);
    console.error('可能原因：不在 git 仓库，或没有 staged 任何文件');
    return [];
  }
}

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  const fmRegex = /^\s*---\s*\r?\n([\s\S]*?)\r?\n\s*---\s*\r?\n?/;
  const match = content.match(fmRegex);

  if (!match) {
    console.log(`无 front-matter，跳过：${path.basename(filePath)}`);
    return;
  }

  const fmRaw = match[1];
  const body = content.slice(match[0].length).trimStart();

  let frontMatter;
  try {
    frontMatter = yaml.load(fmRaw) || {};
  } catch (e) {
    console.error(`YAML 解析失败 ${path.basename(filePath)}`);
    return;
  }

  const oldUpdated = frontMatter.updated;
  // frontMatter.updated = new Date().toISOString();
  const now = new Date();
  frontMatter.updated = now.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(/\//g, '-');
  // 输出示例：2026-02-13 10:38:26

  let newFm;
  try {
    newFm = yaml.dump(frontMatter, {
      lineWidth: -1,
      noRefs: true,
      sortKeys: false
    });
  } catch (e) {
    console.error(`YAML 序列化失败: ${filePath}`);
    return;
  }

  const newContent = `---\n${newFm.trim()}\n---\n\n${body}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`更新时间：${path.basename(filePath)} → ${frontMatter.updated}` +
    (oldUpdated ? ` (原: ${oldUpdated})` : ' (新增)'));
}

function main() {
  const files = getStagedMarkdownFilesInSource();

  if (files.length === 0) {
    console.log('这次 commit 没有 source/ 目录下的 .md / .markdown 文件被 staged');
    return;
  }

  console.log(`找到 ${files.length} 个 source/ 目录下将被 commit 的 md 文件`);
  files.forEach(updateFile);
}

main();