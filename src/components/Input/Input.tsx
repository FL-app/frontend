import React from 'react';
import './Input.scss';

interface InputProps {
  label: string;
  id: string;
  name: string;
  isRequired?: boolean;
  inputValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function Input(props: InputProps) {
  const { label, id, name, isRequired, inputValue, onChange, placeholder } =
    props;
  return (
    <div className="form-input-container">
      <label htmlFor={id} className="form-input-label">
        {label}
        <input
          className="form-input"
          id={id}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          value={inputValue}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Input.defaultProps = {
  isRequired: false,
};

export default Input;
