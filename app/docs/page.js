import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export const dynamic = 'force-static'; // For Next.js static rendering

function getDocsContent() {
  const docsDir = path.join(process.cwd(), 'docs');
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));
  files.sort(); // Sort by filename (e.g., 1-overview.md, 2-features.md)
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
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 gradient-text">Documentation</h1>
      <ul className="mb-8 space-x-4 flex flex-wrap">
        {docs.map(doc => (
          <li key={doc.filename}>
            <a href={`#${doc.title.replace(/\s+/g, '-')}`} className="text-blue-400 hover:underline text-lg font-medium">
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
      {docs.map(doc => (
        <section key={doc.filename} id={doc.title.replace(/\s+/g, '-')}
          className="mb-12 bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 gradient-text">{doc.title}</h2>
          <ReactMarkdown className="prose prose-invert max-w-none text-gray-200">{doc.content}</ReactMarkdown>
        </section>
      ))}
    </div>
  );
} 