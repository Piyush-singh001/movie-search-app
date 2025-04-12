import MovieCard from "./MovieCard";
import "./MovieList.css";
const MovieList = ({ movies }) => {
  // if (!movies.length) {
  //   return <p style={{ marginTop: "20px"}}>No movies found.</p>;
  // }

  return (
    <div className="movieContainer">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          style={{
            flex: "1 1 calc(33.33% - 32px)",
            maxWidth: "345px",
          }}
        >
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
