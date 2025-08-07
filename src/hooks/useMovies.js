import { useEffect, useState } from "react";

const KEY = "5209103e";
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setIsError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}}`,
                    { signal: controller.signal }
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
        return () => {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, isError };
}
