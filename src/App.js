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

const KEY = "5209103e";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=avengers`
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
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    return (
        <>
            <Navbar>
                <Search />
                <Results movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {isError && <Error message={isError} />}
                    {!isError && !isLoading && <LeftBoxList movies={movies} />}
                </Box>

                <Box>
                    <Summary watched={watched} />
                    <RightBoxList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
