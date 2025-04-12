import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [videoId, setVideoId] = useState("");
  const API_KEY = "AIzaSyAa6WUJ0xQ6NsGaR939AYIyBLpqcTaxyQo";

  const fetchTrailer = async () => {
    const query = `${movie.Title} trailer`;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query
        )}&key=${API_KEY}&type=video&maxResults=1`
      );
      if (!response.ok) throw new Error("Failed to fetch trailer");
      const data = await response.json();
      setVideoId(data.items?.[0]?.id?.videoId || null);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setVideoId(null);
    }
  };
  const handleTrailerToggle = async () => {
    if (!showTrailer) await fetchTrailer();
    setShowTrailer(!showTrailer);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 500 }}
        image={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.Title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {movie.Year}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={handleTrailerToggle}
        >
          {showTrailer ? "Hide Trailer" : "Watch Trailer"}
        </Button>
        {showTrailer && (
          <div className="trailer-container">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${movie.Title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
export default MovieCard;
