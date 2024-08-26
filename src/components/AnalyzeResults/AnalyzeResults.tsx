import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResultsContainer,
  ContentWrapper,
  ProblemsContainer,
  ProblemItem,
  ProblemText,
  SummaryContainer,
  SummaryTitle,
  SummaryText,
  ActionsContainer,
  ActionButton,
} from "./AnalyzeResults.styles";
import AnalyzeProblem from "../AnalyzeProblem/AnalyzeProblem";
import SectionTitle from "../SectionTitle/SectionTitle";
import SectionSubtitle from "../SectionSubtitle/SectionSubtitle";

interface Problem {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface AnalyzeResultsProps {
  analyzeType: string;
  problems: Problem[];
  summary: string;
  onBack: () => void;
  onProblemSelect: (problem: Problem | null) => void;
  selectedProblem: Problem | null;
}

const AnalyzeResults: React.FC<AnalyzeResultsProps> = ({
  analyzeType,
  problems,
  summary,
  onBack,
  onProblemSelect,
  selectedProblem,
}) => {
  const handleProblemClick = (problem: Problem) => {
    onProblemSelect(problem);
  };

  const handleBack = () => {
    if (selectedProblem) {
      onProblemSelect(null);
    } else {
      onBack();
    }
  };

  return (
    <ResultsContainer>
      <AnimatePresence mode="wait">
        {selectedProblem ? (
          <motion.div
            key="problem-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AnalyzeProblem
              title={selectedProblem.title}
              description={selectedProblem.description}
              content={selectedProblem.content}
            />
          </motion.div>
        ) : (
          <motion.div
            key="problem-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle>Your Report is Ready!</SectionTitle>
            <SectionSubtitle>
              {analyzeType === "Security"
                ? "We found some security issues"
                : analyzeType === "Performance"
                ? "We found some performance issues"
                : "We found some bugs and issues"}
            </SectionSubtitle>
            <ContentWrapper>
              <ProblemsContainer>
                {problems.map((problem) => (
                  <ProblemItem
                    key={problem.id}
                    onClick={() => handleProblemClick(problem)}
                  >
                    <ProblemText>{problem.title}</ProblemText>
                  </ProblemItem>
                ))}
              </ProblemsContainer>
              <div>
                <SummaryContainer>
                  <SummaryTitle>Summary</SummaryTitle>
                  <SummaryText>{summary}</SummaryText>
                </SummaryContainer>
                <ActionsContainer>
                  <ActionButton primary>
                    Contact Our Team For Assistance
                  </ActionButton>
                  <ActionButton>
                    Learn More About {analyzeType} Best Practices
                  </ActionButton>
                </ActionsContainer>
              </div>
            </ContentWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </ResultsContainer>
  );
};

export default AnalyzeResults;
