import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addMovie = (e) => {
    e.preventDefault();
    if (movieTitle.trim() === "") return;

    const newMovie = {
      id: Date.now(),
      title: movieTitle,
      rating: parseInt(rating),
      comment: comment,
    };

    setMovies([...movies, newMovie]);
    setMovieTitle("");
    setRating(0);
    setComment("");
  };

  const removeMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const updateMovie = (id, updates) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, ...updates } : movie,
      ),
    );
  };

  const renderStars = (stars) => {
    return "⭐".repeat(stars) || "Not rated";
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>🎬 Movies Watch List</h1>
        <p>Track and rate your movies</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Add a Movie</h2>
          <form onSubmit={addMovie} className="add-movie-form">
            <div className="form-group">
              <label htmlFor="title">Movie Title:</label>
              <input
                id="title"
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Enter movie title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Stars (0-5):</label>
              <input
                id="rating"
                type="number"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="0-5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Review Comment:</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your review (optional)"
                rows="3"
              />
            </div>

            <button type="submit" className="btn-add">
              + Add Movie
            </button>
          </form>
        </section>

        <section className="movies-section">
          <h2>Your Watch List ({movies.length})</h2>
          {movies.length === 0 ? (
            <div className="empty-state">
              <p>No movies yet. Add one to get started! 🍿</p>
            </div>
          ) : (
            <div className="movies-list">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="movie-header">
                    <h3 className="movie-title">{movie.title}</h3>
                    <button
                      onClick={() => removeMovie(movie.id)}
                      className="btn-remove"
                      title="Delete movie"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="movie-rating">
                    <span className="stars">{renderStars(movie.rating)}</span>
                    <span className="rating-text">
                      {movie.rating > 0
                        ? `${movie.rating}/5 stars`
                        : "Not rated"}
                    </span>
                  </div>

                  {movie.comment && (
                    <div className="movie-review">
                      <p className="review-label">Review:</p>
                      <p className="review-text">{movie.comment}</p>
                    </div>
                  )}

                  <div className="movie-edit-section">
                    <div className="edit-rating">
                      <label htmlFor={`edit-rating-${movie.id}`}>
                        Update Rating:
                      </label>
                      <select
                        id={`edit-rating-${movie.id}`}
                        value={movie.rating}
                        onChange={(e) =>
                          updateMovie(movie.id, {
                            rating: parseInt(e.target.value),
                          })
                        }
                      >
                        <option value="0">Not rated</option>
                        <option value="1">1 ⭐</option>
                        <option value="2">2 ⭐</option>
                        <option value="3">3 ⭐</option>
                        <option value="4">4 ⭐</option>
                        <option value="5">5 ⭐</option>
                      </select>
                    </div>

                    <div className="edit-comment">
                      <label htmlFor={`edit-comment-${movie.id}`}>
                        Update Review:
                      </label>
                      <textarea
                        id={`edit-comment-${movie.id}`}
                        value={movie.comment}
                        onChange={(e) =>
                          updateMovie(movie.id, { comment: e.target.value })
                        }
                        placeholder="Add or update your review"
                        rows="2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
