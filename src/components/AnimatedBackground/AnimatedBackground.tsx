import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlurredCircle = styled.div`
  width: 1000px;
  height: 1000px;
  background-color: rgba(122, 54, 7, 0.25);
  border-radius: 50%;
  filter: blur(250px);
  position: absolute;
`;

const DotsGrid = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StaticBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<
    {
      x: number;
      y: number;
      opacity: number;
      targetOpacity: number;
      speed: number;
    }[]
  >([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const createDots = useCallback(() => {
    const dotSize = 1;
    const gap = 20;
    const rows = Math.ceil(dimensions.height / gap) + 1;
    const cols = Math.ceil(dimensions.width / gap) + 1;

    dotsRef.current = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        dotsRef.current.push({
          x: j * gap,
          y: i * gap,
          opacity: Math.random(),
          targetOpacity: Math.random(),
          speed: 0.005 + Math.random() * 0.1,
        });
      }
    }
  }, [dimensions]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dotsRef.current.forEach((dot) => {
      if (Math.abs(dot.opacity - dot.targetOpacity) < 0.001) {
        dot.targetOpacity = 0.2 + Math.random() * 0.8;
      }

      dot.opacity += (dot.targetOpacity - dot.opacity) * dot.speed;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(90, 46, 14, ${dot.opacity})`;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    createDots();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createDots, animate]);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
    }
    createDots();
  }, [dimensions, createDots]);

  return (
    <BackgroundContainer>
      <BlurredCircle />
      <DotsGrid
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
      />
    </BackgroundContainer>
  );
};

export default StaticBackground;
