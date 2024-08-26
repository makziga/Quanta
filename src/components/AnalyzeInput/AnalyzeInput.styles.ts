import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 500px;
  position: relative;
  width: 100%; // Full width to allow centering
  justify-content: center; // Center horizontally
`;

export const StyledInput = styled.input<{ hasError: boolean }>`
  width: 597px;
  height: 50px;
  background: rgba(255, 255, 255, 0.01);
  border-radius: 25px;
  padding: 0 20px;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  color: #736e84;
  outline: none;
  box-shadow: inset 0 0 100px 15px rgba(166, 115, 220, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid transparent;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 25px;
    padding: 1px;
    background: linear-gradient(180deg, #301b47 0%, #8b3abf 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  ${({ hasError }) =>
    hasError &&
    `
    &::before {
      background: red;
    }
  `}
`;

export const SubmitButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #fe7c22;
  border: none;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 13px;
  box-shadow: 8px 8px 24px 0px rgba(254, 124, 34, 0.3);
`;

export const ErrorMessage = styled.p`
  color: #fe7c22;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  position: absolute;
  bottom: -35px;
  left: 20%;
  transform: translateX(-50%); // Adjust for exact centering
  margin-top: 20px; // Add top margin
`;
