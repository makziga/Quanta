import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 230px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(10px);
  border-top: 1px solid #180a01;
`;

export const FooterContent = styled.div`
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 91px 0 35px; // 91px top padding, 35px bottom padding
`;

export const Logo = styled.div`
  width: 211px;
  height: 47px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Copyright = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const Links = styled.div`
  display: flex;
  gap: 60px;
`;

export const Link = styled.a`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;
