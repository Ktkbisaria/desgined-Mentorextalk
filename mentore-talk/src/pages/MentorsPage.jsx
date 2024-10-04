import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
`;

const MentorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MentorCard = styled.div`
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Username = styled.h3`
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const Experience = styled.p`
  color: ${colors.tertiary};
  margin-bottom: 0.5rem;
`;

const SkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1rem;
`;

const SkillTag = styled.span`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const MentorsPage = () => {
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMentors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/api/v1/mentors', {
        params: { search },
      });
      setMentors(response.data.data.mentors);
    } catch (err) {
      console.error('Error fetching mentors:', err);
      setError('Failed to fetch mentors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [search]);

  return (
    <PageWrapper>
      <Header>
        <SearchBar
          type="text"
          placeholder="Search mentors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Header>

      {loading && <p>Loading mentors...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <MentorGrid>
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor._id}>
              <ProfilePicture 
                src={mentor.profilePicture || '/default-profile.png'} 
                alt={mentor.username}
              />
              <Username>{mentor.username}</Username>
              <Experience>
                {mentor.experience ? `${mentor.experience.jobTitle} at ${mentor.experience.company}` : 'No experience listed'}
              </Experience>
              <SkillsWrapper>
                {mentor.skills && mentor.skills.length > 0 ? (
                  mentor.skills.map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))
                ) : (
                  <SkillTag>No skills listed</SkillTag>
                )}
              </SkillsWrapper>
            </MentorCard>
          ))
        ) : (
          <p>No mentors found.</p>
        )}
      </MentorGrid>
    </PageWrapper>
  );
};

export default MentorsPage;