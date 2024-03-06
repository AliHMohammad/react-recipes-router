import {Link, NavLink} from "react-router-dom";
import AuthStatus from "./security/AuthStatus";
import {useAuth} from "./security/AuthProvider.tsx";

export default function NavHeader() {
    const auth = useAuth();

    return (
        <nav>
            <ul style={{display: "grid", gridTemplateColumns: "1fr 1fr"}}>
                <div>
                    <li>
                        {<NavLink to="/">Home</NavLink>}
                    </li>
                    <li>
                        {<NavLink to="/categories">Categories</NavLink>}
                    </li>
                    <li>
                        {<NavLink to="/recipes">Recipes</NavLink>}
                    </li>
                    {auth.isLoggedInAs(["ADMIN", "USER"]) && (
                        <li>
                            {<NavLink to="/add/recipe">Add Recipe</NavLink>}
                        </li>
                    )}
                    {auth.isLoggedInAs(["ADMIN"]) && (
                        <li>
                            {<NavLink to="/add/category">Add Category</NavLink>}
                        </li>
                    )}
                    <li>
                        {<NavLink to="/contact">Contact</NavLink>}
                    </li>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <AuthStatus/>
                </div>
            </ul>
        </nav>
    );
}
