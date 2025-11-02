import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_Options } from "../utils/constant";
import { addMovieTrailer } from "../utils/movieSlice";

const useGetMovieVideos = (movieId) => {
    const dispatch = useDispatch();
    console.log("movieId in hook", movieId);

    const getMovievideos = async() =>{
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_Options)
        const videoData = await data.json();
        const filterVideoData = videoData.results.filter((video) => video.type === "Trailer");
        const filteredVideo = filterVideoData.length > 0 ? filterVideoData : videoData.results[0];
        const videoTrailer = filteredVideo.length > 0 ? filteredVideo[0] : filteredVideo;
        dispatch(addMovieTrailer(videoTrailer));
    }

    useEffect(() =>{
        getMovievideos();

    },[])

};


export default useGetMovieVideos;