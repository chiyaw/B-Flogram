import Header from "../Components/Header"
import Navigation from "../Components/Navigation"
import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constant';

function AddPost() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!description || !image) {
      alert('Please provide both description and image');
      return;
    }

    // Get user ID from localStorage (assuming it's stored during login)
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first');
      return;
    }

    try {
      const backendUrl = `${BACKEND_URL}/api/addpost`;
      const postData = {
        description: description,
        image: previewUrl,
        user: userId,
        comments: [],
        likes: []
      };

      const response = await axios.post(backendUrl, postData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Post created');
      alert('Post created successfully!');
      
      setDescription('');
      setImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    }
  };

  return (
    <>
      <div>
        <Header />
        <Navigation />
        <div className="ml-44 mt-20">

          <div className="flex flex-col mx-75 mt-30 p-4 rounded-b-xl bg-orange-100/50 shadow-xl/30 gap-4">
            <div className="text-2xl font-bold text-gray-800 justify-start items-center p-2">
              Add Post
            </div>

            <div>
              <div>
                <div className=" flex flex-col gap-2 p-2">
                  <div>Post's Caption</div>
                  <input placeholder="Enter Caption" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white rounded-xl p-2"/>
                </div>

                <div className="flex flex-col gap-2 p-2">
                  <div>
                  <input type="file" onChange={(e) => handleFileChange(e.target.files[0])} className="bg-white rounded-xl p-2"/>
                  </div>

                  <div>
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px' }} 
                    />
                  )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center p-2">
              <button type="button" onClick={handleUpload} className="bg-orange-300 rounded-xl px-4 py-2">Post</button>
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

export default AddPost