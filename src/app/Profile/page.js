'use client';
import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import NavBar from '../components/NavBar';

export default function Profile() {

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [username, setUsername] = useState('');
  const [thisUser, setThisUser] = useState({});
  const [followed, setFollowed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [mobile, setPhoneNumber] = useState('');

  const handleUpdate = () => {
    console.log('Updating profile:', { bio, mobile });
    
    axios.post(`http://localhost:8080/update/${username}`, { bio, mobile }, { withCredentials: true })
        .then(response => {
            console.log('Update successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
    
    setEditing(false);
};


  const handleCancel = () => {
    setEditing(false);
    setBio('');
    setPhoneNumber('');
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8080/authenticated', { withCredentials: true });
        if (response.data === "ok") {
          setAuthenticated(true);

          const userDetailsResponse = await axios.get(`http://localhost:8080/user/details`, { withCredentials: true });
          setThisUser(userDetailsResponse.data);

          const params = new URLSearchParams(window.location.search);
          const usernameQuery = params.get('user');
          if (usernameQuery) {
            setUsername(usernameQuery);
          }

        } else {
          window.location.href = 'http://localhost:3000/Login';
        }
      } catch (error) {
        window.location.href = 'http://localhost:3000/Login';
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const isFollowed = () => {
      if (user.followedBy && thisUser.email) {
        const containsEmail = user.followedBy.includes(thisUser.email);
        setFollowed(containsEmail);
      }
    };
  
    if (username) {
      axios.get(`http://localhost:8080/profile/${username}`, { withCredentials: true })
        .then(response => {
          setUser(response.data);
          isFollowed();
        })
        .catch(() => {
          toast.error("Error loading the user");
        });
    }
  }, [username, thisUser.email, user.followedBy]);
  

  const handleFollow = () => {
    if(followed) {
    axios.post(`http://localhost:8080/unfollow/${username}`, {}, { withCredentials: true })
      .then(response => {
        setFollowed(false);
      })
      .catch(() => {
        toast.error("Error following the user");
      });
    }else{
      axios.post(`http://localhost:8080/follow/${username}`, {}, { withCredentials: true })
      
      .then(response => {
        setFollowed(true);
      })
      .catch(() => {
        toast.error("Error unfollowing the user");
      });
    }
  };

  const deleteProfile = () => {
    axios.delete(`http://localhost:8080/delete/${username}`, { withCredentials: true })
      .then(response => {
        toast.success("Profile deleted successfully");
        window.location.href = 'http://localhost:3000/Login';
      })
      .catch(error => {
        console.error('Error deleting profile:', error);
        toast.error("Failed to delete profile");
      });
  };

  const isMine = thisUser.email === user.email;
  console.log('isMine:', isMine);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <Head>
        <title>Profile</title>
      </Head>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center h-32" src={user.imageUrl} alt='Woman looking front' />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.bio}</p>
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 fill-current text-gray-500 mr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 19v-2c0-1.1-.9-2-2-2h-1V8c0-2.76-2.24-5-5-5s-5 2.24-5 5v7H6c-1.1 0-2 .9-2 2v2h2v2H4c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-1.1-.9-2-2-2h-1v-2h2zM9 8c0-1.66 1.34-3 3-3s3 1.34 3 3v7H9V8zm11 13H4v-1h16v1zM5 16h14v2H5v-2zm14-5V8c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v3h14z"/>
            </svg>
            <p className="text-gray-500">{user.mobile}</p>
          </div>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-between">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>{user.followers}</div>
          </li>
        </ul>
        {!isMine ? (
          <div className="p-4 border-t mx-8 mt-2">
          <button onClick={handleFollow} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">{followed ? 'Unfollow' : 'Follow'}</button>
        </div>
        ):(
          <div>
            <button className='block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-light text-white px-6 py-2 p-2 m-2' onClick={() => setEditing(true)}>Edit Profile</button>
            <button className='block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-light text-white px-6 py-2 p-2' onClick={() => deleteProfile()}>Delete Profile</button>
          </div>
        )}
      </div>

      {/* Edit Profile Popup/Modal */}
      {editing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            {/* Bio input */}
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            {/* Phone number input */}
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                value={mobile}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end">
              {/* Update button */}
              <button
                onClick={handleUpdate}
                className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
              {/* Cancel button */}
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
}
