import React, { useEffect, useState } from "react";

const KEY = "5209103e";

export default function MovieDetails({
    onHandleCloseSelectedMovie,
    selectedMovieId,
}) {
    const [movieDetails, setMovieDetails] = useState({});

    useEffect(() => {
        async function getMovieDetails() {
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
            );
            const data = await res.json();
            setMovieDetails(data);
        }
        getMovieDetails();
    }, []);

    return (
        <div className="details">
            <button className="btn-back" onClick={onHandleCloseSelectedMovie}>
                &larr;
            </button>
            {selectedMovieId}
        </div>
    );
}
