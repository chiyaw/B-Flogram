
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import { BACKEND_URL } from '../../constant';
function Posts() {



    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const userId = localStorage.getItem('userId');
    const heartIcon = <FontAwesomeIcon icon={faHeart} />
    const commentIcon = <FontAwesomeIcon icon={faComments} />
    
    
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/posts`)
            .then(response => {
                console.log('Posts fetched:', response.data);

                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const handleLike = (postId) => {
        if (!userId) {
            alert('Please log in to like posts');
            return;
        }

        axios.post(`${BACKEND_URL}/api/like-unlike`, { postId, userId })
            .then(response => {
                console.log('Post liked:', response.data);

                const { liked, likes } = response.data;

                setLikedPosts((prevLikedPosts) => {
                    if (liked) {

                        return prevLikedPosts.includes(postId)
                            ? prevLikedPosts
                            : [...prevLikedPosts, postId];
                    } else {
                        return prevLikedPosts.filter((id) => id !== postId);
                    }
                });

                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId
                            ? {
                                ...post,
                                likes,
                            }
                            : post
                    )
                );
            })
            .catch(error => {
                console.error('Error liking post:', error);
                alert('Error liking post');


            });
    }

    return (
        <div className='flex flex-col items-center gap-4 mt-20 ml-0 md:ml-40 min-h-screen'>
            {posts.map((post, index) => (
                <div key={index} className='shadow-2xl rounded-xl w-full max-w-2xl bg-orange-100/50 px-4 py-2' >
                    <div className='flex flex-row justify-between items-center px-4'>
                        <div className='flex flex-row items-center justify-center gap-1 '>
                        {post.user.profilePic ? (
                            <div className='rounded-[50%] m-2 overflow-hidden'>
                                
                                    <img src={post.user.profilePic} className="object-cover rounded-full w-10 h-10 overflow-hidden bg-orange-300 " />
                                
                            </div>
                            ) : (
                                <div className='rounded-[50%] m-2 overflow-hidden'> 
                                    <div className='w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-400 text-lg uppercase font-bold'>
                                        {post.user?.user[0]}
                                    </div>
                                </div>
                            )}
                            <div>{post.user?.user || 'Unknown User'}</div>
                        </div>
                        <div>{post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}</div>
                    </div>
                    <div>
                        <img src={post.image} alt={post.description} className="mx-auto w-190 h-150 rounded-xl" />
                    </div>
                    <div className='px-4 py-2'>
                        <p>{post.description}</p>
                    </div>
                    <div>
                        <div className='flex flex-row gap-10 px-4 mt-1'>
                            <div
                                className='flex flex-row items-center justify-center gap-1 text-gray-600 cursor-pointer'
                                onClick={() => handleLike(post.id)}
                                style={{ color: likedPosts.includes(post.id) ? 'orange' : 'gray' }}
                            >
                                {heartIcon}
                                <div>
                                    {post.likes?.length || 0}
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-1 text-gray-600' onClick={() => handleComment(post.id)}>
                                <Comments postId={post.id} />
                            </div>
                        </div>
                    </div>
                </div>))}
            </div>
        )
    }

    export default Posts