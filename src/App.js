import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RecipeItem from "./components/RecipeItem";
import Favourites from "./components/Favourites";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientQuery, setIngredientQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [emptyArray, setEmptyArray] = useState("");
  const [stable, setStable] = useState(
    "Nothing to show, please search something!"
  );
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  const [saveCount, setSaveCount] = useState(() => {
    return savedItems.length;
  });

  const navigator = useNavigate();

  const inputField = useRef();

  const inputIngredient = useRef();

  const searchHandler = (e) => {
    e.preventDefault();

    inputField.current.blur();

    navigator("/");

    setIsLoading(true);
    setRecipes([]);
    setErrorMsg("");
    setEmptyArray("");
    setStable("");

    setTimeout(() => {
      fetch(`http://127.0.0.1:9000/recipesWithSearch?query=${searchQuery}`)
        .then((res) => {
          if (!res.ok) throw new Error("Something went wrong!");
          return res.json();
        })
        .then((data) => {
          if (data.results.length === 0) setEmptyArray("No recipe found!");
          setRecipes(data.results);
          setIsLoading(false);
        })
        .catch((err) => setErrorMsg(err.message));
    }, 500);

    setSearchQuery("");
  };

  const ingredientHandler = (e) => {
    e.preventDefault();

    inputField.current.blur();

    navigator("/");

    setIsLoading(true);
    setRecipes([]);
    setErrorMsg("");
    setEmptyArray("");
    setStable("");

    setTimeout(() => {
      fetch(`http://127.0.0.1:9000/recipesWithIngredients?ingredients=${ingredientQuery}`)
        .then((res) => {
          if (!res.ok) throw new Error("Something went wrong!");
          return res.json();
        })
        .then((data) => {
          if (data.results.length === 0) setEmptyArray("No recipe found!");
          setRecipes(data.results);
          setIsLoading(false);
        })
        .catch((err) => setErrorMsg(err.message));
    }, 500);

    setIngredientQuery("");
  };



  const checkLocalData = (data) => {
    const localData = JSON.parse(localStorage.getItem("recipes"));
    const dataExistance = localData.some((local) => local.id === data.id);

    if (!dataExistance) {
      setSavedItems((prevState) => [...prevState, data]);
    } else {
      const filteredLocalData = localData.filter(
        (local) => local.id !== data.id
      );
      setSavedItems(filteredLocalData);
    }
  };

  const saveHandler = (id) => {
    fetch(`http://127.0.0.1:9000/recipeInformation/${id}`)
      .then((res) => res.json())
      .then((data) => checkLocalData(data));

    navigator("favourites");
  };

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(savedItems));
    setSaveCount(savedItems.length);
  }, [savedItems]);

  return (
    <>
      <div className="bg-rose-50 text-gray-600 text-lg min-h-screen">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHandler={searchHandler}
          inputField={inputField}
          saveCount={saveCount}
          ingredientQuery={ingredientQuery}
          setIngredientQuery={setIngredientQuery}
          ingredientHandler={ingredientHandler}
          inputIngredient={inputIngredient}
        />


        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                isLoading={isLoading}
                errorMsg={errorMsg}
                searchQuery={searchQuery}
                emptyArray={emptyArray}
                stable={stable}
              />
            }
          />
          


          <Route
            path="recipe-item/:id"
            element={
              <RecipeItem saveHandler={saveHandler} savedItems={savedItems} />
            }
          />
          <Route
            path="favourites/recipe-item/:id"
            element={
              <RecipeItem saveHandler={saveHandler} savedItems={savedItems} />
            }
          />
          <Route
            path="favourites"
            element={<Favourites savedItems={savedItems} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
