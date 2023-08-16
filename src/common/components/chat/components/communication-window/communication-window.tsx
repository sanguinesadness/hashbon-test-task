import { MessageSenderType } from 'common/constants';
import { MessageWithAvatar } from '../message-with-avatar';
import './communication-window.scss';

export const CommunicationWindow = (): JSX.Element => {
  return (
    <div className="communication-window">
      <MessageWithAvatar
        text="Hello! I’m BotHub, AI-based bot designed to answer all your questions."
        type={MessageSenderType.BOT}
      />
      <MessageWithAvatar
        text="Hello. help me to solve my math test"
        type={MessageSenderType.USER}
      />
      <MessageWithAvatar
        text="Alright. Send me tasks"
        type={MessageSenderType.BOT}
      />
      <MessageWithAvatar
        text="First task is following:
Lucy has measuring cups of sizes 1 cup, 1/5 cup, 1/3 cup, and 1/4 cup. She is trying to measure out 1/6 of a cup of water and says, ''If I fill up the the 1/2 cup and then pour that into the 1/3 cup until it is full, there will be 1/6 of a cup of water left.'"
        type={MessageSenderType.USER}
      />
      <MessageWithAvatar
        text="I guess you can solve it by yourself!"
        type={MessageSenderType.BOT}
      />
    </div>
  );
};
