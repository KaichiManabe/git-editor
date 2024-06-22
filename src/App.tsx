// src/App.tsx
import React, { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';
import DiffViewer from './components/DiffViewer';

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<{ getContent: () => string }>(null);
  const [baseCommit, setBaseCommit] = useState<string>('HEAD~1'); // 直前のコミット
  const [targetCommit, setTargetCommit] = useState<string>('HEAD'); // 最新のコミット
  const [commitHash, setCommitHash] = useState<string[]>([]); // コミットハッシュのリスト

  const saveContent = async () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent();
      setContent(newContent);

      try {
        const response = await fetch('http://localhost:3000/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newContent }),
        });

        if (response.ok) {
          console.log('Content saved');
          fetchCommitHashes();
        } else {
          console.error('Failed to save content');
        }
      } catch (error) {
        console.error('Error saving content:', error);
      }
    }
  };

  const fetchCommitHashes = async () => {
    try {
      const response = await fetch('http://localhost:3000/commits');
      if (response.ok) {
        const hashes = await response.json();
        setCommitHash(hashes);
        setBaseCommit(hashes.length > 1 ? hashes[1] : hashes[0]); // 直前のコミット
        setTargetCommit(hashes[0]); // 最新のコミット
      } else {
        console.error('Failed to fetch commit hashes');
      }
    } catch (error) {
      console.error('Error fetching commit hashes:', error);
    }
  };

  useEffect(() => {
    fetchCommitHashes();
  }, []);

  return (
    <div>
      <h1>Rich Text Editor</h1>
      <Editor ref={editorRef} content={content} setContent={setContent} />
      <button onClick={saveContent}>Save</button>
      <DiffViewer baseCommit={baseCommit} targetCommit={targetCommit} />
    </div>
  );
};

export default App;
