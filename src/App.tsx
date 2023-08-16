import { useStore } from 'common/hooks';
import { chatService } from 'common/services';
import { ChangeEvent, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const currentMessage = useStore(chatService.currentMessage$);

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleMessageSend = (): void => {
    void chatService.requestMessageSend(message);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <input placeholder="Message..." onChange={handleMessageChange} />
        <button onClick={handleMessageSend}>Send message</button>
      </div>
      <span style={{ fontSize: '12px' }}>{currentMessage}</span>
    </div>
  );
}

export default App;
