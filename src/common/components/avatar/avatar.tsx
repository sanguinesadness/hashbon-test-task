import * as classNames from 'classnames';
import { ColorsBasicEnum } from 'common/constants';
import { PropsWithChildren } from 'react';
import { ClipLoader } from 'react-spinners';
import './avatar.scss';

type TAvatarProps = {
  onClick?: VoidFunction;
  iconAbbr?: string;
  bgColor?: ColorsBasicEnum;
  isLoading?: boolean;
  disabled?: boolean;
} & PropsWithChildren;

export const Avatar = ({
  children,
  onClick,
  iconAbbr,
  bgColor,
  isLoading,
  disabled
}: TAvatarProps): JSX.Element => {
  const handleClick = (): void => {
    if (!disabled) {
      onClick && onClick();
    }
  };

  return (
    <div
      className={classNames('avatar', {
        'avatar--action': !!onClick,
        'avatar--disabled': disabled
      })}
      style={{
        background: bgColor
      }}
      onClick={handleClick}>
      {isLoading ? (
        <ClipLoader color={ColorsBasicEnum.WHITE} size={27} />
      ) : iconAbbr ? (
        <div className="avatar__icon-abbr">{iconAbbr}</div>
      ) : (
        children
      )}
    </div>
  );
};
