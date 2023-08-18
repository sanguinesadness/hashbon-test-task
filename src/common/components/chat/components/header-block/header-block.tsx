import './header-block.scss';

export const HeaderBlock = (): JSX.Element => {
  return (
    <div className="header-block">
      <span className="header-block__title">Bot Chat</span>
      <span className="header-block__description">AI-based service</span>
    </div>
  );
};
