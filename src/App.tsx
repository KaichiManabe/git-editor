// src/App.tsx
import React, { useState } from 'react';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const saveContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        console.log('Content saved');
      } else {
        console.error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div>
      <h1>Rich Text Editor</h1>
      <Editor content={content} setContent={setContent} />
      <button onClick={saveContent}>Save</button>
    </div>
  );
};

export default App;
