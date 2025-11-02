import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MovieInfo from './MovieInfo';
import MovieTrailer from './MovieTrailer';


const VideoPlaying = () => {
    const movie = useSelector((store) => store.movies?.addNowPlayingMovies);
    if (!movie) return null;
    const { original_title, overview, id } = movie[0];

    return (
        <div>
            <MovieInfo title={original_title} overview={overview} />
            <MovieTrailer movieId={id}/>
        </div>
    );
};

export default VideoPlaying;