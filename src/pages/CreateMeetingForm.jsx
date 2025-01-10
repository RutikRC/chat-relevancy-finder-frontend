import React from 'react';
import './room.css'; // Make sure to create a corresponding CSS file with the styles provided

const CreateMeetingForm = () => {
  return (
    <div className="container">
      <form className="create-meeting-form" method="post">
        {/* Replace {% csrf_token %} with any React or backend-specific implementation */}
        <div className="form-header">
          <h1>Create New Meeting</h1>
          <p>Set up your virtual classroom session</p>
        </div>

        <div className="form-group">
          <label htmlFor="class-title">Class Title</label>
          <input
            type="text"
            name="title"
            id="class-title"
            placeholder="e.g., Advanced JavaScript Concepts"
          />
        </div>

        <div className="form-group">
          <label htmlFor="class-info">Class Information</label>
          <div className="text-controls">
            <span>0/1000 words</span>
            <button type="button" className="ai-generate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
              </svg>
              Generate with AI
            </button>
          </div>
          <textarea
            id="class-info"
            name="text"
            placeholder="Describe your class content, objectives, and requirements. Or click 'Generate with AI' to get suggestions..."
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeetingForm;
