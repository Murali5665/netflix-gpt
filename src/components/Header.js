import React, { useEffect } from 'react';
import { Netflix_url } from '../utils/constant';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { auth } from '../utils/firebase';
import { signOut } from '../utils/userAuthentication';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

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
        <div className='absolute flex justify-between items-center w-screen px-8 py-4 bg-gradient-to-b from-black/50'>
            <img className='w-1/10' src={Netflix_url} alt="Login Background" />
            {user && <div className='flex gap-4 items-center'>
                <p className='text-white'>{user ? user.displayName : ""}</p>
                <button onClick={() => signOut()} className='bg-red-600 text-white rounded-sm w-24 h-10 hover:cursor-pointer'>Sign Out</button>
            </div>}
        </div>
    );
};

export default Header;