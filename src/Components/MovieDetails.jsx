import React, { useEffect, useState } from "react";
import StarRating from "./RatingStars";
import Loader from "./Loader";

const KEY = "5209103e";

export default function MovieDetails({
    onHandleCloseSelectedMovie,
    selectedMovieId,
    onAddToWatched,
    watched,
}) {
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const [userRating, setUserRating] = useState(0);

    const movieWatched = watched
        .map((movie) => movie.imdbID)
        .includes(selectedMovieId);
    const movieUserRating = watched.find(
        (movie) => movie.imdbID === selectedMovieId
    )?.userRating;

    const {
        Title: title,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
        Year: year,
    } = movieDetails;

    function handleOnAddToWatched() {
        const newMovie = {
            imdbID: selectedMovieId,
            poster,
            title,
            year,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        };
        onAddToWatched(newMovie);
        onHandleCloseSelectedMovie();
    }

    useEffect(() => {
        setIsLoading(true);
        setIsError("");
        async function getMovieDetails() {
            try {
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
                );
                if (!res.ok) {
                    throw new Error("Failed to fetch movie details.");
                }
                const data = await res.json();
                setMovieDetails(data);
            } catch (error) {
                setIsError(
                    "Failed to fetch movie details. Please try again later."
                );
            } finally {
                setIsLoading(false);
            }
        }
        getMovieDetails();
    }, [selectedMovieId]);

    return (
        <div className="details">
            {isLoading && <Loader>Loading...</Loader>}
            {isError && <Loader>{isError}</Loader>}
            {!isLoading && !isError && (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={onHandleCloseSelectedMovie}
                        >
                            &larr;
                        </button>
                        <img
                            src={poster}
                            alt={`Poster of the ${title} movie`}
                        />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>⭐{imdbRating} iMDB Rating</p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {!movieWatched ? (
                                <>
                                    <StarRating
                                        rating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleOnAddToWatched}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    ⭐ You rated this movie with{" "}
                                    {movieUserRating}
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
