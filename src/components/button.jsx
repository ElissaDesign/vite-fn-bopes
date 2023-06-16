/* eslint-disable */
import React from "react";

const Button = ({
  children,
  style,
  onClick,
  variant = "default",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
  ...rest
}) => (
  <button
    type={type}
    className={`btn ${variant} ${size} ${style}`}
    onClick={onClick}
    disabled={disabled ? disabled : loading}
    {...rest}
  >
    {loading ? <div className="loader mr-1" /> : children}
  </button>
);

export default Button;
