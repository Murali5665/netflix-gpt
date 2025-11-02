import { useEffect } from "react";
import {addTopRatedMovies} from "../utils/movieSlice"
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";


const useGetCategoryList = () => {
    const dispatch = useDispatch();

    const getCategoryList = async () => {

        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_Options);
        const movieData = await data.json();
        dispatch(addTopRatedMovies(movieData.results));

    };

    useEffect(() => {
        getCategoryList();
    },[]);
};

export default useGetCategoryList;