import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  ProblemContainer,
  ContentBox,
  Heading,
  Text,
  CodeBlock,
  CodeFileName,
  CodeContent,
  ActionButton,
} from "./AnalyzeProblem.styles";

interface AnalyzeProblemProps {
  title: string;
  description: string;
  content: string;
}

const AnalyzeProblem: React.FC<AnalyzeProblemProps> = ({
  title,
  description,
  content,
}) => {
  const [solution, setSolution] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTakeAction = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-solution",
        {
          problem_content: content,
        }
      );
      setSolution(response.data.solution);
    } catch (error) {
      console.error("Error generating solution:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, index) => {
      if (block.startsWith("# ")) {
        return <Heading key={index}>{block.slice(2)}</Heading>;
      } else if (block.startsWith("```")) {
        const [fileName, ...codeLines] = block.split("\n");
        const code = codeLines.slice(0, -1).join("\n");
        return (
          <CodeBlock key={index}>
            <CodeFileName>{fileName.slice(3)}</CodeFileName>
            <CodeContent>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "20px",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              >
                {code}
              </SyntaxHighlighter>
            </CodeContent>
          </CodeBlock>
        );
      } else {
        return (
          <Text key={index}>
            <ReactMarkdown>{block}</ReactMarkdown>
          </Text>
        );
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ProblemContainer>
        <ContentBox>
          {solution ? renderContent(solution) : renderContent(content)}
          {!solution && (
            <ActionButton onClick={handleTakeAction} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Take Action"}
            </ActionButton>
          )}
        </ContentBox>
      </ProblemContainer>
    </motion.div>
  );
};

export default AnalyzeProblem;
