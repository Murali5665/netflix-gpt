import React from 'react';
import GptSearch from './GptSearch';
import { Background_url } from '../utils/constants';
import GptResults from './GptResults';


const GptContainer = () => {
    return (
        <div className='relative w-screen h-screen overflow-hidden'>
            <div>
                <img className='absolute inset-0 w-full h-full object-cover -z-10' src={Background_url} alt="Login Background" />
            </div>
            <div className='absolute inset-0 bg-black/50 flex flex-col items-center pt-32'>
                <GptSearch />
                <GptResults />
            </div>

        </div>
    );
};

export default GptContainer;