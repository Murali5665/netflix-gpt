import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: "movies",
    initialState: {
        addNowPlayingMovies: null,
        addMovievideos:null,
        addTopRatedMovies: null,
    },
    reducers:{
        addNowPlayingMovies: (state, action) => {
            state.addNowPlayingMovies = action.payload;
        },
        addMovieTrailer: (state, action) => {
            state.addMovieTrailer = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.addTopRatedMovies = action.payload;
        }
    }
});

export const { addNowPlayingMovies, addMovieTrailer, addTopRatedMovies } = movieSlice.actions;
export default movieSlice.reducer;