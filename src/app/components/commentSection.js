import React, { useState } from 'react';

const CommentSection = ({ postId }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = () => {
    // Implement your logic to submit the comment
    console.log('Comment submitted:', commentText);
    // You can make an API call here to submit the comment to the backend
    setCommentText('');
  };

  return (
    <div>
      <button className="flex justify-center items-center gap-2 bg-gray-500 px-2 hover:bg-gray-600 rounded-full p-1" onClick={handleToggleCommentInput}>
        <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
          </g>
        </svg>
        <span>Add Comment</span>
      </button>
      {showCommentInput && (
        <div className="mt-2">
          <textarea
            className="w-full h-20 border rounded-md text-black"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type your comment..."
          ></textarea>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 mt-2 rounded"
            onClick={handleCommentSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
