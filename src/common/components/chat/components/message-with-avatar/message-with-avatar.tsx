import * as classNames from 'classnames';
import { RobotIcon } from 'common/assets';
import { Avatar } from 'common/components';
import { ColorsBasicEnum, MessageSenderType } from 'common/constants';
import { MessageWrapper } from '../message-wrapper';
import './message-with-avatar.scss';

type TBotMessageProps = {
  text: string;
  type: MessageSenderType;
};

export const MessageWithAvatar = ({
  text,
  type
}: TBotMessageProps): JSX.Element => {
  const isBot = type === MessageSenderType.BOT;
  const isUser = type === MessageSenderType.USER;

  return (
    <div
      className={classNames('message-with-avatar', {
        'message-with-avatar--right-handed': isUser,
        'message-with-avatar--left-handed': isBot
      })}>
      {isBot && (
        <>
          <Avatar bgColor={ColorsBasicEnum.BLUE}>
            <RobotIcon />
          </Avatar>
          <MessageWrapper
            text={text}
            textColor={ColorsBasicEnum.BLACK}
            bgColor={ColorsBasicEnum.LIGHT_BLUE}
          />
        </>
      )}
      {isUser && (
        <>
          <MessageWrapper
            text={text}
            textColor={ColorsBasicEnum.WHITE}
            bgColor={ColorsBasicEnum.BLUE}
          />
          <Avatar bgColor={ColorsBasicEnum.LIGHT_BLUE} iconAbbr="T" />
        </>
      )}
    </div>
  );
};
