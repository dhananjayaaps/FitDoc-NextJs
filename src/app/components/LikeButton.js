import React, { useState } from 'react';
import axios from 'axios';

function LikeButton({ postId, initialLikes, likedStatus }) {

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(likedStatus);

  const handleLike = () => {
    if (!liked) {
      // Like the post
      axios.get(`http://localhost:8080/posts/like/${postId}`, { withCredentials: true })
        .then(response => {
          setLikes(likes + 1);
          setLiked(true);
        })
        .catch(error => {
          console.error('Error liking post:', error);
        });
    } else {
      // Dislike the post
      axios.get(`http://localhost:8080/posts/dislike/${postId}`, { withCredentials: true })
        .then(response => {
          setLikes(likes - 1);
          setLiked(false);
        })
        .catch(error => {
          console.error('Error disliking post:', error);
        });
    }
  };

  return (
    <button className={`flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1 ${liked ? 'text-rose-500' : ''}`} onClick={handleLike}>
      <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>{likes} Likes</span>
    </button>
  );
}

export default LikeButton;
