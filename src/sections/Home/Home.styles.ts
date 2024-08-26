import styled from "styled-components";

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  text-align: center;
`;

export const TrustBadge = styled.div`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
  width: 452px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 8px 24px 1px rgba(254, 124, 34, 0.3);
  position: relative;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 24px 1px rgba(254, 124, 34, 0.3);
    border-radius: 50px;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CTAButton = styled.div`
  margin-top: 30px;
`;
