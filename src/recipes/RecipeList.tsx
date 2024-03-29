import {Link, useSearchParams} from "react-router-dom";
import "./RecipesLayout.css";
import {useEffect, useState} from "react";
import {Recipe as APIRecipe, getRecipes} from "../services/apiFacade";
import {useAuth} from "../security/AuthProvider.tsx";


export default function RecipeList() {
    const [queryString] = useSearchParams();
    const initialCategory = queryString.get("category");
    const [recipes, setRecipes] = useState<Array<APIRecipe>>([]);
    const [category, setCategory] = useState<string | null>(initialCategory);
    const [error, setError] = useState("");
    const auth = useAuth();

    useEffect(() => {
        getRecipes(category)
            .then((res) => setRecipes(res))
            .catch(() => setError("Error fetching recipes, is the server running?"));

    }, [category]);

    if (error !== "") {
        return <h2 style={{color: "red"}}>{error}</h2>
    }

    return (
        <>
            <h3>Recipes</h3>
            {category && (
                <div>
                    Recipes with '{category}'{" "}
                    <button
                        onClick={() => {
                            setCategory(null);
                        }}
                    >
                        Clear
                    </button>
                </div>
            )}
            <ul style={{listStyle: "none", paddingLeft: 0}}>
                {recipes.map((recipe) => {
                    return (
                        <li key={recipe.id}>
                            <Link to={`${recipe.id}`}>{recipe.name}</Link>,
                            {auth.isLoggedInAs(["ADMIN", "USER"]) && <Link className="recipe-btn" to="/add/recipe" state={recipe}>Edit </Link>}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
