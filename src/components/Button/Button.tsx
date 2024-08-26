import React from "react";
import { StyledButton, FeatureCardButton } from "./Button.styles";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  variant?: "default" | "feature" | "small";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  width,
  variant = "default",
}) => {
  if (variant === "feature") {
    return (
      <FeatureCardButton onClick={onClick} width={width}>
        {children}
      </FeatureCardButton>
    );
  }

  return (
    <StyledButton onClick={onClick} width={width} small={variant === "small"}>
      {children}
    </StyledButton>
  );
};

export default Button;
