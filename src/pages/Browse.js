import React from 'react';
import Header from '../components/Header';
import MainContainer from '../components/MainConatiner';
import { useSelector } from 'react-redux';
import GptContainer from '../components/GptContainer';

const Browse = () => {
    const gpt = useSelector((store) => store.gpt.showGptSearch);
    return (
        <div className='relative no-scrollbar'>
            <div className='z-50'>
                <Header />
            </div>
            <div className='z-0'>
                {gpt ? <GptContainer /> : <MainContainer />}
            </div>
        </div>
    );
};


export default Browse;


