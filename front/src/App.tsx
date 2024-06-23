import {useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState(1);

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, authorId }),
      });
      const data = await response.json();
      console.log("Document saved:", data);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  return (
    <div className="App">
      <h1>Document Editor</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}