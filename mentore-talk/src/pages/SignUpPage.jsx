import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Bouncy animation keyframes
const bouncy = keyframes`
  0% { top: 0em; }
  40% { top: 0em; }
  43% { top: -0.9em; }
  46% { top: 0em; }
  48% { top: -0.4em; }
  50% { top: 0em; }
  100% { top: 0em; }
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #0a0a0a;
  padding: 20px;
`;

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background: rgba(15, 15, 15, 0.9);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const ImageSection = styled.div`
  flex: 1.5;
  background-image: url('/assets/image.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const FormSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #aaa;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: rgba(26, 26, 26, 0.8);
  color: white;

  &::placeholder {
    color: #888;
  }
`;

// Updated Button with Bouncy Animation
const Button = styled.button`
  padding: 12px;
  background-color: #0078ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  position: relative; /* Required for animation */
  animation: ${bouncy} 5s infinite linear;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignUpLink = styled.p`
  margin-top: 20px;
  text-align: left;
  color: #aaa;

  a {
    color: #0078ff;
    text-decoration: none;
  }
`;

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Agreed to terms:', agreeToTerms);
    // Handle sign up logic here
  };

  return (
    <PageWrapper>
      <PageContainer>
        <ImageSection />
        <FormSection>
          <Title>Sign up</Title>
          <Subtitle>Welcome to the Smart Site System for Oil Depots. Register as a member to experience.</Subtitle>
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button type="submit">Create Account</Button>
          </Form>
          <SignUpLink>
            Already a member? <a href="/login">Sign in</a>
          </SignUpLink>
        </FormSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default SignUpPage;
