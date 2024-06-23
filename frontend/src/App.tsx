import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quillのスタイルシートをインポート
import "./App.css"; // 必要ならばスタイルシートをインポート

// Vite はトランスパイル時に import.meta.env のプロパティを VITE_ から始まる環境変数に置換する
// これを利用して本番環境と開発環境で Fetch API のリクエスト先を切り替えられる
// 参考: https://ja.vitejs.dev/guide/env-and-mode.html
const postSendApi = `${import.meta.env.VITE_API_ENDPOINT}/documents`;

export default function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [authorId, setAuthorId] = useState<number>(1);

  const handleSave = async () => {
    try {
      const response = await fetch(postSendApi, {
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
      <ReactQuill value={content} onChange={setContent} placeholder="Content" />
      <input
        type="number"
        value={authorId}
        onChange={(e) => setAuthorId(Number(e.target.value))}
        placeholder="Author ID"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
