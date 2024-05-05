import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';

const AllMyPosts = ({profileUsername}) => {
    const [posts, setPosts] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080/authenticated', { withCredentials: true });
                if (response.data === "ok") {
                    setAuthenticated(true);

                    axios.get(`http://localhost:8080/user/details`, { withCredentials: true })
                    .then(response => {
                        setUser(response.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error getting user details:', error);
                    });

                } else {
                    // Redirect to login page using React Router
                    // Example: history.push('/login');
                }
            } catch (error) {
                // Redirect to login page using React Router
                // Example: history.push('/login');
            }
        }

        fetchData();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/posts', { withCredentials: true });
            setPosts(response.data.reverse());
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const profileEmail = profileUsername + '@gmail.com';

    // Filter posts to show only posts belonging to the current user
    const userPosts = posts.filter(post => post.userEmailAddress === profileEmail);

    return (
        <div>
            {userPosts.map(post => (
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
                    isMine={post.userEmailAddress === user.email} // Use user.email instead of LoggedUser.email
                    userName={user.username} // Use user.username instead of hardcoding
                />
            ))}
        </div>
    );
};

export default AllMyPosts;
