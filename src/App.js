import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import RecipeSearch from "./components/pages/RecipeSearch";
import IngredientRecipeSearch from "./components/pages/IngredientRecipeSearch";
//import Login from "./components/pages/Login";
import RecipeItem from "./components/RecipeItem";
import Favourites from "./components/Favourites";
import NotFound from "./components/pages/NotFound";
import Footer from "./components/Footer";

const App = () => {
  const [savedItems, setSavedItems] = useState(() => {
    const localData = localStorage.getItem("recipes");
    return localData ? JSON.parse(localData) : [];
  });
  const [saveCount, setSaveCount] = useState(() => {
    return savedItems.length;
  });

  const navigator = useNavigate();

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
        <Navbar saveCount={saveCount} />
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route
            path="ingredient-search"
            element={<IngredientRecipeSearch />}
          />
          <Route
            path="recipe-item/:id"
            element={
              <RecipeItem saveHandler={saveHandler} savedItems={savedItems} />
            }
          />
          <Route
            path="ingredient-search/recipe-item/:id"
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

          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
