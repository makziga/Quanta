import styled from "styled-components";

export const AnalyzePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 185px;
  min-height: calc(100vh - 185px);
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 30px;
  margin-bottom: 305px;
`;

export const BackButton = styled.button`
  position: fixed;
  top: 120px;
  left: 40px;
  background: none;
  border: none;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #cac6dd;
  cursor: pointer;
  z-index: 10;
`;
