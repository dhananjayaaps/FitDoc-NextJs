"use client";
import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import LikeButton from './LikeButton';
import CommentSection from './commentSection';
import { useState } from 'react';

const Post = ({ id, content, imageUrl, userImageUrl, likes, userEmailAddress, UserName, liked,Timestamp, commentsCount, Comments }) => {
  // console.log("Post", UserName, likes);

  const [showDialog, setShowDialog] = useState(false);
  const [postContent, setPostContent] = useState(content);
  const [deleted, setDeleted] = useState(false);

  const handleEdit = () => {
    axios.put(`http://localhost:8080/posts/${id}`, { content: postContent }, { withCredentials: true })
      .then(response => {
        toast.success("Post edited successfully");
        setShowDialog(false);
      })
      .catch(error => {
        console.error('Error editing post:', error);
        toast.error("Failed to edit post");
        // setShowDialog(false);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/posts/${id}`, { withCredentials: true })
      .then(response => {
        toast.success("Post deleted successfully");
        setShowDialog(false);
        setDeleted(true);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
        toast.error("Failed to delete post");
      });
  };

  if (deleted) {
    return null;
  }

  console.log("Post", id);
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        {/* User Info with Three-Dot Menu */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img src={userImageUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">{UserName}</p>
              <p className="text-gray-500 text-sm">{Timestamp}</p>
            </div>
          </div>
          <div className="text-gray-500 cursor-pointer">
            {/* Three-dot menu icon */}
            <div>
              <button className="hover:bg-gray-50 rounded-full p-1" onClick={() => setShowDialog(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="17" r="1" />
                </svg>
              </button>

              {/* Dialog */}
              {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                  <div className="bg-white p-4 rounded-lg relative">
                    <button className="absolute top-0 right-0 m-2" onClick={() => setShowDialog(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <h2 className='text-lg font-bold'>Edit Post</h2>
                    <textarea className="w-full h-full" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                    {/* <div className='w-full'> */}
                      <button className="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-2 px-3 border border-blue-500 hover:border-transparent rounded"
                        onClick={handleDelete}>
                        Delete
                      </button>
                      {/* <div className='px-1'></div> */}
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
                        onClick={handleEdit}>
                          Save
                      </button>
                    {/* </div> */}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        {/* Message */}
        <div className="mb-4">
          <p className="text-gray-800">{postContent}
          </p>
        </div>
        {/* Image */}
        <div className="mb-4">
          <img src={`http://localhost:8080/files/${imageUrl}`} alt="Post Image" className="w-full h-48 object-cover rounded-md" />

        </div>
        {/* Like and Comment Section */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-2">
            <LikeButton  postId={id} initialLikes={likes} likedStatus={liked}/>
          </div>
          <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
            <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z"></path>
              </g>
            </svg>
            <span>{commentsCount} Comment</span>
          </button>
        </div>
        <hr className="mt-2 mb-2" />
        <p className="text-gray-800 font-semibold">Comment</p>
        <hr className="mt-2 mb-2" />
        <div className="mt-4">
          {/* Comment 1 */}
          <CommentSection postId={id} Comments={Comments} />
          {/* <div className="flex items-center space-x-5 mt-2"></div> */}
          {/* <div className="flex items-center space-x-2">
            <img src="https://forumine.com/download/file.php?avatar=54_1519777959.jpg" alt="User Avatar" className="w-6 h-6 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">Jane Smith</p>
              <p className="text-gray-500 text-sm">Lovely shot! 📸</p>
            </div>
          </div> */}
          {/* Comment 2 */}
          
          {/* Reply from John Doe with indentation */}
          {/* <div className="flex items-center space-x-2 mt-2 ml-6">
            <img src="https://placekitten.com/40/40" alt="User Avatar" className="w-6 h-6 rounded-full" />
            <div>
              <p className="text-gray-800 font-semibold">John Doe</p>
              <p className="text-gray-500 text-sm">That little furball is from a local shelter. You should check it out! 🏠😺</p>
            </div>
          </div> */}
          {/* Add more comments and replies as needed */}
        </div>
      </div>
    </div>
  );
};

export default Post;
