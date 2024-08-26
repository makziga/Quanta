import React from "react";
import {
  CardContainer,
  OptionTitle,
  OptionDescription,
  OptionButton,
} from "./AnalyzeOption.styles";

interface AnalyzeOptionProps {
  title: string;
  description: string;
  onClick: () => void;
}

const AnalyzeOption: React.FC<AnalyzeOptionProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <CardContainer>
      <OptionTitle>{title}</OptionTitle>
      <OptionDescription>{description}</OptionDescription>
      <OptionButton onClick={onClick}>Check {title}</OptionButton>
    </CardContainer>
  );
};

export default AnalyzeOption;