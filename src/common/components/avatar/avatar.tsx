import * as classNames from 'classnames';
import { ColorsBasicEnum } from 'common/constants';
import { PropsWithChildren } from 'react';
import './avatar.scss';

type TAvatarProps = {
  onClick?: VoidFunction;
  iconAbbr?: string;
  bgColor?: ColorsBasicEnum;
} & PropsWithChildren;

export const Avatar = ({
  children,
  onClick,
  iconAbbr,
  bgColor
}: TAvatarProps): JSX.Element => {
  return (
    <div
      className={classNames('avatar', { 'avatar--action': !!onClick })}
      style={{
        background: bgColor
      }}
      onClick={onClick}>
      {iconAbbr ? (
        <div className="avatar__icon-abbr">{iconAbbr}</div>
      ) : (
        children
      )}
    </div>
  );
};
