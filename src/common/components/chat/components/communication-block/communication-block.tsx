import { MessageSenderType } from 'common/constants';
import { useStore } from 'common/hooks';
import { chatService } from 'common/services';
import { Message } from 'common/types';
import { MessageWithAvatar } from '../message-with-avatar';
import './communication-block.scss';

export const CommunicationBlock = (): JSX.Element => {
  const currentMessage = useStore(chatService.currentMessage$, '');
  const messagesSorted = useStore(chatService.messagesSorted$, []);

  return (
    <div className="communication-block">
      {messagesSorted.map((message: Message) => (
        <MessageWithAvatar
          key={message.id}
          text={message.content}
          type={message.type}
        />
      ))}
      {currentMessage && (
        <MessageWithAvatar text={currentMessage} type={MessageSenderType.BOT} />
      )}
    </div>
  );
};
