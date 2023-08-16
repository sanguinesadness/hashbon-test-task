import { Chat } from 'common/components';
import './app.scss';

function App() {
  return (
    <div className="app">
      <div className="content">
        <span className="content__title">Bot Chat</span>
        <span className="content__description">AI-based service</span>
        <div className="content__chat-wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
