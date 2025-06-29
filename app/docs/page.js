import fs from 'fs';
import path from 'path';
import DocsClient from './DocsClient';

export const dynamic = 'force-static';

function getDocsContent() {
  const docsDir = path.join(process.cwd(), 'docs');
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
  files.sort();
  return files.map(filename => {
    const filePath = path.join(docsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      filename,
      content,
      title: filename.replace(/^[0-9]+-/, '').replace(/\.md$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
  });
}

export default function DocsPage() {
  const docs = getDocsContent();
  return <DocsClient docs={docs} />;
} 