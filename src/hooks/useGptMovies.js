import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { gptSearchResultMovies } from "../utils/gptSlice";


const useGptMovies = (getNames = []) => {

    console.log("dfsf", getNames)
    const dispatch = useDispatch();

    const gptSearchMovies = async () => {

        if (!getNames.length) return;

        // fetch all movies from TMDB in parallel
        const results = await Promise.all(
            getNames.map(async (movie) => {
                const res = await fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${movie}`,
                    API_Options
                );
                return res.json();
            })
        )
        console.log("dzfdsf", results)
        dispatch(gptSearchResultMovies({ movieNames: getNames, movieResults: results }))
    }


    useEffect(() => {
        gptSearchMovies();
    }, [getNames]);

}

export default useGptMovies;