import cel from '../assets/cel.png'
import friends from '../assets/friends.png'
import Kachra from '../assets/Kachra.png'
import tulip from '../assets/tulip.png'
import west from '../assets/west.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComments } from '@fortawesome/free-solid-svg-icons';

function Posts() {

    const posts = [
        {
            userIcon: 'B',
            user: 'Bhonpu',
            createDate: '31-08-2025',
            img: cel,
            likes: 9,
            comments: 2,

        },
        {
            userIcon: 'C',
            user: 'Chiya',
            createDate: '25-03-2025',
            img: tulip,
            likes: 7,
            comments: 0,

        },
        {
            userIcon: 'M',
            user: 'Mamma',
            createDate: '11-12-2025',
            img: west,
            likes: 4,
            comments: 5,

        },
        {
            userIcon: 'P',
            user: 'Pappa',
            createDate: '19-03-2025',
            img: Kachra,
            likes: 2,
            comments: 3,

        },
        {
            userIcon: 'B',
            user: 'Bhaiya',
            createDate: '14-11-2025',
            img: friends,
            likes: 19,
            comments: 2,

        },
    ]
    const heartIcon = <FontAwesomeIcon icon={faHeart} />
    const commentIcon = <FontAwesomeIcon icon={faComments} />

    return (
        <div className='flex flex-col items-center gap-4 mt-20 ml-0 md:ml-40 min-h-screen'>
            {posts.map((post, index) => (
                <div key={index} className='shadow-2xl rounded-xl w-full max-w-2xl bg-orange-100/50 px-4 py-2' >
                    <div className='flex flex-row justify-between items-center px-4'>
                        <div className='flex flex-row items-center justify-center gap-1 '>
                            <div className='border-orange-400 border-5 border-double px-2 py-1 bg-orange-200 rounded-[50%] m-2 '>{post.userIcon}</div>
                            <div>{post.user}</div>
                        </div>
                        <div>{post.createDate}</div>
                    </div>
                    <div>
                        <img src={post.img} className="mx-auto w-190 h-150 rounded-xl" />
                    </div>
                    <div>
                        <div className='flex flex-row gap-10 px-4 mt-1'>
                            <div className='flex flex-row items-center justify-center gap-1 text-gray-600'>
                                {heartIcon}
                                <div>{post.likes}</div>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-1 text-gray-600'>
                                <div>{commentIcon}</div>
                                <div>{post.comments}</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Posts
