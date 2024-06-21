// src/components/Editor.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
      });

      quill.on('text-change', () => {
        setContent(quill.root.innerHTML);
      });

      if (content) {
        quill.root.innerHTML = content;
      }
    }
  }, [content, setContent]);

  return <div ref={editorRef} style={{ height: '400px' }} />;
};

export default Editor;
