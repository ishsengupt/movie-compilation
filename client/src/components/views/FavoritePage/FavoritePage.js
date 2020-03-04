import React, { useEffect, useState } from 'react'

import Axios from 'axios';
import './favorite.css';
import {Popover} from 'antd'




function FavoritePage() {

    const variables = {userFrom: localStorage.getItem('userId')}

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {

        fetchFavoritedMovies();
      
    }, [])

    const fetchFavoritedMovies = () => {
        Axios.post('/api/favorite/getFavoritedMovie', variables)
        .then(response => {
            if(response.data.success) {
                setFavoritedMovies(response.data.favorites)
            } else {
                alert('failed to get favorited')
            }
        })
    }

    const onClickRemove = (movieId) => {

        const variable = {
            movieId: movieId,
            userFrom: localStorage.getItem('userId')
        }
        Axios.post('/api/favorite/removeFromFavorite', variable )
        .then(response => {
            if(response.data.success) {
                fetchFavoritedMovies();
               
            } else {
                alert('Failed to remove from Favorites')
            }
        })
    }

    const renderTableBody = FavoritedMovies.map((movie,index) => {

        const content = (
            <div>
                {movie.movieImage ? <img src={`${movie.movieImage}`} alt="moviePoster" /> 
                : "no Image"  }
            </div>
        )
        return <tr>

            <Popover content = {content} title = {`${movie.movieTitle}`}>
            <td>{movie.movieTitle}</td>
           
            </Popover>
            <td>{movie.movieRunTime} mins</td>
            <td><button onClick={()=>onClickRemove(movie.movieId)}>Remove from favorites</button></td> 
           
        </tr>
    })


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTableBody}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage
