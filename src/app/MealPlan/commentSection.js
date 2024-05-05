import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = ({ postId, Comments, isMine }) => {
  const [showCommentInput, setShowCommentInput] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setComments] = useState([]);

  useEffect(() => {
    setComments(Comments);
  }, [Comments]);

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') {
      console.log('Comment cannot be empty');
      return;
    }
    const commentData = {
      content: commentText
    };
  
    axios.post(`http://localhost:8080/mealplan/${postId}/comments`, commentData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      if (response.status === 201) {
        console.log('Comment submitted successfully');
        setComments([response.data, ...commentsList]);
        setCommentText('');
        setShowCommentInput(false);
      } else {
        console.error('Failed to submit comment. Status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error submitting comment:', error.message);
    });
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:8080/mealplan/${postId}/comments/${commentId}`, {
      withCredentials: true
    })
    .then(response => {
      if (response.status === 204) {
        console.log('Comment deleted successfully');
        setComments(commentsList.filter(comment => comment.id !== commentId));
      } else {
        console.error('Failed to delete comment. Status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error deleting comment:', error.message);
    });
  }
  
  
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
      <div className="flex items-center space-x-5 mt-2"></div>
      <div>
        {commentsList.map(comment => (
          <div key={comment.id} className="flex items-center justify-between w-96 mt-2">
            <div className="flex items-center space-x-4">
              <img src={comment.commenterImageUrl} alt="User Avatar" className="w-6 h-6 rounded-full" />
              <div>
                <p className="text-gray-800 font-semibold">{comment.commenterName}</p>
                <p className="text-gray-500 text-sm">{comment.content}</p>
              </div>
            </div>
            <div className="relative">
              {isMine && (
                <div> {/* Added padding right and padding top */}
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>  
    </div>
  );
};

export default CommentSection;
