const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const yaml = require('js-yaml');  // ← 新增

const postsDir = path.join(__dirname, '../source/_posts');

function getLastCommitDate(filePath) {
    try {
        const cmd = `git log -1 --pretty="%ci" --date=iso-strict -- "${filePath}"`;
        let dateStr = execSync(cmd, { encoding: 'utf-8' }).trim();
        if (!dateStr) return null;
        dateStr = dateStr.replace(/([+-])(\d{2})(\d{2})$/, '$1$2:$3'); // +0800 → +08:00
        return dateStr;
    } catch (e) {
        console.error(e);
        return null;
    }
}

function updateFrontMatter(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const isoDate = getLastCommitDate(filePath);

    if (!isoDate) {
        console.log(`No git history for ${path.basename(filePath)}, skip.`);
        return;
    }

    // 尝试匹配 front-matter（宽松版）
    const fmRegex = /^\s*---\s*\r?\n([\s\S]*?)\r?\n\s*---\s*\r?\n?/;
    const match = content.match(fmRegex);

    if (!match) {
        console.log(`No front-matter found in ${path.basename(filePath)}, skip.`);
        return;
    }

    let frontMatterStr = match[1];
    let body = content.slice(match[0].length).trimStart();

    let frontMatter;
    try {
        frontMatter = yaml.load(frontMatterStr) || {};
    } catch (e) {
        console.error(`YAML parse error in ${path.basename(filePath)}: ${e.message}`);
        return;
    }

    // 只更新 updated，不覆盖 date
    const oldUpdated = frontMatter.updated;
    frontMatter.updated = isoDate;

    // 在 frontMatter.updated = isoDate; 之后加
    // if (frontMatter.date && typeof frontMatter.date === 'string') {
    //     frontMatter.date = frontMatter.date
    //         .replace(/\.\d{3}Z$/, '')           // 去掉 .000Z
    //         .replace(/([+-])(\d{2})(\d{2})$/, '$1$2:$3'); // +0800 → +08:00
    // }
    frontMatter.updated = frontMatter.updated
        .replace(/\s+/g, ' ')               // 空格 → T
        .replace(/([+-])(\d{2})(\d{2})$/, '');

    let newFrontMatterStr;
    try {
        newFrontMatterStr = yaml.dump(frontMatter, {
            lineWidth: -1,        // 不自动折行
            noRefs: true,
            sortKeys: false       // 保持原字段顺序
        });
    } catch (e) {
        console.error(`YAML dump error: ${e}`);
        return;
    }

    // 重新组装
    const newContent = `---\n${newFrontMatterStr.trim()}\n---\n\n${body}`;

    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log(`Updated: ${path.basename(filePath)} → ${isoDate}` +
        (oldUpdated ? ` (was: ${oldUpdated})` : ' (added)'));
}

function processAll() {
    const files = fs.readdirSync(postsDir, { withFileTypes: true })
        .filter(f => f.isFile() && f.name.endsWith('.md'));

    files.forEach(f => {
        const fullPath = path.join(postsDir, f.name);
        updateFrontMatter(fullPath);
    });
}

if (process.argv.length > 2) {
    // 支持指定文件
    process.argv.slice(2).forEach(arg => {
        const target = path.resolve(process.cwd(), arg);
        if (fs.existsSync(target) && target.endsWith('.md')) {
            updateFrontMatter(target);
        }
    });
} else {
    processAll();
}