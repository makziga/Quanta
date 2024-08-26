import styled from "styled-components";

export const StyledButton = styled.button<{ width?: string; small?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ small }) => (small ? "7px" : "12px")};
  padding: 0 ${({ small }) => (small ? "18px" : "30px")};
  font-size: ${({ small }) => (small ? "14px" : "24px")};
  font-weight: 400;
  cursor: pointer;
  width: ${({ width }) => width || "auto"};
  height: ${({ small }) => (small ? "36px" : "60px")};
  box-shadow: ${({ small }) =>
    small
      ? "4px 4px 12px 0px rgba(254, 124, 34, 0.3)"
      : "8px 8px 24px 0px rgba(254, 124, 34, 0.3)"};
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ small }) =>
      small
        ? "4px 5px 12px 0px rgba(254, 124, 34, 0.4)"
        : "8px 10px 24px 0px rgba(254, 124, 34, 0.4)"};
  }
`;

export const FeatureCardButton = styled(StyledButton)`
  font-size: 16px;
  height: 40px;
  border-radius: 12px;
  box-shadow: none;
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 1);
`;
