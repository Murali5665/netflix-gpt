import React, { useRef, useState } from 'react';
import { userLogin, userSignUp, validateCreds } from '../utils/userAuthentication';
import { Background_url } from '../utils/constant';
import Header from './Header';



const Login = () => {
    const [toggleSignForm, setToggleSignForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const userName = useRef("");
    const email = useRef("");
    const password = useRef("");

    const toggleSignform = () => {
        setToggleSignForm(!toggleSignForm);
    }

    const submitForm = () => {
        const { message } = validateCreds(email.current.value, password.current.value);
        if (message) {
            setErrorMessage(message);
            return;
        }

        if (toggleSignForm) {
            const { message } = userSignUp(userName.current?.value, email.current.value, password.current.value);
            if (message) {
                setErrorMessage(message);
                return;
            }
        } else {
            const { message } = userLogin(email.current.value, password.current.value);
            if (message) {
                setErrorMessage(message);
                return;
            }
        }
    };

    return (
        <div className='w-screen h-screen relative'>
            <Header />
            <div className='h-full w-full'>
                <img className='w-full h-full object-cover' src={Background_url} alt="Login Background" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='absolute bg-black/65 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-6 items-center  px-12 py-8 rounded-md'>
                <h1 className='font-bold text-3xl text-white my-6'>{toggleSignForm ? "Sign up" : "Sign in"}</h1>
                {toggleSignForm && <input ref={userName} name='name' type="text" placeholder="Name" className='text-white border-2 rounded-sm w-75 h-10 border-gray-600 p-2' />}
                <input ref={email} name='email' type="email" placeholder="Email" className='text-white border-2 rounded-sm w-75 h-10 border-gray-600 p-2' />
                <input ref={password} name='password' type="password" placeholder="Password" className='text-white border-2 rounded-sm border-gray-600 w-75 h-10 p-2' />
                {errorMessage && <p className='text-red-500 w-75 h-12'>{errorMessage}</p>}
                <button onClick={() => submitForm()} className='text-white bg-red-600 text-bold rounded-sm w-75 h-10 cursor-pointer'>{toggleSignForm ? "Sign up" : "Sign in"}</button>
                <p onClick={() => toggleSignform()} className='text-white cursor-pointer'>{toggleSignForm ? "Switch to Sign in" : "New to Netflix? Sign up now"}</p>
            </form>
        </div>
    )
};
export default Login;