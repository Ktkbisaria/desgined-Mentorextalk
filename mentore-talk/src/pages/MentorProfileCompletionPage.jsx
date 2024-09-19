import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Define colors
const colors = {
  primary: 'rgba(10, 10, 10, 0.8)',
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
  max-width: 800px;
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

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${colors.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  margin-bottom: 1rem;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.secondary};
  }
`;

const Button = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${colors.tertiary};
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 0, 0, 0.2);
  color: ${colors.tertiary};
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const MentorProfileCompletion = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: {
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    },
    education: {
      level: '',
      fieldOfStudy: '',
      institution: '',
      graduationYear: '',
    },
    skills: [],
    mentorSpecialty: '',
    username: '',
    bio: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (category, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [field]: value,
      },
    }));
  };

  const handleSkillsChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions, option => option.value);
    setFormData((prevData) => ({
      ...prevData,
      skills: selectedSkills,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        await axios.put('http://localhost:5000/api/users/profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Profile completion data saved successfully!');
        navigate('/profile');
      } catch (err) {
        console.error('Error saving profile completion data:', err);
        setError(`Failed to save profile completion data: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FormSection>
            <h2>Experience Details</h2>
            <Label htmlFor="company">Company</Label>
            <Input
              type="text"
              id="company"
              value={formData.experience.company}
              onChange={(e) => handleNestedChange('experience', 'company', e.target.value)}
              placeholder="Company name"
              required
            />
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              type="text"
              id="jobTitle"
              value={formData.experience.jobTitle}
              onChange={(e) => handleNestedChange('experience', 'jobTitle', e.target.value)}
              placeholder="Your position"
              required
            />
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              value={formData.experience.startDate}
              onChange={(e) => handleNestedChange('experience', 'startDate', e.target.value)}
              required
            />
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="date"
              id="endDate"
              value={formData.experience.endDate}
              onChange={(e) => handleNestedChange('experience', 'endDate', e.target.value)}
            />
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <TextArea
              id="responsibilities"
              value={formData.experience.responsibilities}
              onChange={(e) => handleNestedChange('experience', 'responsibilities', e.target.value)}
              placeholder="Describe your key responsibilities and achievements"
              required
            />
          </FormSection>
        );
      case 2:
        return (
          <FormSection>
            <h2>Education Details</h2>
            <Label htmlFor="educationLevel">Degree Level</Label>
            <Select
              id="educationLevel"
              value={formData.education.level}
              onChange={(e) => handleNestedChange('education', 'level', e.target.value)}
            >
              <option value="">Select degree level</option>
              <option value="Bachelor's">Bachelor's degree</option>
              <option value="Master's">Master's degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </Select>
            <Label htmlFor="fieldOfStudy">Field of Study</Label>
            <Input
              type="text"
              id="fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={(e) => handleNestedChange('education', 'fieldOfStudy', e.target.value)}
              placeholder="e.g., Computer Science"
              required
            />
            <Label htmlFor="institution">Institution</Label>
            <Input
              type="text"
              id="institution"
              value={formData.education.institution}
              onChange={(e) => handleNestedChange('education', 'institution', e.target.value)}
              placeholder="University name"
              required
            />
            <Label htmlFor="graduationYear">Graduation Year</Label>
            <Input
              type="number"
              id="graduationYear"
              value={formData.education.graduationYear}
              onChange={(e) => handleNestedChange('education', 'graduationYear', e.target.value)}
              placeholder="Year of graduation"
              required
            />
          </FormSection>
        );
      case 3:
        return (
          <FormSection>
            <h2>Skills and Specialty</h2>
            <Label htmlFor="skills">Technical Skills</Label>
            <Select
              id="skills"
              multiple
              value={formData.skills}
              onChange={handleSkillsChange}
              style={{ height: '150px' }}
            >
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Angular">Angular</option>
              <option value="Vue">Vue</option>
              <option value="Node.js">Node.js</option>
              <option value="AWS">AWS</option>
              <option value="Docker">Docker</option>
              <option value="Kubernetes">Kubernetes</option>
              <option value="MySQL">MySQL</option>
              <option value="MongoDB">MongoDB</option>
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="Git">Git</option>
              <option value="DevOps">DevOps</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
            </Select>
            <Label htmlFor="mentorSpecialty">Mentor Specialty</Label>
            <Select
              id="mentorSpecialty"
              name="mentorSpecialty"
              value={formData.mentorSpecialty}
              onChange={handleChange}
            >
              <option value="">Select your specialty</option>
              <option value="career-guidance">Career Guidance</option>
              <option value="tech-skills">Tech Skills</option>
              <option value="personal-development">Personal Development</option>
            </Select>
          </FormSection>
        );
      case 4:
        return (
          <FormSection>
            <h2>Personal Information</h2>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
            <Label htmlFor="bio">Bio</Label>
            <TextArea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              required
            />
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Title>Complete Your Mentor Profile</Title>
        <Subtitle>Step {step} of 4</Subtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          {renderStep()}
          <Button type="submit">
            {step < 4 ? 'Next' : 'Complete Profile'}
          </Button>
        </Form>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default MentorProfileCompletion;