import React from "react";
import {
  HomeContainer,
  TrustBadge,
  ContentWrapper,
  CTAButton,
} from "./Home.styles";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";

const Home: React.FC = () => {
  return (
    <HomeContainer id="home">
      <ContentWrapper>
        <TrustBadge>Quanta can analyze any project!</TrustBadge>
        <SectionTitle>
          Quanta: Improve Your Code with AI-Powered Analysis
        </SectionTitle>
        <SectionSubtitle>
          Elevate your development with Quanta, the AI-driven code analysis
          tool. Simply connect your GitHub repository, and our advanced AI agent
          will uncover security vulnerabilities, performance bottlenecks, and
          potential bugs. Let Quanta shed light on your code's hidden issues,
          empowering you to build more secure, efficient, and robust
          applications.
        </SectionSubtitle>
        <CTAButton>
          <Button
            width="500px"
            onClick={() => (window.location.href = "/analyze")}
          >
            Get Started Now
          </Button>
        </CTAButton>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;
