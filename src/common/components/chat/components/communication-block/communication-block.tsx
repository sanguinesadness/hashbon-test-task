import { MessageSenderType } from 'common/constants';
import { useStore } from 'common/hooks';
import { chatService } from 'common/services';
import { Message } from 'common/types';
import { useEffect, useRef } from 'react';
import { MessageWithAvatar } from '../message-with-avatar';
import './communication-block.scss';

export const CommunicationBlock = (): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);

  const currentMessage = useStore(chatService.currentMessage$, '');
  const messagesSorted = useStore(chatService.messagesSorted$, []);

  useEffect(() => {
    contentRef.current?.scrollTo({
      behavior: 'smooth',
      top: contentRef.current.scrollHeight
    });
  }, [messagesSorted]);

  useEffect(() => {
    console.log({ currentMessage });
  }, [currentMessage]);

  return (
    <div className="communication-block" ref={contentRef}>
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
