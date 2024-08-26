import styled from "styled-components";

export const StyledSectionSubtitle = styled.p`
  font-size: 24px;
  font-weight: 400;
  max-width: 847px;
  margin: 0 0 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.subtext};
`;
