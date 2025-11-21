import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket,  } from '@fortawesome/free-solid-svg-icons';

function Header() {

    const userName = 'Bhonpu'
    
    const userIcon = <FontAwesomeIcon icon={faUser} />
    const logoutIcon = <FontAwesomeIcon icon={faRightFromBracket} />
    const logOut= 'Logout'

  return (
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between bg-orange-100/80 backdrop-blur-md text-gray-800 items-center shadow-2xl px-20 py-4 z-20">
        <div className="flex flex-row text-lg">
            <div className='px-1 text-gray-600'> {userIcon} </div>
            <div className ='px-1 text-gray-600'> {userName}</div>
        </div>
        <div>
            <h1 className='antialiased font-bold text-3xl md:text-4xl'>
                Bogram
            </h1>
        </div>
        <div className="flex flex-row text-lg">
            {/* <div className='px-1 text-gray-600'>{logOut}</div> */}
            <div className='transition duration-500 text-gray-500 hover:text-red-500 transform hover:scale-110'>{logoutIcon}</div>
        </div>
      </div>
  )
}

export default Header