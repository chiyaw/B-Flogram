import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faXmark } from "@fortawesome/free-solid-svg-icons";

const userId = localStorage.getItem('userId');

export default function Comments({ postId }) {
  const [open, setOpen] = useState(false);


  return (
    <div>
      {/* Comment Icon */}
      <FontAwesomeIcon icon={faComments} 
        className="cursor-pointer text-gray-500"
        onClick={() => setOpen(true)}
      />

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
            
            <button 
              className="absolute right-3 top-3 text-gray-600 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a Comment</h2>

            <textarea
              className="w-full border p-3 rounded-lg text-gray-800"
              placeholder="Write your comment..."
            />

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
              onClick={() => setOpen(false)}
            >
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
