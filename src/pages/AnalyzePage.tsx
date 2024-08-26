import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import SectionSubtitle from "../components/SectionSubtitle/SectionSubtitle";
import AnalyzeOption from "../components/AnalyzeOption/AnalyzeOption";
import AnalyzeInput from "../components/AnalyzeInput/AnalyzeInput";
import AnalyzeLoading from "../components/AnalyzeLoading/AnalyzeLoading";
import AnalyzeResults from "../components/AnalyzeResults/AnalyzeResults";
import {
  AnalyzePageContainer,
  OptionsContainer,
  BackButton,
  ContentContainer,
} from "./AnalyzePage.styles";

type AnalyzeStep = "options" | "input" | "loading" | "results";
type AnalyzeType = "Security" | "Performance" | "Bugs & Issues";

interface Problem {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface AnalysisResult {
  summary: string;
  [key: string]: any; // For other properties in the result
}

const AnalyzePage: React.FC = () => {
  const [step, setStep] = useState<AnalyzeStep>("options");
  const [analyzeType, setAnalyzeType] = useState<AnalyzeType | null>(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step !== "options") {
      const timer = setTimeout(() => setShowBackButton(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowBackButton(false);
    }
  }, [step]);

  const handleOptionSelect = (type: AnalyzeType) => {
    setAnalyzeType(type);
    setStep("input");
  };

  const handleBack = () => {
    if (step === "input") {
      setStep("options");
      setAnalyzeType(null);
    } else if (step === "loading") {
      setStep("input");
    } else if (step === "results") {
      if (selectedProblem) {
        setSelectedProblem(null);
      } else {
        setStep("options");
        setAnalyzeType(null);
      }
    }
  };

  const handleAnalyze = async (githubRepoUrl: string) => {
    setStep("loading");
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<AnalysisResult>(
        "http://localhost:5000/analyze",
        {
          github_repo_url: githubRepoUrl,
          option: analyzeType,
        }
      );

      const { summary, ...analysisResults } = response.data;

      const problemsArray = Object.entries(analysisResults).map(
        ([id, problem]: [string, any]) => ({
          id,
          title: problem.title,
          description: problem.description,
          content: problem.content,
        })
      );

      setProblems(problemsArray);
      setSummary(summary);
      setStep("results");
    } catch (err) {
      setError(
        "An error occurred while analyzing the repository. Please try again."
      );
      setStep("input");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProblemSelect = (problem: Problem | null) => {
    setSelectedProblem(problem);
  };

  const renderContent = () => {
    switch (step) {
      case "options":
        return (
          <ContentContainer>
            <SectionTitle>Discover, Analyze, Optimize!</SectionTitle>
            <SectionSubtitle>
              Choose an option below to analyze your code and follow the
              instructions.
            </SectionSubtitle>
            <OptionsContainer>
              <AnalyzeOption
                title="Security"
                description="Identify potential security vulnerabilities and risky coding practices that could lead to breaches."
                onClick={() => handleOptionSelect("Security")}
              />
              <AnalyzeOption
                title="Performance"
                description="Detect performance bottlenecks and suggest improvements for faster code execution."
                onClick={() => handleOptionSelect("Performance")}
              />
              <AnalyzeOption
                title="Bugs & Issues"
                description="Identify potential bugs and logical errors in the codebase before they cause issues in production."
                onClick={() => handleOptionSelect("Bugs & Issues")}
              />
            </OptionsContainer>
          </ContentContainer>
        );
      case "input":
        return (
          <>
            <SectionTitle>{analyzeType}</SectionTitle>
            <SectionSubtitle>
              {analyzeType === "Security" &&
                "Identify potential security vulnerabilities and risky coding practices that could lead to breaches"}
              {analyzeType === "Performance" &&
                "Detect performance bottlenecks and suggest improvements for faster code execution"}
              {analyzeType === "Bugs & Issues" &&
                "Identify potential bugs and logical errors in the codebase before they cause issues in production"}
            </SectionSubtitle>
            <AnalyzeInput onAnalyze={handleAnalyze} />
          </>
        );
      case "loading":
        return <AnalyzeLoading />;
      case "results":
        return (
          <AnalyzeResults
            analyzeType={analyzeType || ""}
            problems={problems}
            summary={summary}
            onBack={handleBack}
            onProblemSelect={handleProblemSelect}
            selectedProblem={selectedProblem}
          />
        );
    }
  };

  return (
    <AnalyzePageContainer>
      <AnimatePresence>
        {showBackButton && (
          <motion.div
            key="back-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BackButton onClick={handleBack}>
              {step === "loading" ? "Cancel" : "Back"}
            </BackButton>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </AnalyzePageContainer>
  );
};

export default AnalyzePage;
