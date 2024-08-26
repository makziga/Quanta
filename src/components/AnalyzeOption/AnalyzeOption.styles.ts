import styled from "styled-components";

export const CardContainer = styled.div`
  width: 400px;
  height: 275px;
  border-radius: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 40px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(254, 124, 34, 0.1) 0%,
      #fe7c22 100%
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const OptionTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: white;
  margin: 0 0 20px 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
  z-index: 1;
`;

export const OptionDescription = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #cac6dd;
  margin: 0 0 20px 0;
  z-index: 1;
`;

export const OptionButton = styled.button`
  width: 320px;
  height: 40px;
  background-color: #fe7c22;
  border: none;
  border-radius: 12px;
  color: white;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  cursor: pointer;
  text-shadow: 0 0 20px rgba(255, 255, 255, 1);
  margin-top: auto;
  z-index: 1;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 8px 8px 24px rgba(254, 124, 34, 0.4);
  }
`;
