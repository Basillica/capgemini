import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import styles from './movies.module.css'; 
import { movieApi, getMovie, getMovies, addMovie, filterMovies, moviesList } from "./moviestore";
import { useAppSelector, useAppDispatch } from './../../app/hooks'
import { Movie } from "./model";
import { Navigate } from "react-router-dom";
import { MovieForm } from './movieForm'


function Movies() {
    const {state} = useLocation();
    const movieList = useAppSelector(moviesList);
    const dispatch = useAppDispatch();
    const [tokenString, setTokenString] = useState("")
    const [movies, setMovies] = useState([])
    const [moviesFilter, setMoviesFilter] = useState([] as Movie[])
    const [validToken, setValidToken] = useState(false)
    const [toggle, setToggle] = useState(false)
    const [addMovieToggle, setAddMovieToggle] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [values, setValues] = useState(
      {
        title: "", episode_id: "", opening_crawl: "", director: "",
        producer: "", release_date: "", characters: "", planets: "",
        starships: "", vehicles: "", species: "", created: "", edited: "", url: ""
      }
    )

    
    const filterMovies = (event: any) => {
      event.persist();
      if (event.target.value === ""){
        setMoviesFilter(movies)
      } else {
        const newMovieList = movies.filter((m: Movie) => m.title.toLowerCase().includes(event.target.value))
        setMoviesFilter(newMovieList)
      }
    }


    if (state?.token && !validToken && state?.token != ""){
      setTokenString(state.token)
      const promise = new Promise((resolve, reject) => {
        const config = {
          headers:{
              "Authorization": `Bearer ${state.token}`,
              "Content-Type": "application/json"
          }
        };
        resolve(dispatch(getMovies(config)))
      })

      promise.then((result: any) => {
        setMovies(result?.payload?.result)
        setMoviesFilter(result?.payload?.result)
      })
      setValidToken(!validToken)
    }

    const handleClick = (movie: any) => {
      setToggle(!toggle)
      setSelectedMovie(movie)
    }

    const handleAddMovie = (movie: any) => {
      setAddMovieToggle(!addMovieToggle)
    }

    const handleCancelMovieAdd = () => {
      setAddMovieToggle(false)
      // setSelectedMovie(null)
    }
    
    const handleCancel = () => {
      setToggle(false)
      setSelectedMovie(null)
    }

    const handleChange = (event: any) => {
      event.persist();
      setValues(values => ({
        ...values,
        [event.target.name]: event.target.value
      }));
    };

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event) event.preventDefault();
      const keys = ["characters", "planets", "starships", "vehicles", "species"]
      let movie: Movie = {
        title:"", episode_id: 0, opening_crawl:"", director:"",
        producer:"", release_date:"", characters:[], planets:[],
        starships:[], vehicles:[], species:[], created:"",
        edited:"", url:""
      } 

      Object.keys(movie).forEach((key) => {
        if (keys.includes(key)) {
            (movie as any)[key] = values[key as keyof Movie].split(",")
        } else {
          (movie as any)[key] = values[key as keyof Movie]
        }
      })

      movie.episode_id = parseInt(movie.episode_id.toString())

      const promise = new Promise((resolve, reject) => {
        const config = {
          headers:{
              "Authorization": `Bearer ${state.token}`,
              "Content-Type": "application/json"
          }
        };
        resolve(dispatch(addMovie({config, movie})))
      })

      promise.then((result: any) => {
        setAddMovieToggle(false)
        let newList: Movie[] = {...moviesFilter}
        newList.push(movie)
        setMoviesFilter(newList)
      })

    }


    return (
      <>
        {!state || state?.token != null || state?.token == ""  && (
            <Navigate to="/login" replace={true}/>
        )}
        
        <div className={styles.container}>
          <div className={styles.search_container}>
            <label htmlFor="search" className={styles.search_box}>
              <a> Search Movies: </a>
              <input className={styles.seach_lable} id="search" type="text" onChange={filterMovies} />
            </label>
            <Button buttonText="Add a Movie" buttonAction={handleAddMovie}/>
            {addMovieToggle ? <Modal children={MovieForm(handleChange, handleSubmit, values)} show={addMovieToggle} handleClose={handleCancelMovieAdd}/> : null}
          </div>

          <table className={styles.table}>
          <caption>List of Movies</caption>
          <thead>
            <tr>
              <th>Title#</th>
              <th>Release date</th>
              <th>Created</th>
              <th> Explore </th>
            </tr>
          </thead>

          <tbody>
            {moviesFilter && moviesFilter.map((movie: Movie, i) => (
              <tr key={i + 1}>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.created}</td>
                <td>
                  <Button buttonText="Explore Movie" buttonAction={() => handleClick(movie)}/>
                </td>
              </tr>
            ))}
          </tbody>
          
          </table>
          {selectedMovie ? <Modal children={selectedMovie} show={toggle} handleClose={handleCancel} viewJson={true}/> : null}
        </div>        
      </>
    );
}


export default Movies;