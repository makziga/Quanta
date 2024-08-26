import React from "react";
import {
  CardContainer,
  PlanName,
  PlanDescription,
  PriceSeparator,
  Price,
  FeatureList,
  FeatureItem,
  ButtonWrapper,
} from "./PricingCard.styles";
import Button from "../Button/Button";

interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  description,
  price,
  features,
  isPopular = false,
}) => {
  return (
    <CardContainer isPopular={isPopular}>
      <PlanName>{planName}</PlanName>
      <PlanDescription>{description}</PlanDescription>
      <PriceSeparator />
      <Price>{price}</Price>
      <ButtonWrapper>
        <Button onClick={() => {}} width="100%" variant="feature">
          Get Started
        </Button>
      </ButtonWrapper>
      <FeatureList>
        {features.map((feature, index) => (
          <FeatureItem key={index}>{feature}</FeatureItem>
        ))}
      </FeatureList>
    </CardContainer>
  );
};

export default PricingCard;
