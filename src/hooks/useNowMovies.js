import { API_Options } from "../utils/constant"
import { useDispatch } from "react-redux"
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


 const useNowMovies = () => {
    const dispatch = useDispatch();

    const getNowMovies = async () => {
        const movieData = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_Options);
        const data = await movieData.json();
        dispatch(addNowPlayingMovies(data.results));
    };

    useEffect(() => {
        getNowMovies();
    }, []);

}

export default useNowMovies;