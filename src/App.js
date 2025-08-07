import { useState } from "react";
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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
    const [query, setQuery] = useState("");

    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const { movies, isLoading, isError } = useMovies(query);
    const [watched, setWatched] = useLocalStorage([], "watched");

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
