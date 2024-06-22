// src/components/Editor.tsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

const Editor = forwardRef<{ getContent: () => string }, EditorProps>(({ content, setContent }, ref) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });

      if (content) {
        quillRef.current.root.innerHTML = content;
      }
    }
  }, [content]);

  useImperativeHandle(ref, () => ({
    getContent: () => {
      if (quillRef.current) {
        return quillRef.current.root.innerHTML;
      }
      return '';
    },
  }));

  return <div ref={editorRef} style={{ height: '400px' }} />;
});

export default Editor;