"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making requests
import { toast } from 'react-toastify';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchUserImageUrl = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/image', { withCredentials: true });
        setImageUrl(response.data);
      } catch (error) {
        console.error('Error getting image URL:', error);
      }
    };
    fetchUserImageUrl();
  }, []); 
  const handleTweet = async () => {
    try {
      console.log('Posting tweet...');
      console.log('Content:', content);
      console.log('Image URL:', imageUrl);

      const formData = new FormData();
      formData.append('file', image); 

      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      const uploadedImageUrl = response.data.message;
      console.log('Uploaded Image URL:', uploadedImageUrl);

      await axios.post('http://localhost:8080/mealplan', {
        content,
        imageUrl: uploadedImageUrl
      }, {
        withCredentials: true
      });

      setContent('');
      setImage(null);
      setImageUrl('');
      //make a tostify message
      toast.success("Tweet posted successfully");
      console.log('Tweet posted successfully');
    } catch (error) {
      toast.error('Error posting tweet:', error);
      console.error('Error posting tweet:', error);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Set the selected image file
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="rounded-xl bg-white w-full md:w-2/3 lg:w-1/3">
        <div className="flex p-4">
          <div>
            <img className="rounded-full w-14" src={imageUrl} alt="Profile" />
          </div>

          <div className="ml-3 flex flex-col w-full py-3">
            <textarea
              placeholder="What's happening?"
              className="w-full text-xl resize-none outline-none h-32"
              style={{ color: 'black' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <div className="py-1"></div>

            {/* Input field for image upload */}
            <input
              type="file"
              accept="image/*"
              className="w-full text-xl resize-none outline-none"
              style={{ color: 'black' }}
              onChange={handleImageChange}
            />

            <div className="cursor-pointer text-blue-400 -ml-4">
              {/* <p className="inline hover:bg-blue-100 px-4 py-3 rounded-full"><FontAwesomeIcon icon={faGlobe} size="lg" /> Everyone can reply</p> */}
            </div>
          </div>
        </div>

        <div className="flex items-center text-blue-400 justify-end py-3 px-3">
          <div className="flex text-2xl pl-12">
            <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
              {/* <FontAwesomeIcon icon={faImage} size='s'/> */}
            </div>
            <button
              className="inline px-4 py-3 rounded-full font-bold text-white bg-blue-300 cursor-pointer hover:bg-blue-400 text-base"
              onClick={handleTweet}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;
