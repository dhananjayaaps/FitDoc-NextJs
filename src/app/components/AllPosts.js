import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';

const AllPosts = ({ LoggedUser }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts', { withCredentials: true });
            setPosts(response.data.reverse());
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const username = LoggedUser.email.replace('@gmail.com', '');

    useEffect(() => {
        fetchPosts();
    }, []);

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
                    commentsCount={post.commentsCount}
                    Comments={post.comments}
                    isMine={post.userEmailAddress === LoggedUser.email}
                    userName={username}
                />
            ))}
        </div>
    );
};

export default AllPosts;
