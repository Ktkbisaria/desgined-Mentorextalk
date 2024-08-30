import React from 'react';
import Sidebar from './Sidebar'; // Ensure the correct path to Sidebar component
import styled from 'styled-components';

const DashboardWrapper = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  margin-left: 250px; /* Adjust based on sidebar width */
  padding: 2rem;
  background-color: #121212;
  color: white;
  min-height: 100vh;
`;

const DashboardPage = () => {
  return (
    <DashboardWrapper>
      <Sidebar />
      <Content>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        {/* Add more content here */}
      </Content>
    </DashboardWrapper>
  );
};

export default DashboardPage;
