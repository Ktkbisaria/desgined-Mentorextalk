import React from 'react';
import styled from 'styled-components';

// Define color palette
const colors = {
  primary: '#1c1e21',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
  background: '#2c2f33',
};

// Styled components for the Mentor Page
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

const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterBox = styled.div`
  background-color: ${colors.background};
  padding: 1rem;
  border-radius: 8px;
  flex: 1;
  min-width: 250px;
`;

const FilterTitle = styled.h4`
  margin-bottom: 1rem;
  color: ${colors.tertiary};
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const MentorSuggestions = styled.div`
  margin-top: 2rem;
`;

const MentorCard = styled.div`
  background-color: ${colors.background};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const MentorName = styled.h3`
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const MentorsPage = () => {
  return (
    <PageWrapper>
      <Header>
        <SearchBar type="text" placeholder="Search here..." />
        <button>Filter</button>
      </Header>
      
      <FilterWrapper>
        <FilterBox>
          <FilterTitle>Companies</FilterTitle>
          <div><Checkbox type="checkbox" /> Google</div>
          <div><Checkbox type="checkbox" /> Microsoft</div>
          <div><Checkbox type="checkbox" /> Amazon</div>
        </FilterBox>

        <FilterBox>
          <FilterTitle>Skills</FilterTitle>
          <div><Checkbox type="checkbox" /> React</div>
          <div><Checkbox type="checkbox" /> C++</div>
          <div><Checkbox type="checkbox" /> Python</div>
        </FilterBox>

        <FilterBox>
          <FilterTitle>Domains</FilterTitle>
          <div><Checkbox type="checkbox" /> Web Development</div>
          <div><Checkbox type="checkbox" /> Cloud Computing</div>
          <div><Checkbox type="checkbox" /> App Development</div>
        </FilterBox>
      </FilterWrapper>

      <MentorSuggestions>
        <h2>Here are a few Mentor suggestions that you might like!</h2>
        <MentorCard>
          <MentorName>John Doe</MentorName>
          <p>Expert in Web Development, React, and JavaScript.</p>
        </MentorCard>
        <MentorCard>
          <MentorName>Jane Smith</MentorName>
          <p>Specialist in Cloud Computing and Python.</p>
        </MentorCard>
        {/* Add more MentorCard components as needed */}
      </MentorSuggestions>
    </PageWrapper>
  );
};

export default MentorsPage;
