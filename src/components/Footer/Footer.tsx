import React from "react";
import {
  FooterContainer,
  FooterContent,
  LogoContainer,
  Logo,
  Copyright,
  Links,
  Link,
} from "./Footer.styles";
import { ReactComponent as PryzmaLogo } from "../../assets/Quanta.svg";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>
          <Logo>
            <PryzmaLogo />
          </Logo>
          <Copyright>© 2024 Quanta</Copyright>
        </LogoContainer>
        <Links>
          <Link href="" target="_blank" rel="noopener noreferrer">
            Terms of Use
          </Link>
          <Link href="" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>
        </Links>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
