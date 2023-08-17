import { chatService } from 'common/services';
import { useEffect } from 'react';
import './chat.scss';
import { CommunicationBlock, SendMessageBlock } from './components';

export const Chat = (): JSX.Element => {
  useEffect(() => {
    chatService.init();
    return () => chatService.reset();
  }, []);

  return (
    <div className="chat">
      <CommunicationBlock />
      <SendMessageBlock />
    </div>
  );
};
