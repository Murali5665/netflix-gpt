import React from 'react';

const GenreCard = ({ genreList }) => {

    return(
        <div className='w-48'>
            <img src={`https://image.tmdb.org/t/p/w780${genreList?.poster_path}`} alt="genre-poster" 
            className='w-full h-auto rounded-md'/>
        </div>
    )
};
export default GenreCard;