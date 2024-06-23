import SignUp from './components/SingUp';
import LogIn from './components/LogIn';
import UserProfile from './components/UserProfile';
import Edit from './components/Edit';

export default function App() {
  return (
    <div className="App">
      <h1>Document Editor</h1>
      <UserProfile />
      <Edit />
      <SignUp />
      <LogIn />
    </div>
  );
}
