import React, { useState } from "react";
import {
  InputContainer,
  StyledInput,
  SubmitButton,
  ErrorMessage,
} from "./AnalyzeInput.styles";

interface AnalyzeInputProps {
  onAnalyze: (githubRepoUrl: string) => void;
}

const AnalyzeInput: React.FC<AnalyzeInputProps> = ({ onAnalyze }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) {
      setError("Please provide a link");
    } else if (!isValidUrl(input)) {
      setError("Link is invalid");
    } else {
      setError("");
      onAnalyze(input);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <InputContainer>
      <StyledInput
        placeholder="Please provide the GitHub repository of your app"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        hasError={!!error}
      />
      <SubmitButton onClick={handleSubmit}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SubmitButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default AnalyzeInput;
