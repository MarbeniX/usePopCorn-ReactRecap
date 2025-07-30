import React from "react";
import MovieItem from "./MovieItem";

export default function LeftBoxList({ movies }) {
    return (
        <ul className="list">
            {movies?.map((movie) => (
                <MovieItem movie={movie} key={movie.title} />
            ))}
        </ul>
    );
}
