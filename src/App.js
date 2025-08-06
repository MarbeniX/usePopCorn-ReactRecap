import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Results from "./Components/Results";
import Search from "./Components/Search";
import Box from "./Components/Box";
import LeftBoxList from "./Components/LeftBoxList";
import Summary from "./Components/Summary";
import RightBoxList from "./Components/RightBoxList";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import MovieDetails from "./Components/MovieDetails";

const KEY = "5209103e";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    function handleSelectMovie(id) {
        setSelectedMovieId((prevId) => (prevId === id ? null : id));
    }
    function handleCloseSelectedMovie() {
        setSelectedMovieId(null);
    }
    function handleAddToWatched(movie) {
        setWatched((prevWatched) =>
            prevWatched.some((m) => m.imdbID === movie.imdbID)
                ? prevWatched
                : [...prevWatched, movie]
        );
    }
    function handleDeleteFromWatched(id) {
        setWatched((prevWatched) =>
            prevWatched.filter((movie) => movie.imdbID !== id)
        );
    }

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}}`
                );
                if (!res.ok) throw new Error("Failed to fetch movies.");
                const data = await res.json();
                if (data.Response === "False") throw new Error();
                setMovies(data.Search);
            } catch (err) {
                if (err.message === "Failed to fetch movies.") {
                    setIsError(
                        "Failed to fetch movies. Please try again later."
                    );
                } else {
                    setIsError("No movies found. Try a different search term.");
                    setMovies([]);
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (!query) {
            setMovies([]);
            setIsError("");
            return;
        }
        fetchMovies();
    }, [query]);

    return (
        <>
            <Navbar>
                <Search query={query} setQuery={setQuery} />
                <Results movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    {!query && <Loader>Start searching for movies</Loader>}
                    {isLoading && <Loader>Loading...</Loader>}
                    {isError && <Error message={isError} />}
                    {!isError && !isLoading && (
                        <LeftBoxList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                </Box>

                <Box>
                    {!selectedMovieId ? (
                        <>
                            <Summary watched={watched} />
                            <RightBoxList
                                watched={watched}
                                onDeleteFromWatched={handleDeleteFromWatched}
                            />
                        </>
                    ) : (
                        <MovieDetails
                            onHandleCloseSelectedMovie={
                                handleCloseSelectedMovie
                            }
                            selectedMovieId={selectedMovieId}
                            onAddToWatched={handleAddToWatched}
                            watched={watched}
                        />
                    )}
                </Box>
            </Main>
        </>
    );
}
