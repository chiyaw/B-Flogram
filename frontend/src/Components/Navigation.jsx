import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faHome, faUsers  } from '@fortawesome/free-solid-svg-icons';

function Navigation() {

    const navigate = useNavigate();
    const userId = localStorage.getItem('userId')

    const sections = [
        {
            'sec': 'Home',
            'icon': <FontAwesomeIcon icon={faHome} />,
            'url': '/home'
        },
        {
            'sec': 'Profile',
            'icon': <FontAwesomeIcon icon={faUser} />,
            'url': '/profile'+userId
        },
        {
            'sec': 'Add Post',
            'icon': <FontAwesomeIcon icon={faPlus} />,
            'url': '/addpost'+userId
        },
        {
            'sec': 'All User',
            'icon': <FontAwesomeIcon icon={faUsers} />,
            'url': '/alluser'
        }
    ]

    

    return (
        <div className="flex flex-row top-18 bottom-0 left-0 md:shadow-2xl items-top bg-orange-100/50 fixed z-10 transition-all duration-300">
            <div className='text-gray-800 md:w-40 mt-2 gap-2 pt-2'>
                {sections.map((section, index) => (
                    <div className="flex flex-row items-center gap-2 shadow-md m-2 p-2 rounded-r-lg border-l-3 border-orange-400 bg-orange-200/50 hover:border-gray-500 cursor-pointer transition-all duration-200" key={index} onClick={() => navigate(section.url)} >
                       {section.icon} {section.sec}
                    </div>
                ))}</div>
        </div>
    )
}

export default Navigation