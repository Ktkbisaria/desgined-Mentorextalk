import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResponseBox = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 20px;
  white-space: pre-wrap;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
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
      console.error('Error:', err);
      if (err.response?.data?.details?.includes('GoogleGenerativeAIFetchError')) {
        setError('There was an issue with the AI service. Please try again later or contact support.');
      } else {
        setError(err.response?.data?.details || err.message || 'An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleCodeAnalysis = (e) => {
    e.preventDefault();
    handleRequest('code-analysis', { code, language });
  };

  const handleGenerateExercise = (e) => {
    e.preventDefault();
    handleRequest('generate-exercise', { language, difficulty });
  };

  const handleAnswerQuestion = (e) => {
    e.preventDefault();
    handleRequest('answer-question', { question });
  };

  return (
    <Container>
      <Title>AI Coding Mentor</Title>

      <div>
        <Button onClick={() => setActiveTab('codeAnalysis')}>Code Analysis</Button>
        <Button onClick={() => setActiveTab('generateExercise')}>Generate Exercise</Button>
        <Button onClick={() => setActiveTab('answerQuestion')}>Ask Question</Button>
      </div>

      {activeTab === 'codeAnalysis' && (
        <Form onSubmit={handleCodeAnalysis}>
          <Label>Language:</Label>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </Select>
          <Label>Code:</Label>
          <TextArea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your code here"
          />
          <Button type="submit" disabled={loading}>Analyze Code</Button>
        </Form>
      )}

      {activeTab === 'generateExercise' && (
        <Form onSubmit={handleGenerateExercise}>
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
        <Form onSubmit={handleAnswerQuestion}>
          <Label>Question:</Label>
          <TextArea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your programming question here"
          />
          <Button type="submit" disabled={loading}>Ask Question</Button>
        </Form>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {response && <ResponseBox>{response}</ResponseBox>}
    </Container>
  );
};

export default AICodingMentor;