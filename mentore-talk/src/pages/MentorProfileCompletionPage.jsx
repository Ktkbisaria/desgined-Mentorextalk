import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

// Define colors
const colors = {
  primary: 'rgba(0, 0, 0, 0.7)',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

const PageWrapper = styled.div`
  background-image: url('assets/Overview3.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
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
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled.div`
  color: ${colors.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: ${colors.tertiary};
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(to right, ${colors.secondary}, ${colors.tertiary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  font-size: 1rem;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: background-color 0.3s;

  &:focus {
    outline: none;
    background-color: rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.tertiary};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
  margin-top: 1rem;
`;

const SuccessMessage = styled.p`
  color: #51cf66;
  text-align: center;
  margin-top: 1rem;
`;

const MentorProfileCompletionPage = () => {
  const [education, setEducation] = useState('');
  const [achievement, setAchievement] = useState('');
  const [skill, setSkill] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!education || !achievement || !skill || !bio) {
      setError('All fields are mandatory.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/mentor/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          education,
          achievement,
          skill,
          bio,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/feed');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred while saving your profile.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Header>
          <Logo>MentoreTalk</Logo>
          <Nav>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/mentorship">Mentorship</NavLink>
            <NavLink to="/roadmaps">Roadmaps</NavLink>
            <NavLink to="/why-mentoretalk">Why MentoreTalk</NavLink>
            <NavLink to="/how-it-works">How it Works</NavLink>
          </Nav>
        </Header>
        <MainContent>
          <Title>Complete Your Mentor Profile</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Profile completed! Redirecting...</SuccessMessage>}
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Educational Background"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Achievement or Experience"
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              required
            />
            <TextArea
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="4"
              required
            />
            <Button type="submit">Complete Profile</Button>
          </Form>
        </MainContent>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default MentorProfileCompletionPage;