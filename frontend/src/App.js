import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import homepage from './pages/homepage';
import ChatPage from './pages/chatpage';

function App() {
  return (
    <div className='App'>
      <Route path="/" component={homepage} exact/>
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;
