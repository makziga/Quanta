import React from "react";
import { PricingContainer, PricingContent } from "./Pricing.styles";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";
import PricingCard from "../../components/PricingCard/PricingCard";

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      planName: "Basic",
      description:
        "Essential code analysis for individual developers and small projects",
      price: "$49 / month",
      features: [
        "Up to 15 code scans per month",
        "Code quality assessment",
        "Security analysis",
        "Bug detection",
        "Access to last 30 days of scan history",
        "Email support",
      ],
    },
    {
      planName: "Professional",
      description:
        "Comprehensive analysis and monitoring for growing teams and mid-size projects",
      price: "$99 / month",
      features: [
        "All Basic Plan features",
        "Up to 50 code scans per month",
        "Performance optimization",
        "Test coverage assessment",
        "Dependency management",
        "Code Generator",
        "CI/CD integration",
        "Access to last 90 days of scan history",
        "Priority email support",
        "Weekly summary reports",
      ],
      isPopular: true,
    },
    {
      planName: "Enterprise",
      description: "Advanced features for large teams and complex projects",
      price: "$299 / month",
      features: [
        "All Professional Plan features",
        "Up to 150 code scans per month",
        "Advanced AI Analysis",
        "Scalability analysis",
        "Multi-repository support",
        "Role-based access control",
      ],
    },
  ];

  return (
    <PricingContainer id="pricing">
      <SectionTitle>
        A universal tool for all analyzing your projects at your price point
      </SectionTitle>
      <SectionSubtitle>
        Three plans, tailored to your needs—choose the perfect fit with Quanta
      </SectionSubtitle>
      <PricingContent>
        {pricingPlans.map((plan, index) => (
          <PricingCard
            key={index}
            planName={plan.planName}
            description={plan.description}
            price={plan.price}
            features={plan.features}
            isPopular={plan.isPopular}
          />
        ))}
      </PricingContent>
    </PricingContainer>
  );
};

export default Pricing;
