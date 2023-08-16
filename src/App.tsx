import { messagesTransport, SendMessageRequestModel } from 'common/api';
import { ChangeEvent, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const handleMessageSend = (): void => {
    const payload = new SendMessageRequestModel({ message });
    void messagesTransport.sendMessage(payload);
  };

  return (
    <div>
      <input placeholder="Message..." onChange={handleMessageChange} />
      <button onClick={handleMessageSend}>Send message</button>
    </div>
  );
}

export default App;
