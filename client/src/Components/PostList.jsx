// src/PostList.js
import React, { useState, useEffect } from 'react';
import { API } from '../config';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(API + '/posts');

            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Post List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>Author: {post.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
