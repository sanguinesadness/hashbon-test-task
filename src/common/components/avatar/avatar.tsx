import * as classNames from 'classnames';
import { PropsWithChildren } from 'react';
import './avatar.scss';

type TAvatarProps = {
  onClick?: VoidFunction;
} & PropsWithChildren;

export const Avatar = ({ children, onClick }: TAvatarProps): JSX.Element => {
  return (
    <div
      className={classNames('avatar', { 'avatar--action': !!onClick })}
      onClick={onClick}>
      {children}
    </div>
  );
};
