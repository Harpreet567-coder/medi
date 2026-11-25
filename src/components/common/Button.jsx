import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, danger, outline
  size = "md", // sm, md, lg
  className = "",
  disabled = false,
  icon = null,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};
