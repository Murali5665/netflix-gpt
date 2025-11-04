import React from 'react';
import GenreList from './GenreList';
import { useSelector } from 'react-redux';

const GptResults = () => {
    const nowplaying = useSelector((store) => store.movies?.addNowPlayingMovies);

    return (
        <div className='bg-black max-w-5xl mt-8 mb-2 px-4 rounded-md w-[50%] mx-auto overflow-y-auto no-scrollbar'>  
            <GenreList title={"Now Playing Movies"} genreList={nowplaying}/>
            <GenreList title={"Now Playing Movies"} genreList={nowplaying}/>
            <GenreList title={"Now Playing Movies"} genreList={nowplaying}/>
            <GenreList title={"Now Playing Movies"} genreList={nowplaying}/>
        </div>
    );
};

export default GptResults;