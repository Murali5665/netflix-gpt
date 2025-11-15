import React from 'react';
import GenreList from './GenreList';
import { useSelector } from 'react-redux';

const GptResults = () => {
    const {movieNames, movieResults} = useSelector((store) => store.gpt);

    if (!movieNames) return null; 

    return (
        <div className='bg-black max-w-5xl mt-8 mb-2 px-4 rounded-md w-[50%] mx-auto overflow-y-auto no-scrollbar'>
            {movieNames.map((name, index) => <GenreList key={name} title={name} genreList={movieResults[index].results || []} />)}
        </div>
    );
};

export default GptResults;