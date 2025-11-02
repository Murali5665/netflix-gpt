import React from 'react';
import useGetMovieVideos from '../hooks/useGetMovieVideos';
import { useSelector } from 'react-redux';

const MovieTrailer = ({ movieId }) => {
    useGetMovieVideos(movieId);
    const movieVideo = useSelector((store) => store.movies?.addMovieTrailer);

    return (
        <div className='w-screen'>
            <iframe className='w-screen aspect-video h-svh' src={`https://www.youtube.com/embed/${movieVideo?.key}?autoplay=1&mute=1`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
            </iframe>
        </div>
    );
};

export default MovieTrailer;