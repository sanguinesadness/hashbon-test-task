import { SendIcon } from 'common/assets';
import { Avatar, TextInput } from 'common/components';
import { useStore } from 'common/hooks';
import { chatService } from 'common/services';
import { KeyboardEvent, useState } from 'react';
import './send-message-block.scss';

export const SendMessageBlock = (): JSX.Element => {
  const [message, setMessage] = useState<string>('');
  const isLoading = useStore(chatService.isLoading$, false);

  const handleSendMessage = (): void => {
    if (!message || isLoading) {
      return;
    }
    void chatService.requestMessageSend(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="send-message-block">
      <TextInput
        value={message}
        onChange={setMessage}
        placeholder="Start typing here..."
        onKeyDown={handleKeyDown}
        rightAcc={
          <Avatar
            onClick={handleSendMessage}
            isLoading={isLoading}
            disabled={!message && !isLoading}>
            <SendIcon />
          </Avatar>
        }
      />
    </div>
  );
};
