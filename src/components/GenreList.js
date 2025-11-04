import React from 'react';
import GenreCard from './GenreCard';

const GenreList = ({ title, genreList }) => {
    return (
        <div className='grid p-4'>
            <h1 className='text-white text-2xl font-bold px-5'>{title}</h1>
            <div className='flex p-4 overflow-x-scroll no-scrollbar'>
                <div className='flex gap-4'>
                    {genreList?.map((genreList) => (
                        <GenreCard key={genreList.id} genreList={genreList} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default GenreList;