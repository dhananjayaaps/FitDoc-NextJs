"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios for making requests

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // State to hold the selected image file
  const [imageUrl, setImageUrl] = useState('');

  const handleTweet = async () => {
    try {
      console.log('Posting tweet...');
      console.log('Content:', content);
      console.log('Image URL:', imageUrl);

      const formData = new FormData();
      formData.append('file', image); // Append the selected image file to the FormData

      // Send a POST request to upload the image to the server
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true // Include this option to send credentials
      });

      // Get the URL of the uploaded image from the response
      const uploadedImageUrl = response.data.message;
      console.log('Uploaded Image URL:', uploadedImageUrl);

      // Now you can use the uploaded image URL in your tweet
      await axios.post('http://localhost:8080/posts', {
        content,
        imageUrl: uploadedImageUrl // Use the uploaded image URL in the tweet
      }, {
        withCredentials: true // Include this option to send credentials
      });

      setContent('');
      setImage(null);
      setImageUrl('');

      console.log('Tweet posted successfully');
    } catch (error) {
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
            <img className="rounded-full w-14" src="https://pbs.twimg.com/profile_images/1367267802940375042/H4JDd6aC_400x400.jpg" alt="Profile" />
          </div>

          <div className="ml-3 flex flex-col w-full">
            <textarea
              placeholder="What's happening?"
              className="w-full text-xl resize-none outline-none h-32"
              style={{ color: 'black' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

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

        <div className="flex items-center text-blue-400 justify-between py-6 px-4">
          <div className="flex text-2xl pl-12">
            <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
              {/* <FontAwesomeIcon icon={faImage} size='s'/> */}
            </div>
            <button
              className="inline px-4 py-3 rounded-full font-bold text-white bg-blue-300 cursor-pointer hover:bg-blue-400"
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
