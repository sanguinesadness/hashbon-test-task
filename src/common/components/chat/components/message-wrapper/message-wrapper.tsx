import { ColorsBasicEnum } from 'common/constants';
import './message-wrapper.scss';

type TMessageWrapperProps = {
  text: string;
  bgColor?: ColorsBasicEnum;
  textColor?: ColorsBasicEnum;
};

export const MessageWrapper = ({
  text,
  bgColor,
  textColor
}: TMessageWrapperProps): JSX.Element => {
  return (
    <div
      className="message-wrapper"
      style={{ background: bgColor, color: textColor }}>
      {text}
    </div>
  );
};
