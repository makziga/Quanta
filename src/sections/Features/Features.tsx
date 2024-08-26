import React from "react";
import { FeaturesContainer, FeaturesContent } from "./Features.styles";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";
import FeatureCard from "../../components/FeatureCard/FeatureCard";

const Features: React.FC = () => {
  const featureCards = [
    {
      title: "Security",
      description:
        "Identify potential security vulnerabilities and risky coding practices that could lead to breaches.",
      bulletPoints: [
        "Vulnerable dependencies",
        "Hardcoded secrets or API keys",
        "SQL injection vulnerabilities",
        "Cross-site scripting (XSS) vulnerabilities",
        "Use of deprecated or insecure functions",
      ],
      buttonText: "Check Security",
    },
    {
      title: "Performance",
      description:
        "Detect performance bottlenecks and suggest improvements for faster code execution.",
      bulletPoints: [
        "Inefficient algorithms",
        "Memory leaks",
        "Unnecessary database calls",
        "Unoptimized queries",
      ],
      buttonText: "Check Performance",
    },
    {
      title: "Bugs & Issues",
      description:
        "Identify potential bugs and logical errors in the codebase before they cause issues in production.",
      bulletPoints: [
        "Null pointer exceptions",
        "Off-by-one errors",
        "Infinite loops",
        "Uncaught exceptions",
        "Race conditions",
        "Dead code",
      ],
      buttonText: "Check Performance",
    },
  ];

  return (
    <FeaturesContainer id="features">
      <SectionTitle>Discover Anything!</SectionTitle>
      <SectionSubtitle>
        Quanta analyzes everything, from the smallest bugs to the biggest
        security issues—possibilities without limits.
      </SectionSubtitle>
      <FeaturesContent>
        {featureCards.map((card, index) => (
          <FeatureCard
            key={index}
            title={card.title}
            description={card.description}
            bulletPoints={card.bulletPoints}
            buttonText={card.buttonText}
          />
        ))}
      </FeaturesContent>
    </FeaturesContainer>
  );
};

export default Features;
