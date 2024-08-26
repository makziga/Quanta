import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 78px; // Reduced from 130px
  padding: 0 48px; // Reduced from 80px
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.01) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.navbarBorder};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

export const Logo = styled.img`
  width: 126px; // Reduced from 211px
  height: 28px; // Reduced from 47px
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 48px; // Reduced from 80px
`;

export const NavLink = styled(Link)`
  font-size: 14px; // Reduced from 24px
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const NavButton = styled.div`
  width: 123px; // Reduced from 205px
`;
