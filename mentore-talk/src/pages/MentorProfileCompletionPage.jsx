import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

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

const Select = styled.select`
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
  const [formData, setFormData] = useState({
    education: '',
    experience: '',
    skills: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
  
    if (!formData.education || !formData.experience || !formData.skills || !formData.bio) {
      setError('All fields are mandatory.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.put('http://localhost:5000/api/users/profile', 
        {
          ...formData,
          skills: formData.skills.split(',').map(skill => skill.trim())
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        throw new Error('Profile update failed');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.response?.data?.message || 'An error occurred. Please try again later.');
    }
  };
  
  return (
    <PageWrapper>
      <ContentWrapper>
        <MainContent>
          <Title>Complete Your Mentor Profile</Title>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>Profile completed! Redirecting...</SuccessMessage>}
          <Form onSubmit={handleSubmit}>
            <Select
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your education</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </Select>
            <Select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your experience</option>
              <option value="Less than 1 year">Less than 1 year</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="More than 5 years">More than 5 years</option>
            </Select>
            <Input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter your skills (comma-separated)"
              required
            />
            <TextArea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Write a brief bio about yourself..."
              required
            />
            <Button type="submit">Submit</Button>
          </Form>
        </MainContent>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default MentorProfileCompletionPage;