import React from 'react';

const MovieInfo = ({ title, overview }) => {
    return (
            <div className='w-screen aspect-video absolute text-white bg-gradient-to-r from-black/30 pt-50 px-20'>
                <h1 className='font-bold text-4xl'>{title}</h1>
                <p className='w-1/2 font-medium pt-10'>{overview}</p>
                <div className='flex gap-2 pt-10'>
                    <button className='bg-red-500 rounded-lg p-3'>Play Trailer</button>
                    <button className='bg-gray-300 rounded-lg p-3'>More Info</button>
                </div>
            </div>
    );
};

export default MovieInfo;