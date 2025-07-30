import MovieItemRatings from "./MovieItemRatings";

export default function RightBoxList({ watched }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <MovieItemRatings movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}
