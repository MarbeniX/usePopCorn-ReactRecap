import LeftBox from "./LeftBox";
import RightBox from "./RightBox";

export default function Main({ movies }) {
    return (
        <main className="main">
            <LeftBox movies={movies} />
            <RightBox />
        </main>
    );
}
