import React from 'react';
import Sidebar from './Sidebar';
import styled, { keyframes } from 'styled-components';

// Define new colors consistent with OverviewPage
const colors = {
  primary: '#0a0a0a', // Darker background
  secondary: '#00c785', // Bright green for secondary
  tertiary: '#FFFFFF',  // White for tertiary
};

// Keyframes for subtle background animation
const backgroundAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Layout Wrapper with Background Gradient and Animation
const LayoutWrapper = styled.div`
  display: flex;
  background: linear-gradient(-45deg, #0a0a0a, #1c1c1c, #2e2e2e, #0a0a0a);
  background-size: 400% 400%;
  animation: ${backgroundAnimation} 15s ease infinite;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6); // Dark overlay for better text visibility
    z-index: 1;
  }
`;

// Main Content Area
const Content = styled.main`
  flex: 1;
  padding: 2rem;
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
  background-color: rgba(0, 0, 0, 0.3); /* Transparent background for header */
`;

// Logo Style with Subtle Glow
const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${colors.secondary};
  text-shadow: 0 0 10px ${colors.secondary}, 0 0 20px ${colors.secondary};
`;

// Navigation Style
const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

// NavLink Style with Hover Effect
const NavLink = styled.a`
  color: ${colors.tertiary};
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  
  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
    transform: scale(1.1);
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
