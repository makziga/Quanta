import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 400px;
  height: 450px;
  border-radius: 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 100%);
  backdrop-filter: blur(8px);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 40px;
    padding: 1px;
    background: linear-gradient(180deg, rgba(254, 124, 34, 0.1) 0%, #FE7C22 100%);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
  margin: 50px 0 0 40px;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
`;

export const CardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.subtext};
  margin: 20px 40px 0;
`;

export const BulletList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 40px 0;
`;

export const BulletItem = styled.li`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.subtext};
  margin-bottom: 10px;
  position: relative;
  padding-left: 20px;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CardButton = styled.div`
  position: absolute;
  bottom: 50px;
  left: 40px;
  right: 40px;
`;