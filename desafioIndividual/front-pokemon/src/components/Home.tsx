import { Link } from "react-router-dom";

export function Home() {
    return (<h1>
        PAGINA Home
        <nav>
            <Link to="About">About</Link>
        </nav>
    </h1>)
}