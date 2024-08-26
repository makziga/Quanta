import React from "react";
import { StyledSectionSubtitle } from "./SectionSubtitle.styles";

interface SectionSubtitleProps {
  children: React.ReactNode;
}

const SectionSubtitle: React.FC<SectionSubtitleProps> = ({ children }) => {
  return <StyledSectionSubtitle>{children}</StyledSectionSubtitle>;
};

export default SectionSubtitle;
