
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function ProfilePost({ userId }) {

    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const heartIcon = <FontAwesomeIcon icon={faHeart} />
    const commentIcon = <FontAwesomeIcon icon={faComments} />
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/user-posts/${userId}`)
            .then(response => {
                console.log('Posts fetched:', response.data);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 px-4 md:px-8 max-w-6xl mx-auto'>
            {posts.map((post, index) => (
                <div key={index} className='bg-orange-100/50 rounded-lg shadow-md hover:shadow-xl duration-300 '>

                    <div className='aspect-square overflow-hidden p-2 mx-2 mt-2rounded-lg'>
                        <img 
                            src={post.image} 
                            alt={post.description} 
                            className="w-full h-full rounded-lg" 
                        />
                    </div>
                    
                    <div className='px-3 pb-3'>
                        {post.description && (
                            <p className='text-sm text-gray-700 mb-2 line-clamp-2'>{post.description}</p>
                        )}
                        

                        <div className='flex flex-row gap-4 mb-2'>
                            <div className='flex flex-row items-center gap-1 text-gray-600 text-sm'>
                                {heartIcon}
                                <span>{post.likes?.length || 0}</span>
                            </div>
                            <div className='flex flex-row items-center gap-1 text-gray-600 text-sm'>
                                {commentIcon}
                                <span>{post.comments?.length || 0}</span>
                            </div>
                        </div>
                        
                        <div className='text-xs text-gray-500'>
                            {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfilePost

