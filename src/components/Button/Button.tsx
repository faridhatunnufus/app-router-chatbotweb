import React from "react";
import s from "./Button.module.css";
import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "accent" | "purple";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  href,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  const buttonClasses = classNames(s.button, {
    [s.primary]: variant === "primary",
    [s.secondary]: variant === "accent",
    [s.purple]: variant === "purple",
  });

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;