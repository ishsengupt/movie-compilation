import React, {useEffect, useState} from 'react'
import axios from 'axios'


function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)
    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.name,
        movieImage:props.movieInfo.image,
        movieRunTime: props.movieInfo.rating,

    }

    useEffect(() => {



        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setFavoriteNumber(response.data.favoriteNumber)

                } else {
                    console.log(response.data)
                    alert('Failed to get favoriteNumber')
                }
            })

            axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if(response.data.success) {
                        setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })
    },[])

    const onClickFavorite = () => {
        if (Favorited) {

            axios.post('/api/favorite/removeFromFavorite', variable )
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Failed to remove from Favorites')
                }
            })
        
            
        } else {
            axios.post('/api/favorite/addToFavorite', variable )
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                } else {
                    alert('Failed to add to Favorites')
                }
            })
        }
    }
    return (
        <div>
           <button onClick={onClickFavorite}>{Favorited ? "remove from Favorite" : "Add to Favorite"}  { FavoriteNumber} </button>  
        </div>
    )
}

export default Favorite
