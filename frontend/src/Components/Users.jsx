
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Users({ userId }) {

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const followersIcon = <FontAwesomeIcon icon={faUsers} />
    const followingIcon = <FontAwesomeIcon icon={faUserPlus} />
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/all-users`)
            .then(response => {
                console.log('Users fetched:', response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className='flex flex-col gap-3 mt-10 px-4 md:px-8 max-w-2xl mx-auto'>
            {users.map((user, index) => (
                <div 
                    key={index} 
                    className='bg-orange-100/50 rounded-lg shadow-sm hover:shadow-md duration-300 p-4 flex flex-row items-center gap-4 cursor-pointer'
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    {/* Profile Picture or First Letter */}
                    <div className='w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-orange-300'>
                        {user.profilePic ? (
                            <img 
                                src={user.profilePic} 
                                alt={user.user} 
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            <span className='text-white text-xl font-semibold'>
                                {user.user ? user.user.charAt(0).toUpperCase() : '?'}
                            </span>
                        )}
                    </div>
                    
                    {/* User Info */}
                    <div className='flex-1 min-w-0'>
                        <div className='text-base font-semibold text-gray-800 truncate'>
                            {user.user || 'Unknown User'}
                        </div>
                        {user.bio && (
                            <div className='text-sm text-gray-600 truncate'>{user.bio}</div>
                        )}
                    </div>

                    {/* Followers and Following Stats */}
                    <div className='flex flex-row gap-4'>
                        <div className='flex flex-row items-center gap-1 text-gray-600 text-sm'>
                            {followersIcon}
                            <span className='font-medium'>{user.followers?.length || 0}</span>
                            <span className='hidden sm:inline text-xs'>followers</span>
                        </div>
                        <div className='flex flex-row items-center gap-1 text-gray-600 text-sm'>
                            {followingIcon}
                            <span className='font-medium'>{user.followings?.length || 0}</span>
                            <span className='hidden sm:inline text-xs'>following</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Users

