import React from "react";
import { StyledSectionTitle } from "./SectionTitle.styles";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  return <StyledSectionTitle>{children}</StyledSectionTitle>;
};

export default SectionTitle;
