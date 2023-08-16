import { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import './text-input.scss';

type TTextInputProps = {
  value: string;
  onChange: (value: string) => void;
  rightAcc?: JSX.Element | ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const TextInput = ({
  value,
  onChange,
  rightAcc,
  ...props
}: TTextInputProps): JSX.Element => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <div className="text-input">
      <input
        className="text-input__field"
        value={value}
        onChange={handleValueChange}
        {...props}
      />
      <div className="text-input__right-acc">{rightAcc}</div>
    </div>
  );
};
