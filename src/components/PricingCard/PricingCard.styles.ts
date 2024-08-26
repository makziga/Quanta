import styled from "styled-components";
import { CardContainer as FeatureCardContainer } from "../FeatureCard/FeatureCard.styles";

export const CardContainer = styled(FeatureCardContainer)<{
  isPopular: boolean;
}>`
  width: 400px;
  height: ${({ isPopular }) => (isPopular ? "710px" : "570px")};
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: ${({ isPopular }) =>
    isPopular ? "0 4px 24px rgba(254, 124, 34, 0.5)" : "none"};
`;

export const PlanName = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
`;

export const PlanDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.subtext};
  margin: 20px 0 0;
`;

export const PriceSeparator = styled.hr`
  width: 320px;
  border: none;
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.subtext},
    ${({ theme }) => theme.colors.subtext} 3px,
    transparent 3px,
    transparent 6px
  );
  margin: 25px 0;
`;

export const Price = styled(PlanName)`
  margin: 0 0 25px;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 30px;
`;

export const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 50px 0; // Add 50px bottom margin
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const FeatureItem = styled.li`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.subtext};
  margin-bottom: 10px;
  line-height: 150%;
  position: relative;
  padding-left: 20px;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
