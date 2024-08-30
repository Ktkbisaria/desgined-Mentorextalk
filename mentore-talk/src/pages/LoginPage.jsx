import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Define the keyframes for the bouncy animation
const bouncyAnimation = keyframes`
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
  background: rgba(15, 15, 15, 0.9); /* Dark glass effect */
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Lighter border for contrast */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px); /* Optional: Adds a frosted glass effect */
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

const Button = styled.button`
  padding: 12px;
  background-color: #0078ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  animation: ${bouncyAnimation} 5s infinite linear; /* Applying the bouncy animation */

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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Handle login logic here
  };

  return (
    <PageWrapper>
      <PageContainer>
        <ImageSection />
        <FormSection>
          <Title>Log in</Title>
          <Subtitle>Welcome back! Log in to access your account.</Subtitle>
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
            <Button type="submit" className="bouncy">Log In</Button>
          </Form>
          <SignUpLink>
            New to our platform? <a href="/signup">Sign up</a>
          </SignUpLink>
        </FormSection>
      </PageContainer>
    </PageWrapper>
  );
};

export default LoginPage;
