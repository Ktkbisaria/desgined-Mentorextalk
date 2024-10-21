import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const colors = {
  primary: '#1c1e21',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
  background: '#2c2f33',
  highlight: '#ffdd57',
};

const PageWrapper = styled.div`
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  min-height: 100vh;
  padding: 2rem;
`;

const ProfileHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid ${colors.secondary};
`;

const Username = styled.h1`
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const Bio = styled.p`
  color: ${colors.tertiary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SkillTag = styled.span`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
`;

const MentorProfile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/mentors/${mentorId}`);
        setMentor(response.data.data.mentor);
      } catch (err) {
        console.error('Error fetching mentor details:', err);
      }
    };
    
    fetchMentorDetails();
  }, [mentorId]);

  if (!mentor) {
    return <PageWrapper>Loading...</PageWrapper>;
  }

  return (
    <PageWrapper>
      <ProfileHeader>
        <ProfilePicture src={mentor.profilePicture || '/default-profile.png'} alt={mentor.username} />
        <Username>{mentor.username}</Username>
        {mentor.bio && <Bio>{mentor.bio}</Bio>}
      </ProfileHeader>
      <SkillsWrapper>
        {mentor.skills && mentor.skills.length > 0 ? (
          mentor.skills.map((skill, index) => (
            <SkillTag key={index}>{skill}</SkillTag>
          ))
        ) : (
          <SkillTag>No skills listed</SkillTag>
        )}
      </SkillsWrapper>
    </PageWrapper>
  );
};

export default MentorProfile;
