import { API_Options } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useNowMovies = () => {
    const dispatch = useDispatch();
    const nowPlaying = useSelector((store) => store.movies?.nowPlaying);

    const getNowMovies = async () => {
        const movieData = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_Options);
        const data = await movieData.json();
        dispatch(addNowPlayingMovies(data.results));
    };

    useEffect(() => {
        !nowPlaying && getNowMovies();
    }, []);

}

export default useNowMovies;