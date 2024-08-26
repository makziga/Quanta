import React from "react";
import {
  CardContainer,
  CardTitle,
  CardDescription,
  BulletList,
  BulletItem,
  CardButton,
} from "./FeatureCard.styles";
import Button from "../Button/Button";

interface FeatureCardProps {
  title: string;
  description: string;
  bulletPoints: string[];
  buttonText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  bulletPoints,
  buttonText,
}) => {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <BulletList>
        {bulletPoints.map((point, index) => (
          <BulletItem key={index}>{point}</BulletItem>
        ))}
      </BulletList>
      <CardButton>
        <Button
          onClick={() => (window.location.href = "/analyze")}
          width="100%"
          variant="feature"
        >
          {buttonText}
        </Button>
      </CardButton>
    </CardContainer>
  );
};

export default FeatureCard;
