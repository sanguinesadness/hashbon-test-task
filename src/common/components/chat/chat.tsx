import './chat.scss';
import { CommunicationWindow, SendMessageWindow } from './components';

export const Chat = (): JSX.Element => {
  return (
    <div className="chat">
      <CommunicationWindow />
      <SendMessageWindow />
    </div>
  );
};
