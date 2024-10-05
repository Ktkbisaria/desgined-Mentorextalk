import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResumeReviewPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [comment, setComment] = useState('');
  const [userRole, setUserRole] = useState('student'); // This should be determined by your authentication system

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await axios.get('/api/resumes');
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      try {
        await axios.post('/api/resumes/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        fetchResumes(); // Refresh the list after upload
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (selectedResume && comment.trim() !== '') {
      try {
        await axios.post(`/api/resumes/${selectedResume._id}/comment`, { text: comment });
        setComment('');
        fetchResumeDetails(selectedResume._id);
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    }
  };

  const fetchResumeDetails = async (resumeId) => {
    try {
      const response = await axios.get(`/api/resumes/${resumeId}`);
      setSelectedResume(response.data);
    } catch (error) {
      console.error('Error fetching resume details:', error);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Resume Review</h1>
      
      {userRole === 'student' && (
        <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Submit Your Resume</h2>
          <input type="file" onChange={handleFileUpload} accept=".pdf,.doc,.docx" style={{ marginBottom: '12px' }} />
          <button onClick={() => {}} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Upload Resume
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>Resume List</h2>
          {resumes.map(resume => (
            <div
              key={resume._id}
              onClick={() => fetchResumeDetails(resume._id)}
              style={{ padding: '8px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              <span>{resume.student.username}</span>
              <span style={{ float: 'right', fontSize: '14px', color: '#666' }}>
                {new Date(resume.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>

        {selectedResume && (
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '16px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>{selectedResume.student.username}'s Resume</h2>
            <p style={{ marginBottom: '16px' }}>Uploaded on: {new Date(selectedResume.createdAt).toLocaleDateString()}</p>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Comments:</h3>
            {selectedResume.comments.map((comment, index) => (
              <div key={index} style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '4px', marginBottom: '8px' }}>
                <p style={{ fontWeight: 'bold' }}>{comment.mentor.username}:</p>
                <p>{comment.text}</p>
              </div>
            ))}
            {userRole === 'mentor' && (
              <div style={{ marginTop: '16px' }}>
                <textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
                />
                <button onClick={handleCommentSubmit} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Add Comment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReviewPage;