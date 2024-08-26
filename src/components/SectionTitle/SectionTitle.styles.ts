import styled from "styled-components";

export const StyledSectionTitle = styled.h2`
  font-size: 64px;
  font-weight: 400;
  max-width: 992px;
  margin: 0 0 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.25);
`;
