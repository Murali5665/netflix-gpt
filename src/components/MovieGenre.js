import React from 'react';
import GenreList from './GenreList';
import { useSelector } from 'react-redux';
import { title } from 'process';
import useGetCategoryList from '../hooks/useTopRatedList';


const MovieGenre = () => {
    const topRated = useSelector((store) => store.movies?.addTopRatedMovies);
    const nowplaying = useSelector((store) => store.movies?.addNowPlayingMovies);
    useGetCategoryList()

    return (<div className='bg-black/100 w-screen'>
        <div className='relative -mt-52 z-20'>
            <GenreList title={"Now Playing Movies"} genreList={nowplaying} />
            <GenreList title={"Top Rated Movies"} genreList={topRated} />
            <GenreList title={"Top Rated Movies"} genreList={nowplaying} />
            <GenreList title={"Top Rated Movies"} genreList={topRated} />
            <GenreList title={"Top Rated Movies"} genreList={topRated} />
        </div>
    </div>
    )
};

export default MovieGenre;