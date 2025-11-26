
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { faUser } from '@fortawesome/free-solid-svg-icons';
function Posts() {

    const [posts, setPosts] = useState([]);
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const heartIcon = <FontAwesomeIcon icon={faHeart} />
    const commentIcon = <FontAwesomeIcon icon={faComments} />
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/posts')
            .then(response => {
                console.log('Posts fetched:', response.data);
                setPosts(response.data.posts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <div className='flex flex-col items-center gap-4 mt-20 ml-0 md:ml-40 min-h-screen'>
            {posts.map((post, index) => (
                <div key={index} className='shadow-2xl rounded-xl w-full max-w-2xl bg-orange-100/50 px-4 py-2' >
                    <div className='flex flex-row justify-between items-center px-4'>
                        <div className='flex flex-row items-center justify-center gap-1 '>
                            <div className='border-orange-400 border-5 border-double px-2 py-1 bg-orange-200 rounded-[50%] m-2 '>{userIcon}</div>
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
                            <div className='flex flex-row items-center justify-center gap-1 text-gray-600'>
                                {heartIcon}
                                <div>{post.likes?.length || 0}</div>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-1 text-gray-600'>
                                {commentIcon}
                                <div>{post.comments?.length || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts
