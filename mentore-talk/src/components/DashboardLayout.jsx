// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex: 1;
  margin-left: 250px; /* Adjust based on sidebar width */
  padding: 2rem;
  background-color: #121212;
  color: white;
  min-height: 100vh;
`;

const DashboardLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
