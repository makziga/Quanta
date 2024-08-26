import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-left: 20px;
  font-size: 18px;
  color: #333;
`;

const LoadingAnimation: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Generating solution...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingAnimation;
