import { useState } from "react";
// Vite はトランスパイル時に import.meta.env のプロパティを VITE_ から始まる環境変数に置換する
// これを利用して本番環境と開発環境で Fetch API のリクエスト先を切り替えられる
// 参考: https://ja.vitejs.dev/guide/env-and-mode.html
// const getMessagesApi = `${import.meta.env.VITE_API_ENDPOINT}/messages`;
const postSendApi = `${import.meta.env.VITE_API_ENDPOINT}/documents`;

export default function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState(1);

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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
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
