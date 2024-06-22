import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import simpleGit from 'simple-git';

// プロジェクトのディレクトリを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const git = simpleGit();

app.use(bodyParser.json());

const PORT = 3000;
const repoPath = path.join(__dirname, 'repo');

if (!fs.existsSync(repoPath)) {
  fs.mkdirSync(repoPath);
  git.init(repoPath).then(() => console.log('Repository initialized'));
}

app.post('/save', async (req, res) => {
  const { content } = req.body;
  const filePath = path.join(repoPath, 'content.html');

  fs.writeFile(filePath, content, async (err) => {
    if (err) {
      return res.status(500).send('Failed to save content');
    }

    try {
      await git.add(filePath);
      await git.commit('Updated content');
      res.send('Content saved and committed');
    } catch (err) {
      res.status(500).send('Failed to commit changes');
    }
  });
});

app.get('/diff', async (req, res) => {
  const { baseCommit, targetCommit } = req.query;
  const filePath = path.join(repoPath, 'content.html');

  try {
    const diff = await git.diff([`${baseCommit}..${targetCommit}`, '--', filePath]);
    res.send(diff);
  } catch (err) {
    res.status(500).send('Failed to get diff');
  }
});

app.get('/commits', async (req, res) => {
  try {
    const log = await git.log();
    const hashes = log.all.map(commit => commit.hash);
    res.json(hashes);
  } catch (err) {
    res.status(500).send('Failed to get commit hashes');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
