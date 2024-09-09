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
  padding: 2rem;
  color: ${colors.tertiary};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${colors.secondary};
  padding-bottom: 1rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 1.5rem;
  border: 3px solid ${colors.secondary};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h2`
  font-size: 2rem;
  color: ${colors.secondary};
  margin: 0;
`;

const Bio = styled.p`
  font-size: 1.2rem;
  color: ${colors.tertiary};
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${colors.tertiary};
    color: ${colors.primary};
    transform: scale(1.05);
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const SectionHeader = styled.h3`
  font-size: 1.5rem;
  color: ${colors.secondary};
  border-bottom: 1px solid ${colors.secondary};
  padding-bottom: 0.5rem;
`;

const UserActivity = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1.5rem;
  border-radius: 8px;
  color: ${colors.tertiary};
`;

const Input = styled.input`
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  border: 1px solid ${colors.secondary};
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  resize: vertical;
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
           console.log('User profile response:', response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err); // Log full error object
        setError(`Failed to fetch user data: ${err.response?.data?.message || err.message || 'Unknown error'}`);
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
      role: userData.role || '',
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await axios.put('http://localhost:5000/api/users/profile', editedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(editedData); // Update the displayed user data
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError(`Failed to save profile: ${err.response ? err.response.data.msg : err.message}`);
    }
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <ProfileInfo>
          <ProfileImage src={userData.profilePicture || "/path/to/default-pic.jpg"} alt="User Profile Picture" />
          <UserDetails>
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
              />
            ) : (
              <Bio>{userData.bio || "No bio available"}</Bio>
            )}
          </UserDetails>
        </ProfileInfo>
        <ProfileActions>
          {isEditing ? (
            <ActionButton onClick={handleSave}>Save Profile</ActionButton>
          ) : (
            <ActionButton onClick={handleEdit}>Edit Profile</ActionButton>
          )}
          <ActionButton>Settings</ActionButton>
        </ProfileActions>
      </ProfileHeader>

      <ProfileContent>
        <SectionHeader>Role</SectionHeader>
        <UserActivity>
          {isEditing ? (
            <Input
              name="role"
              value={editedData.role}
              onChange={handleChange}
            />
          ) : (
            userData.role || "Role not specified"
          )}
        </UserActivity>

        <SectionHeader>Recent Activity</SectionHeader>
        <UserActivity>
          {userData.recentActivity && userData.recentActivity.length > 0
            ? userData.recentActivity.map((activity, index) => (
                <div key={index}>{activity}</div>
              ))
            : "No recent activity"}
        </UserActivity>

        <SectionHeader>Mentor Sessions</SectionHeader>
        <UserActivity>
          {userData.mentorSessions && userData.mentorSessions.length > 0
            ? userData.mentorSessions.map((session, index) => (
                <div key={index}>{session.title} - {session.date}</div>
              ))
            : "No upcoming mentor sessions"}
        </UserActivity>
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;
