import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import "./searchMoives.css";
function SearchMovie({ setMovie }) {
  const [searchTerm, setSearchTerm] = useState("Harry");
  const [error, setError] = useState(false);
  const API_URl = " https://www.omdbapi.com/";
  const API_KEy = "9ae42c37";

  let getMovieDetails = async () => {
    const movieName = searchTerm?.trim();
    try {
      const response = await fetch(
        `${API_URl}?s=${movieName}&apikey=${API_KEy}`
      );
      if (!response.ok) {
        throw new Error("Movie is not found");
      }
      const data = await response.json();
      console.log(data);
      if (data.Response === "False") {
        setError(true);
        return;
      }
      setMovie(data.Search || []);
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setError(false);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await getMovieDetails();
    } catch (err) {}
  };
  useEffect(() => {
    getMovieDetails();
  }, []);
  return (
    <div className="searchContainer">
      <form onSubmit={handleSubmit} className="searchForm">
        <Box className="searchBox" sx={{ maxWidth: "100%" }}>
          <TextField
            fullWidth
            label="Movie Name"
            id="searchBox"
            required
            onChange={handleSearch}
            value={searchTerm}
          />
        </Box>
        <Button className="searchBtn" variant="contained" type="submit">
          search
        </Button>
        <br />
      </form>
      {error && (
        <p style={{ color: "red", fontSize: 20 }}>Movie is Not Found</p>
      )}
    </div>
  );
}

export default SearchMovie;
