import React from 'react';
import VideoPlaying from './VideoPlaying';
import useNowMovies from '../hooks/useNowMovies';
import MovieGenre from './MovieGenre';


const MainContainer = () => {
    useNowMovies();
    return (
        <div className='w-screen'>
            {/* Video Playing Container */}
            <VideoPlaying />
            {/* List of different MovieGenres */}
            <MovieGenre />
        </div>
    );
};

export default MainContainer;