import React from "react";
import { LoadingContainer, LoadingSpinner } from "./AnalyzeLoading.styles";
import SectionTitle from "../SectionTitle/SectionTitle";
import SectionSubtitle from "../SectionSubtitle/SectionSubtitle";

const AnalyzeLoading: React.FC = () => {
  return (
    <LoadingContainer>
      <SectionTitle>Analyzing</SectionTitle>
      <SectionSubtitle>
        Please wait while the AI analyzes your entire app. This may take up to 3
        minutes.
      </SectionSubtitle>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default AnalyzeLoading;
