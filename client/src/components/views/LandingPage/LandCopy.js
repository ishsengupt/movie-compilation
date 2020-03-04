import React, { useReducer, useEffect, useState } from "react";
import Header from "./Header";
import spinner from "../assets/balls.gif";
import Search from "./Hooks/Search";
import { initialState, reducer } from "./store/reducer";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import MediaCard from './MediaCard'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));



const TEST_URL = 'https://node-server-expresses-example.tailgateishan.now.sh/search/'
const CHECK_URL = 'https://node-server-expresses-example.tailgateishan.now.sh/search/naruto'

const LandCopy = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const [searchedTerm, setsearchedTerm] = useState("")

  const classes = useStyles();

  useEffect(() => {


    setsearchedTerm('naruto')
    
     axios.get(CHECK_URL).then(jsonResponse => {
        console.log(jsonResponse)
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data
      });
    }); 
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {

    setsearchedTerm(searchValue)
    console.log(searchValue)
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`${TEST_URL}${searchValue}`).then(

     

      jsonResponse => {
        console.log(jsonResponse)
        if (jsonResponse.data) {
          
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data,

          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div className={classes.root}>
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
         
          direction={"row"}
        >
          {movies.map(movie => (
            <Link
              to={{ pathname: `/movie/${movie.href[0]}`, search: searchedTerm }}
            >
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <MediaCard
                    title={movie.name}
                    image={movie.image[0]}
                    href={movie.href[0]}
                  />
                </Paper>
              </Grid>
            </Link>
          ))}
        </Grid>
      </div>
    );


  return (
    <div className="App">
      <div className="m-container">
        <Header text="HOOKED" />

        <Search search={search} />

        <p className="App-intro">Search results for : {searchedTerm}</p>

        <>{retrievedMovies}</> 

       
      </div>
    </div>
  );
};

export default LandCopy;
