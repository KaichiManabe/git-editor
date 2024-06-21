// src/components/DiffViewer.tsx
import React, { useEffect, useState } from 'react';

interface DiffViewerProps {
  baseCommit: string;
  targetCommit: string;
}

const DiffViewer: React.FC<DiffViewerProps> = ({ baseCommit, targetCommit }) => {
  const [diff, setDiff] = useState<string>('');

  useEffect(() => {
    const fetchDiff = async () => {
      try {
        const response = await fetch(`http://localhost:5173/diff?baseCommit=${baseCommit}&targetCommit=${targetCommit}`);
        if (response.ok) {
          const diffText = await response.text();
          setDiff(diffText);
        } else {
          console.error('Failed to fetch diff');
        }
      } catch (error) {
        console.error('Error fetching diff:', error);
      }
    };

    fetchDiff();
  }, [baseCommit, targetCommit]);

  return (
    <div>
      <h2>Diff Viewer</h2>
      <pre>{diff}</pre>
    </div>
  );
};

export default DiffViewer;
