import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket,  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constant';

function Header() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />

    useEffect(() => {
        const userId = localStorage.getItem('userId')
        if (userId) {
            axios.get(`${BACKEND_URL}/api/user/${userId}`)
                .then(response => {
                    setUsername(response.data.user)
                })
                .catch(err => {
                    console.error('Error fetching user:', err)
                    navigate('/login')
                })
        } else {
            navigate('/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

  return (
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between bg-orange-100/80 backdrop-blur-md text-gray-800 items-center shadow-2xl px-20 py-4 z-20">
        <div className="flex flex-row text-lg">
            <div className='px-1 text-gray-600'> {userIcon} </div>
            <div className ='px-1 text-gray-600'> {username}</div>
        </div>
        <div>
            <h1 className='antialiased font-bold text-3xl md:text-4xl'>
                Bogram
            </h1>
        </div>
        <div className="flex flex-row text-lg">
            {/* <div className='px-1 text-gray-600'>{logOut}</div> */}
            <button type='button' className='transition duration-500 text-gray-500 hover:text-red-500 transform hover:scale-110' onClick={handleLogout} >{logoutIcon}</button>
        </div>
      </div>
  )
}

export default Header