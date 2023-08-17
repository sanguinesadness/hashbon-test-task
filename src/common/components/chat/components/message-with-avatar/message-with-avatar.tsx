import * as classNames from 'classnames';
import { RobotIcon } from 'common/assets';
import { Avatar } from 'common/components';
import { ColorsBasicEnum, MessageSenderType } from 'common/constants';
import { animated, useSpring } from 'react-spring';
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

  const springProps = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.5)' }
  });

  return (
    <animated.div
      style={springProps}
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
    </animated.div>
  );
};
