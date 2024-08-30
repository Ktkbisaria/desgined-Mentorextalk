import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Define new colors
const colors = {
  vibrantBlue: '#0286c7', // New vibrant blue
  darkBlue: '#05232e',    // Dark navy blue
  white: '#ffffff',       // White for text on dark background
  black: '#000000',       // Black for text on light background
};

const PageWrapper = styled.div`
  background-color: ${colors.vibrantBlue}; // Updated background color
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled.div`
  color: ${colors.white}; // White text for logo
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: ${colors.darkBlue}; // Dark blue for nav links
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${colors.white}; // White background on hover
    color: ${colors.darkBlue}; // Dark blue text on hover
  }
`;

const Button = styled(Link)`
  background-color: ${colors.darkBlue};
  color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: ${colors.vibrantBlue}; // Change to vibrant blue on hover
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  text-align: center;
  color: ${colors.darkBlue}; // Dark blue text for title
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  text-align: center;
  color: ${colors.darkBlue}; // Dark blue text for subtitle
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const FeatureCard = styled.div`
  background-color: ${colors.white}; // White background for feature cards
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${colors.darkBlue}; // Dark blue text for feature titles
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: ${colors.darkBlue}; // Dark blue text for feature descriptions
`;

const OverviewPage = () => {
  return (
    <PageWrapper>
      <Header>
        <Logo>MentoreTalk</Logo>
        <Nav>
          <NavLink to="/feed">Feed</NavLink>
          <NavLink to="/mentorship">Mentorship</NavLink>
          <NavLink to="/roadmaps">Roadmaps</NavLink>
          <NavLink to="/why-mentoretalk">Why MentoreTalk</NavLink>
          <NavLink to="/how-it-works">How it Works</NavLink>
        </Nav>
        <ButtonGroup>
          <Button as="a" href="#">Download App</Button>
          <Button to="/login">Login</Button>
        </ButtonGroup>
      </Header>
      <MainContent>
        <Title>Your one stop solution for<br />skill-based learning</Title>
        <Subtitle>Connect with peers for jobs, projects and much more</Subtitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureTitle>Community</FeatureTitle>
            <FeatureDescription>Connect with 1 Lakh+ peers</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Mentors</FeatureTitle>
            <FeatureDescription>300+ Mentors, 5000+ Queries Resolved</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Ask Anything</FeatureTitle>
            <FeatureDescription>& we find you a mentor!</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Roadmaps</FeatureTitle>
            <FeatureDescription>Solve skill based roadmaps</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Problems</FeatureTitle>
            <FeatureDescription>Daily Problem Challenges</FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureTitle>Feed</FeatureTitle>
            <FeatureDescription>Skill Based Posts</FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </MainContent>
    </PageWrapper>
  );
};

export default OverviewPage;
