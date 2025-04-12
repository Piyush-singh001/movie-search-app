import SearchMovie from "./compponents/searchMoives";
import MovieList from "./compponents/MovieList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovie] = useState([]);
  return (
    <div className="App">
      <SearchMovie setMovie={setMovie} />
      <br />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
