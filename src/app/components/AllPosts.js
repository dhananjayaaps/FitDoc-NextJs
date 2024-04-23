"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts', { withCredentials: true });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []); 
    console.log(posts);
    return (
        <div>
            {posts.map(post => (
                <Post
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    imageUrl={post.imageUrl}
                    userImageUrl={post.userImageUrl}
                    likes={post.likes}
                    liked={post.liked}
                    userEmailAddress={post.userEmailAddress}
                    UserName={post.UserName}
                    Timestamp={post.timestamp}
                />
            ))}
        </div>
    );
};

export default AllPosts;
