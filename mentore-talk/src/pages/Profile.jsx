import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Define consistent colors
const colors = {
  primary: '#0a0a0a',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
};

// Styled components
const ProfileWrapper = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  color: ${colors.tertiary};
  background-color: ${colors.primary};
  min-height: 100vh;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  position: relative;
`;

const ProfileBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to right, ${colors.secondary}, ${colors.primary});
  opacity: 0.1;
  border-radius: 12px 12px 0 0;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 4px solid ${colors.secondary};
  box-shadow: 0 0 20px rgba(0, 199, 133, 0.3);
`;

const Username = styled.h2`
  font-size: 2.5rem;
  color: ${colors.secondary};
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Bio = styled.p`
  font-size: 1.2rem;
  color: ${colors.tertiary};
  text-align: center;
  max-width: 600px;
  margin-bottom: 1.5rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 199, 133, 0.2);

  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 199, 133, 0.3);
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const SectionCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 199, 133, 0.2);
  }
`;

const SectionHeader = styled.h3`
  font-size: 1.5rem;
  color: ${colors.secondary};
  margin-bottom: 1rem;
  border-bottom: 2px solid ${colors.secondary};
  padding-bottom: 0.5rem;
`;

const UserActivity = styled.div`
  color: ${colors.tertiary};
  font-size: 1.1rem;
`;

const Input = styled.input`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.secondary};
  }
`;

const TextArea = styled.textarea`
  background-color: rgba(255, 255, 255, 0.1);
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.secondary};
  }
`;
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimelineEntry = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: ${colors.secondary};
  }
`;

const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h4`
  font-size: 1.2rem;
  color: ${colors.tertiary};
  margin: 0 0 0.5rem 0;
`;

const TimelineSubtitle = styled.h5`
  font-size: 1rem;
  color: ${colors.secondary};
  margin: 0 0 0.5rem 0;
`;

const TimelineDescription = styled.p`
  font-size: 0.9rem;
  color: ${colors.tertiary};
  margin: 0;
`;

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(`Failed to fetch user data: ${err.response?.data?.message || err.message}`);
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({
      username: userData.username || '',
      bio: userData.bio || '',
      education: userData.education || '',
      experience: userData.experience || '',
      skills: userData.skills ? userData.skills.join(', ') : '',
    });
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const updatedData = {
        ...editedData,
        skills: editedData.skills.split(',').map(skill => skill.trim())
      };
      await axios.put('http://localhost:5000/api/users/profile', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData({...userData, ...updatedData});
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(`Failed to save profile: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <ProfileWrapper>Loading...</ProfileWrapper>;
  if (error) return <ProfileWrapper>{error}</ProfileWrapper>;
  if (!userData) return <ProfileWrapper>No user data found</ProfileWrapper>;

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <ProfileBackground />
        <ProfileInfo>
          <ProfileImage src={userData.profilePicture || "/path/to/default-pic.jpg"} alt="User Profile" />
          {isEditing ? (
            <Input
              name="username"
              value={editedData.username}
              onChange={handleChange}
            />
          ) : (
            <Username>{userData.username}</Username>
          )}
          {isEditing ? (
            <TextArea
              name="bio"
              value={editedData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <Bio>{userData.bio || "No bio available"}</Bio>
          )}
        </ProfileInfo>
        <ProfileActions>
          {isEditing ? (
            <ActionButton onClick={handleSave}>Save Profile</ActionButton>
          ) : (
            <ActionButton onClick={handleEdit}>Edit Profile</ActionButton>
          )}
        </ProfileActions>
      </ProfileHeader>
    

      <ProfileContent>
        <SectionCard>
          <SectionHeader>Education</SectionHeader>
          <UserActivity>
            {isEditing ? (
              <Input
                name="education"
                value={editedData.education}
                onChange={handleChange}
                placeholder="Your education..."
              />
            ) : (
              userData.education || "Education not specified"
            )}
          </UserActivity>
        </SectionCard>

        <SectionCard>
          <SectionHeader>Experience</SectionHeader>
          <UserActivity>
            {isEditing ? (
              <Input
                name="experience"
                value={editedData.experience}
                onChange={handleChange}
                placeholder="Your experience..."
              />
            ) : (
              userData.experience || "Experience not specified"
            )}
          </UserActivity>
        </SectionCard>

        <SectionCard>
          <SectionHeader>Skills</SectionHeader>
          <UserActivity>
            {isEditing ? (
              <Input
                name="skills"
                value={editedData.skills}
                onChange={handleChange}
                placeholder="Your skills (comma-separated)..."
              />
            ) : (
              userData.skills?.join(', ') || "No skills specified"
            )}
          </UserActivity>
        </SectionCard>

        {userData.role === 'mentor' && (
          <SectionCard>
            <SectionHeader>Mentor Sessions</SectionHeader>
            <UserActivity>
              {userData.mentorSessions && userData.mentorSessions.length > 0
                ? userData.mentorSessions.map((session, index) => (
                    <div key={index}>{session.title} - {session.date}</div>
                  ))
                : "No upcoming mentor sessions"}
            </UserActivity>
          </SectionCard>
        )}
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;