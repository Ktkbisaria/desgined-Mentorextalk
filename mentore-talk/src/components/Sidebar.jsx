import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, X, Users, Book, HelpCircle, Map, Code, Rss } from 'lucide-react';

const SidebarContainer = styled.div`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: #1a1a1a;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #0078ff;
  color: white;
`;

const SidebarContent = styled.nav`
  padding: 1rem;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${({ isOpen }) => (isOpen ? '250px' : '10px')};
  top: 10px;
  background-color: #0078ff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: left 0.3s ease-in-out;
  z-index: 1001;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <h2>MentoreTalk</h2>
          <X onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarItem to="/community">
            <Users size={20} />
            Community
          </SidebarItem>
          <SidebarItem to="/mentors">
            <Book size={20} />
            Mentors
          </SidebarItem>
          <SidebarItem to="/ask">
            <HelpCircle size={20} />
            Ask Anything
          </SidebarItem>
          <SidebarItem to="/roadmaps">
            <Map size={20} />
            Roadmaps
          </SidebarItem>
          <SidebarItem to="/problems">
            <Code size={20} />
            Problems
          </SidebarItem>
          <SidebarItem to="/feed">
            <Rss size={20} />
            Feed
          </SidebarItem>
        </SidebarContent>
      </SidebarContainer>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </ToggleButton>
      <Overlay isOpen={isOpen} onClick={toggleSidebar} />
    </>
  );
};

export default Sidebar;