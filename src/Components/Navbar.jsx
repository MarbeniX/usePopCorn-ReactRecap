import Search from "./Search";
import Logo from "./Logo";
import Results from "./Results";

export default function Navbar({ movies }) {
    return (
        <nav className="nav-bar">
            <Logo />
            <Search />
            <Results movies={movies} />
        </nav>
    );
}
