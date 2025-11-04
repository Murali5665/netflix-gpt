import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/movieSlice"
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constant";


const useGetCategoryList = () => {
    const dispatch = useDispatch();
    const topRatedMovies = useSelector((store) => store.movies?.addTopRatedMovies)

    const getCategoryList = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_Options);
        const movieData = await data.json();
        dispatch(addTopRatedMovies(movieData.results));

    };

    useEffect(() => {
        !topRatedMovies && getCategoryList();
    }, []);
};

export default useGetCategoryList;