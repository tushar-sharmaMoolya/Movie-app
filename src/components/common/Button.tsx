import React from "react";
import "./Button.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  size?: ButtonSize;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${
        disabled || loading ? "btn-disabled" : ""
      } ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <span className="btn-loader">⏳</span> : children}
    </button>
  );
};

export default Button;
