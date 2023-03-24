import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, {AxiosRequestConfig} from "axios";
import { Movie } from "./model";
import { RootState } from "../../app/store";

const API_URL = process.env.API_URL || "http://localhost:80";

interface InitialState {
    movies: Movie[];
    status: "authorized" | "unauthorized" | "loading";
    error: string | null;
    token: {token: string | null}
}

const initialState: InitialState = {
    movies: [],
    status: "unauthorized",
    error: null,
    token: {token: ""}
};


export const movieApi = createApi({
    reducerPath: 'filterMovies',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
      filterMovies: builder.query({
        query: (title: string) => ({ 
            url: `filter/${title}`, method: 'GET', 
            headers: {
                'authorization': `Bearer ${initialState?.token?.token}`,
            }
        }),
        // Pick out data and prevent nested properties in a hook or selector
        transformResponse: (response: any) => response?.result,
        // Pick out error and prevent nested properties in a hook or selector
        transformErrorResponse: (response: any) => response?.error,
      }),

      getMovies: builder.query({
        query: () => ({
            url: `movies/`, method: 'GET',
            headers: {
                'authorization': `Bearer ${initialState?.token?.token}`,
            }
        }),
        transformResponse: (response: any) => response?.result,
        transformErrorResponse: (response: any) => response?.error,
      }),

      getMovie: builder.query({
        query: (id: string) => ({ 
            url: `movie/${id}`, method: 'GET',
            headers: {
                'authorization': `Bearer ${initialState?.token?.token}`,
            }
        }),
        transformResponse: (response: any) => response?.result,
        transformErrorResponse: (response: any) => response?.error,
      }),

      addMovies: builder.query({
        query: (movie: Movie) => ({ 
            url: `movie/`, method: 'POST', body: movie,
            headers: {
                'authorization': `Bearer ${initialState?.token?.token}`,
            }
        }),
        transformResponse: (response: any) => response?.result,
        transformErrorResponse: (response: any) => response?.error,
      }),
    }),
})


export const getMovies: any = createAsyncThunk(
    "auth/getMovies",
    async (config: object) => {
        try {
            const response = await axios.get(API_URL+"/movies", config)
            return response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

export const getMovie: any = createAsyncThunk(
    "auth/getMovie",
    async (id: string, config: object) => {
        try {
            const response = await axios.get(API_URL+"/movie"+id, config)
            return response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

export const addMovie: any = createAsyncThunk(
    "auth/addMovie",
    async (payload: {config: any, movie: Movie}) => {
        console.log(payload.config, payload.movie, "the frigging move and config")
        try {
            const response = await axios.post(API_URL+"/movie", payload.movie, payload.config)
            return response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

export const filterMovies: any = createAsyncThunk(
    "auth/filterMovies",
    async (title: string, config: object) => {
        try {
            const response = await axios.get(API_URL+"/movie/"+title, config)
            return response.data
        } catch (error) {
            console.log(error);
            return null;
        }
    }
);

const movieReducer = createSlice({
    name: "movies",
    initialState,
    reducers: {
        getMoviesReducer(state, action: PayloadAction<Movie>) {
            console.log(action.payload, state, "sdsdsd, sdsds,sdsdsd, sdsds sdsdsd, sdsds sdsdsd, sdsdssdsdsd, sdsds");
            getMovies(action.payload)
        },
        getMovieReducer(state, action: PayloadAction<Movie>) {
            console.log(action.payload, state, "sdsdsd, sdsdssdsdsd, sdsdssdsdsd, sdsdssdsdsd, sdsds");
            getMovie(action.payload)
        },
        addMovieReducer(state, action: PayloadAction<Movie>) {
            console.log(action.payload, state);
            addMovie(action.payload)
        },
        filterMovieReducer(state, action: PayloadAction<Movie>) {
            console.log(action.payload, state);
            filterMovies(action.payload)
        }
    },
    // extraReducers(builder) {
    //     builder
    //         .addCase(addMovie.pending, (state, action) => {
    //             state.status = "loading";
    //         })
    //         .addCase(addMovie.fulfilled, (state, {payload} ) => {
    //             state.status = "authorized";
    //             state.movies = state.movies.concat(payload);
    //         })
    //         .addCase(addMovie.rejected, (state, action) => {
    //             state.status = "unauthorized";
    //             state.error = action.error.message;
    //         });
    // },
});

export const { getMovieReducer, getMoviesReducer, addMovieReducer } = movieReducer.actions;
export const moviesList = (state: RootState) => state.movie
export default movieReducer.reducer;