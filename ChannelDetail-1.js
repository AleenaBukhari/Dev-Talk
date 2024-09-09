import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const ChannelPage = ({ user }) => {
    const { id } = useParams();
    const [channel, setChannel] = useState({});
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };

    const postStyle = {
        color: 'white',
        textDecoration: 'none',
        background: '#333',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        marginBottom: '10px',
    };
    const ButtonStyle = {
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
      };

    useEffect(() => {
        axios.get(`http://localhost:8080/channels/${id}`)
            .then((res) => {
                setChannel(res.data);
                fetchPosts();
            })
            .catch((err) => console.error(err));
    }, [id]);

    const fetchPosts = () => {
        axios.get(`http://localhost:8080/channels/${id}/posts`)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => console.error(err));
    };

    const handleCreatePost = () => {
    
        axios.post(`http://localhost:8080/posts`, {
            channel_id: id,
            user_id: user.id,
            content: newPostContent,
        })
            .then((res) => {
                fetchPosts();
                setNewPostContent('');
            })
            .catch((err) => console.error(err));
    };

    const handleLikePost = (postId,event) => {
        event.preventDefault();
        axios.post(`http://localhost:8080/posts/${postId}/like`)
            .then(() => {
                setPosts(prevPosts => {
                    return prevPosts.map(post => {
                        if (post.id === postId) {
                            const updatedLikes = post.likes || 0;
                            return { ...post, likes: updatedLikes + 1 };
                        }
                        return post;
                    });
                });
            })
            .catch((err) => console.error(err));
    };

    return (
        <div style={containerStyle}>
            <br />
            <br />
            <h2>{channel.channel_name}</h2>
            
            {/* Display posts */}
            <ul>
                {posts.map((post) => (
                    <Link key={post.id} to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                        <li style={postStyle}>
                            <p>{post.content}</p>
                            <p>{post.name} <span>{formatDate(post.created_at)}</span></p>
                            <p>Likes: {post.likes}</p>
                            <button onClick={(event) => handleLikePost(post.id,event)}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                        </li>
                    </Link>
                ))}
            </ul>
            
            {/* Textarea to input new post content */}
            <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Type your post content..."
                rows={4}
                cols={50}
            />
            
            {/* Button to create a new post */}
            <br />
            <br />
            <button onClick={handleCreatePost} style={ButtonStyle}>Create New Post</button>
        </div>
    );
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default ChannelPage;
