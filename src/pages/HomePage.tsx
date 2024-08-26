import React from "react";
import styled from "styled-components";
import Home from "../sections/Home/Home";
import Features from "../sections/Features/Features";
import Pricing from "../sections/Pricing/Pricing";

const PageContainer = styled.div`
  padding-top: 130px; // Add padding equal to the navbar height
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Home />
      <Features />
      <Pricing />
    </PageContainer>
  );
};

export default HomePage;
