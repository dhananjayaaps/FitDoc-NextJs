// import React, { useState } from 'react';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancel = () => {
    // Add your cancel logic here
    console.log('Cancelled');
  };

  const handlePost = () => {
    // Add your post logic here
    console.log('Posted');
  };

  return (
    <div>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
            <style jsx>{`
            body {background:white !important;}
            `}</style>
            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
            <input 
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" 
                spellCheck="false" 
                placeholder="Title" 
                type="text" 
                value={title}
                onChange={handleTitleChange}
            />
            <textarea 
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" 
                spellCheck="false" 
                placeholder="Describe everything about this post here"
                value={description}
                onChange={handleDescriptionChange}
            ></textarea>
            
            {/* icons */}
            <div className="icons flex text-gray-500 m-2">
                {/* Add your SVG icons here */}
                <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
            </div>
            {/* buttons */}
            <div className="buttons flex">
                <div 
                className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" 
                onClick={handleCancel}
                >
                Cancel
                </div>
                <div 
                className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" 
                onClick={handlePost}
                >
                Post
                </div>
            </div>
        </div>
    </div>
    
  );
};

export default NewPost;
