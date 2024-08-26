import styled from "styled-components";

export const ResultsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 280px;
`;

export const PageTitle = styled.h1`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 48px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 16px;
`;

export const PageSubtitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #cac6dd;
  text-align: center;
  margin-bottom: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

export const ProblemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
`;

export const ProblemItem = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(254, 124, 34, 0.1) 0%,
      #fe7c22 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const ProblemText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #cac6dd;
  position: relative;
  z-index: 1;
`;

export const SummaryContainer = styled.div`
  width: 400px;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  padding: 30px;
  margin-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(254, 124, 34, 0.1) 0%,
      #fe7c22 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const SummaryTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 32px;
  color: #ffffff;
  margin: 0 0 20px 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 1;
`;

export const SummaryText = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #cac6dd;
  margin: 0;
  max-width: 320px;
  position: relative;
  z-index: 1;
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
`;

export const ActionButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  height: 40px;
  background: ${(props) => (props.primary ? "#FE7C22" : "transparent")};
  border: 1px solid #fe7c22;
  border-radius: 20px;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.primary ? "#FFFFFF" : "#FE7C22")};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${(props) =>
      props.primary ? "0 0 20px rgba(254, 124, 34, 0.4)" : "none"};
  }

  ${(props) =>
    props.primary &&
    `
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  width: 100%;
`;
