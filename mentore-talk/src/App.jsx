import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OverviewPage from './pages/OverviewPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';

// Placeholder components for the different pages
const FeedPage = () => <div>Feed Page</div>;
const CommunityPage = () => <div>Community Page</div>;
const MentorsPage = () => <div>Mentors Page</div>;
const AskPage = () => <div>Ask Page</div>;
const RoadmapsPage = () => <div>Roadmaps Page</div>;
const ProblemsPage = () => <div>Problems Page</div>;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<OverviewPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Routes with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/roadmaps" element={<RoadmapsPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
