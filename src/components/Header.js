import React, { useEffect } from 'react';
import { Netflix_url } from '../utils/constant';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';
import { handleSignOut } from '../utils/userAuthentication';
import { useNavigate } from 'react-router-dom';
import { toggleGptSearch } from '../utils/gptSlice';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const gpt = useSelector((store) => store.gpt.showGptSearch);
    const navigate = useNavigate();

    const onclickGptButton = () => {
        console.log("GPT Button Clicked");
        
        // dispatch(addGptButton(gpt));
        dispatch(toggleGptSearch());
        console.log("GPT Button State:", gpt);
    }

    const handleSignOutClick = async () => {
        try {
            await handleSignOut();
            dispatch(removeUser());
            navigate('/');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid, email, displayName }));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/');
            }
        });
        //this unsubscribe when the component unmounts
        return () => unSubscribe();
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-8 py-4 bg-gradient-to-b from-black/70 to-transparent'>
            <img className='w-1/10' src={Netflix_url} alt="Login Background" />
            {user && <div className='flex gap-4 items-center'>
                <button onClick={() => onclickGptButton()} className=' text-black bg-blue-400 h-12 rounded-sm w-35 cursor-pointer'> {gpt ? "Home" : "🌐 GPT Search"} </button>
                <p className='text-white'>{user ? user.displayName : ""}</p>
                <button onClick={() => handleSignOutClick()} className='bg-red-600 text-white rounded-sm w-24 h-10 cursor-pointer'>Sign Out</button>
            </div>}
        </div>
    );
};

export default Header;