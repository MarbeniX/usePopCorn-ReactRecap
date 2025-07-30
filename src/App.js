import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Results from "./Components/Results";
import Search from "./Components/Search";
import Box from "./Components/Box";
import LeftBoxList from "./Components/LeftBoxList";
import Summary from "./Components/Summary";
import RightBoxList from "./Components/RightBoxList";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

    return (
        <>
            <Navbar>
                <Search />
                <Results movies={movies} />
            </Navbar>

            <Main>
                <Box>
                    <LeftBoxList movies={movies} />
                </Box>

                <Box>
                    <Summary watched={watched} />
                    <RightBoxList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
