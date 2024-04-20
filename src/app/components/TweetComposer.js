"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGlobe, faImage } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleTweet = async () => {
    try {
      console.log('Posting tweet...');
      console.log('Content:', content);
      console.log('Image File:', imageFile);

      const formData = new FormData();
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.post('http://localhost:8080/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setContent('');
      setImageFile(null);

      console.log('Tweet posted successfully');
    } catch (error) {
      console.error('Error posting tweet:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <div className="rounded-xl bg-white w-full md:w-2/3 lg:w-1/3">
        <div className="flex p-4">
          <div>
            {/* You can put your profile image here */}
          </div>

          <div className="ml-3 flex flex-col w-full">
            <textarea
              placeholder="What's happening?"
              className="w-full text-xl resize-none outline-none h-32"
              style={{ color: 'black' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <input
              type="text"
              placeholder="Image URL"
              className="w-full text-xl resize-none outline-none"
              style={{ color: 'black' }}
              value={imageFile ? imageFile.name : ''}
              readOnly
            />

            <div className="cursor-pointer text-blue-400 -ml-4">
              {/* <p className="inline hover:bg-blue-100 px-4 py-3 rounded-full"><FontAwesomeIcon icon={faGlobe} size="lg" /> Everyone can reply</p> */}
            </div>
          </div>
        </div>

        <div className="flex items-center text-blue-400 justify-between py-6 px-4">
          <div className="flex text-2xl pl-12">
            <div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
              <label htmlFor="imagePicker">
                <FontAwesomeIcon icon={faImage} size='s'/>
              </label>
              <input
                id="imagePicker"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
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
