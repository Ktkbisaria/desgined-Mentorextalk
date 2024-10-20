import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const colors = {
  primary: '#333333',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

const PageWrapper = styled.div`
  background-image: url('assets/ai-background.png'); // Use a relevant background image
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: ${colors.tertiary};
  padding: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); // Dark overlay
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(to right, ${colors.secondary}, ${colors.tertiary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: bold;
  color: ${colors.tertiary};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResponseBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  margin-top: 20px;
  white-space: pre-wrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AICodingMentor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('codeAnalysis');

  const handleRequest = async (endpoint, data) => {
    setLoading(true);
    setError('');
    setResponse('');
    try {
      const res = await axios.post(`http://localhost:5000/api/ai-mentor/${endpoint}`, data);
      setResponse(res.data[Object.keys(res.data)[0]]);
    } catch (err) {
      setError(err.response?.data?.details || err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>AI Coding Mentor</Title>

        <div>
          <Button onClick={() => setActiveTab('codeAnalysis')}>Code Analysis</Button>
          <Button onClick={() => setActiveTab('generateExercise')}>Generate Exercise</Button>
          <Button onClick={() => setActiveTab('answerQuestion')}>Ask Question</Button>
        </div>

        {activeTab === 'codeAnalysis' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('code-analysis', { code, language }); }}>
            <Label>Language:</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </Select>
            <Label>Code:</Label>
            <TextArea value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter your code here" />
            <Button type="submit" disabled={loading}>Analyze Code</Button>
          </Form>
        )}

        {activeTab === 'generateExercise' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('generate-exercise', { language, difficulty }); }}>
            <Label>Language:</Label>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </Select>
            <Label>Difficulty:</Label>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
            <Button type="submit" disabled={loading}>Generate Exercise</Button>
          </Form>
        )}

        {activeTab === 'answerQuestion' && (
          <Form onSubmit={(e) => { e.preventDefault(); handleRequest('answer-question', { question }); }}>
            <Label>Question:</Label>
            <TextArea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Enter your programming question here" />
            <Button type="submit" disabled={loading}>Ask Question</Button>
          </Form>
        )}

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {response && <ResponseBox>{response}</ResponseBox>}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default AICodingMentor;
