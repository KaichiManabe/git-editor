// src/App.tsx
import React, { useEffect, useState } from 'react';
import { getDocuments, createDocument } from './api';

const App: React.FC = () => {
  const [documents, setDocuments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      const data = await getDocuments();
      setDocuments(data);
    };

    fetchDocuments();
  }, []);

  const handleCreateDocument = async () => {
    if (content.trim()) {
      const newDoc = await createDocument(content);
      setDocuments([...documents, newDoc]);
      setContent('');
    }
  };

  return (
    <div>
      <h1>Documents</h1>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>{doc.content}</li>
        ))}
      </ul>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleCreateDocument}>Create Document</button>
    </div>
  );
};

export default App;
