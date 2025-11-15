import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_Options } from "../utils/constants";
import { addMovieTrailer } from "../utils/movieSlice";

const useGetMovieVideos = (movieId) => {
    const dispatch = useDispatch();
    const movieTrailers = useSelector((store) => store.movies?.addNowPlayingMovies)

    const getMovievideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_Options)
        const videoData = await data.json();
        const filterVideoData = videoData.results.filter((video) => video.type === "Trailer");
        const filteredVideo = filterVideoData.length > 0 ? filterVideoData : videoData.results[0];
        const videoTrailer = filteredVideo.length > 0 ? filteredVideo[0] : filteredVideo;
        dispatch(addMovieTrailer(videoTrailer));
    }

    useEffect(() => {
        !movieTrailers && getMovievideos();
    }, [])

};


export default useGetMovieVideos;