import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Edit from '../components/Edit';
import UserProfile from '../components/UserProfile';
export default function Home() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/edit">記事</Link></li>
            <li><Link to="/profile">プロフィール</Link></li>
          </ul>
        </nav>

        {/* 各ページへのルート設定 */}
        <Routes>
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}