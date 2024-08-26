import React from "react";
import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavLink,
  NavButton,
} from "./Navbar.styles";
import Button from "../Button/Button";

import logo from "../../assets/Quanta.svg";

const Navbar: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <NavbarContainer>
      <Logo src={logo} alt="Pryzma Logo" />
      <NavLinks>
        <NavLink to="#" onClick={() => scrollToSection("top")}>
          Home
        </NavLink>
        <NavLink to="#" onClick={() => scrollToSection("features")}>
          Features
        </NavLink>
        <NavLink to="#" onClick={() => scrollToSection("pricing")}>
          Pricing
        </NavLink>
      </NavLinks>
      <NavButton>
        <Button
          onClick={() => (window.location.href = "/analyze")}
          variant="small"
        >
          Get Started
        </Button>
      </NavButton>
    </NavbarContainer>
  );
};

export default Navbar;
