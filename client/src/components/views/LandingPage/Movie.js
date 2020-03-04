import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.image[0];
  return (
    <div className="movie">
      <h2>{movie.name}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.name}`}
          src={movie.image[0]}
        />
      </div>
      <p>({movie.id})</p>
    </div>
  );
};

export default Movie;