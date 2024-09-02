// src/components/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';

// Define new colors consistent with OverviewPage
const colors = {
  primary: 'rgba(18, 18, 18, 0.8)',   // Dark gray with opacity
  secondary: '#00c785', // Bright green for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

// Layout Wrapper with Background Image
const LayoutWrapper = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); // Dark overlay for better text visibility
    z-index: 1;
  }
`;

// Main Content Area
const Content = styled.main`
  flex: 1;
 
  padding: 2rem;
   /* Dark semi-transparent overlay */
  color: ${colors.tertiary};
  min-height: 100vh;
  position: relative;
  z-index: 2; /* Ensure content is above the background overlay */
`;

// Header Style
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  color: ${colors.tertiary};
  padding: 1rem;
  border-bottom: 1px solid ${colors.secondary};
`;

// Logo Style
const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.secondary};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

// Navigation Style
const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
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

const DashboardLayout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <Content>
        <Header>
          <Logo>MentoreTalk</Logo>
          <Nav>
            
            <NavLink href="/profile">Profile</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </Nav>
        </Header>
        {children}
      </Content>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
