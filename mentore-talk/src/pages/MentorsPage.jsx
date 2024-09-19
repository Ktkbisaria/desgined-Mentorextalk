import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const colors = {
  primary: '#1c1e21',
  secondary: '#00c785',
  tertiary: '#FFFFFF',
  background: '#2c2f33',
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
  const [mentors, setMentors] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);

  const fetchMentors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mentors', {
        params: {
          search,
          companies: selectedCompanies.join(','),
          skills: selectedSkills.join(','),
          domains: selectedDomains.join(','),
        },
      });
      setMentors(response.data);
    } catch (err) {
      console.error('Error fetching mentors:', err);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, [search, selectedCompanies, selectedSkills, selectedDomains]);

  const handleCheckboxChange = (e, setFilter) => {
    const { name, checked } = e.target;
    setFilter((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  return (
    <PageWrapper>
      <Header>
        <SearchBar
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Header>

      <FilterWrapper>
        <FilterBox>
          <FilterTitle>Companies</FilterTitle>
          <div>
            <Checkbox
              type="checkbox"
              name="Google"
              onChange={(e) => handleCheckboxChange(e, setSelectedCompanies)}
            />
            Google
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="Microsoft"
              onChange={(e) => handleCheckboxChange(e, setSelectedCompanies)}
            />
            Microsoft
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="Amazon"
              onChange={(e) => handleCheckboxChange(e, setSelectedCompanies)}
            />
            Amazon
          </div>
        </FilterBox>

        <FilterBox>
          <FilterTitle>Skills</FilterTitle>
          <div>
            <Checkbox
              type="checkbox"
              name="React"
              onChange={(e) => handleCheckboxChange(e, setSelectedSkills)}
            />
            React
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="C++"
              onChange={(e) => handleCheckboxChange(e, setSelectedSkills)}
            />
            C++
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="Python"
              onChange={(e) => handleCheckboxChange(e, setSelectedSkills)}
            />
            Python
          </div>
        </FilterBox>

        <FilterBox>
          <FilterTitle>Domains</FilterTitle>
          <div>
            <Checkbox
              type="checkbox"
              name="Web Development"
              onChange={(e) => handleCheckboxChange(e, setSelectedDomains)}
            />
            Web Development
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="Cloud Computing"
              onChange={(e) => handleCheckboxChange(e, setSelectedDomains)}
            />
            Cloud Computing
          </div>
          <div>
            <Checkbox
              type="checkbox"
              name="App Development"
              onChange={(e) => handleCheckboxChange(e, setSelectedDomains)}
            />
            App Development
          </div>
        </FilterBox>
      </FilterWrapper>

      <MentorSuggestions>
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor._id}>
              <MentorName>{mentor.name}</MentorName>
              <p>{mentor.bio}</p>
              <p>Skills: {mentor.skills.join(', ')}</p>
              <p>Company: {mentor.company}</p>
              <p>Domains: {mentor.domains.join(', ')}</p>
            </MentorCard>
          ))
        ) : (
          <p>No mentors found</p>
        )}
      </MentorSuggestions>
    </PageWrapper>
  );
};

export default MentorsPage;
