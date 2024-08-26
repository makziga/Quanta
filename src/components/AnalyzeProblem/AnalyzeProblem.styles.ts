import styled from "styled-components";

export const ProblemContainer = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

export const ContentBox = styled.div`
  width: 100%;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  padding: 10px 40px;

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

export const Heading = styled.h2`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 32px;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
  margin-bottom: 20px;
`;

export const Text = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #cac6dd;
  margin-bottom: 20px;

  p {
    margin-bottom: 20px;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
`;

export const CodeBlock = styled.div`
  margin-bottom: 20px;
`;

export const CodeFileName = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #cac6dd;
  margin-bottom: 15px;
`;

export const CodeContent = styled.div`
  border-radius: 8px;
  overflow: hidden;
  font-size: 16px !important;

  & > pre {
    margin: 0 !important;
    border-radius: 8px;
    font-size: inherit !important;
  }

  & code {
    font-size: inherit !important;
  }
`;

export const ActionButton = styled.button`
  width: 100%;
  max-width: 1220px;
  height: 60px;
  background-color: #fe7c22;
  border: none;
  border-radius: 30px;
  color: white;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 60px;

  &:hover {
    box-shadow: 8px 8px 24px rgba(254, 124, 34, 0.4);
  }
`;
