import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThumbsUp, MessageSquare } from 'lucide-react';  // Correct icons from lucide-react

const colors = {
    primary: '#1c1e21',
    secondary: '#00c785',
    tertiary: '#FFFFFF',
    background: '#2c2f33',
  };

const FeedWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const FeedItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const FeedItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FeedItemTitle = styled.h3`
  font-size: 1.4rem;
  color: ${colors.secondary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const FeedItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const FeedItemLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeedItemComments = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeedItemDescription = styled.p`
  font-size: 1rem;
  color: ${colors.tertiary};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
`;

const Feed = () => {
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      title: 'Project of the Day: Build a Todo App',
      description: 'Learn how to build a Todo app using React and localStorage.',
      likes: 42,
      comments: 15,
    },
    {
      id: 2,
      title: 'Most Liked Post: React Hooks Cheatsheet',
      description: 'A comprehensive cheatsheet for the most commonly used React hooks.',
      likes: 128,
      comments: 32,
    },
    {
      id: 3,
      title: 'New Roadmap: Become a Full-Stack Developer',
      description: 'Follow our step-by-step roadmap to become a proficient full-stack developer.',
      likes: 79,
      comments: 22,
    },
  ]);

  return (
    <FeedWrapper>
      {feedItems.map((item) => (
        <FeedItem key={item.id}>
          <FeedItemHeader>
            <FeedItemTitle>{item.title}</FeedItemTitle>
            <FeedItemMeta>
              <FeedItemLikes>
                <ThumbsUp size={16} />
                {item.likes}
              </FeedItemLikes>
              <FeedItemComments>
                <MessageSquare size={16} />
                {item.comments}
              </FeedItemComments>
            </FeedItemMeta>
          </FeedItemHeader>
          <FeedItemDescription>{item.description}</FeedItemDescription>
        </FeedItem>
      ))}
    </FeedWrapper>
  );
};

export default Feed;