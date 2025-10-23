import React, { ChangeEvent, FocusEvent } from "react";
import "./InputField.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  name: string;
  required?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  name,
  required = false,
  className = "",
  ...props
}) => {
  const showError = touched && error;

  return (
    <div className={`input-field ${className}`}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`input-control ${showError ? "input-error" : ""}`}
        {...props}
      />
      {showError && <div className="error-message">{error}</div>}
    </div>
  );
};

export default InputField;
